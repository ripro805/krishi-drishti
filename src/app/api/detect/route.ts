import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { CROP_REGISTRY, LABEL_TO_CROP, THRESHOLDS, resolveCropName } from "@/lib/cropRegistry";

/**
 * Multi-tier AI Inference & Validation Engine for KrishiDrishti
 *
 * Tier 1: Local FastAPI model server (http://127.0.0.1:5005/predict)
 *         Fastest (~50ms) as the model weights are preloaded in memory.
 *
 * Tier 2: Direct Python CLI execution (scripts/predict.py --stdin --meta --hint=...)
 *         Automatic local fallback if the FastAPI server is not currently running.
 *
 * Tier 3: HuggingFace Serverless Inference Router + Local Hierarchical Aggregation
 *         Remote fallback if local Python is unavailable.
 */

const LOCAL_SERVER_URL = process.env.MODEL_SERVER_URL || "http://127.0.0.1:5005/predict";
const HF_MODEL_ID = process.env.HF_MODEL_ID || "ripro805/krishidrishti-plant-disease";
const HF_ROUTER_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL_ID}`;
const HF_TOKEN = process.env.HF_TOKEN || "";

interface StructuredModelResponse {
  status: string;
  can_provide_treatment: boolean;
  selected_crop?: string | null;
  detected_crop?: string | null;
  bangla_selected_crop?: string | null;
  bangla_detected_crop?: string | null;
  confidence?: number | null;
  crop_confidence?: number | null;
  prediction?: any;
  predictions: Array<{ label: string; score: number; raw_score?: number }>;
  message?: string;
  banglaMessage?: string;
  cropScores?: Record<string, number>;
  isCrossCropAmbiguous?: boolean;
  cropMargin?: number;
  disambiguatedTop?: any;
  latencyMs?: number;
  provider?: string;
}

// ── Tier 1: Local FastAPI Server ──────────────────────────────────
async function queryLocalFastAPI(base64Data: string, cropHint?: string): Promise<StructuredModelResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(LOCAL_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageData: base64Data, cropHint }),
      signal: controller.signal,
    });

    if (response.ok) {
      const data = await response.json();
      if (data && (data.status || Array.isArray(data.predictions))) {
        return {
          ...data,
          provider: "local-fastapi",
        } as StructuredModelResponse;
      }
    }
    throw new Error(`Local FastAPI error: status ${response.status}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

// ── Tier 2: Local Python CLI Subprocess ───────────────────────────
function queryPythonCLI(base64Data: string, cropHint?: string): Promise<StructuredModelResponse> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(process.cwd(), "scripts", "predict.py");
    const cliArgs = ["--stdin", "--meta"];
    if (cropHint) {
      cliArgs.push(`--hint=${cropHint}`);
    }

    const py = spawn("python", [scriptPath, ...cliArgs], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    py.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    const timer = setTimeout(() => {
      py.kill();
      reject(new Error("Python CLI timed out after 15 seconds"));
    }, 15000);

    py.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        return reject(new Error(`Python CLI exited with code ${code}: ${stderr}`));
      }

      try {
        const parsed = JSON.parse(stdout.trim());
        if (parsed && (parsed.status || Array.isArray(parsed.predictions))) {
          return resolve({
            ...parsed,
            provider: "local-python-cli",
          });
        }
        if (parsed.error) {
          return reject(new Error(parsed.error));
        }
        reject(new Error("Python CLI returned empty or unexpected output"));
      } catch (e: any) {
        reject(new Error(`Failed to parse Python output: ${e.message}\nOutput: ${stdout}`));
      }
    });

    py.stdin.write(base64Data);
    py.stdin.end();
  });
}

// ── Tier 3: Hugging Face Router + Local Aggregation ───────────────
async function queryHuggingFaceRouter(
  binaryData: Buffer,
  mimeType: string,
  cropHint?: string
): Promise<StructuredModelResponse> {
  const t0 = Date.now();
  const response = await fetch(HF_ROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": mimeType,
      ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {}),
    },
    body: binaryData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HF Router error: ${response.status}: ${errorText}`);
  }

  const rawPredictions: Array<{ label: string; score: number }> = await response.json();
  const latencyMs = Date.now() - t0;

  // Aggregate probabilities across all 16 crops using cropRegistry
  const cropMass: Record<string, number> = {};
  const predsByCrop: Record<string, Array<{ label: string; score: number }>> = {};

  for (const cropName of Object.keys(CROP_REGISTRY)) {
    cropMass[cropName] = 0.0;
    predsByCrop[cropName] = [];
  }

  for (const p of rawPredictions) {
    const crop = LABEL_TO_CROP[p.label];
    if (crop && cropMass[crop] !== undefined) {
      cropMass[crop] += p.score;
      predsByCrop[crop].push(p);
    }
  }

  const sortedCrops = Object.entries(cropMass).sort((a, b) => b[1] - a[1]);
  const [dominantCrop, dominantCropMass] = sortedCrops[0] || ["Unknown", 0.0];
  const [secondCrop, secondCropMass] = sortedCrops[1] || ["None", 0.0];
  const cropMargin = dominantCropMass - secondCropMass;

  const resolvedHint = resolveCropName(cropHint);
  const isUserGuided = resolvedHint !== null;

  if (isUserGuided) {
    const selectedCropName = resolvedHint!;
    const selectedMass = cropMass[selectedCropName] || 0.0;
    const selMeta = CROP_REGISTRY[selectedCropName];
    const domMeta = CROP_REGISTRY[dominantCrop] || { bnName: dominantCrop };

    // Selected Crop Mismatch Check (Two-Stage Verification)
    const dominantIsCredible =
      dominantCropMass >= 0.35 ||
      (dominantCropMass >= 0.28 && cropMargin >= THRESHOLDS.cropAmbiguityMargin);

    const isMismatch =
      (selectedCropName !== dominantCrop && dominantIsCredible) ||
      selectedMass < THRESHOLDS.selectedCropAcceptanceThreshold;

    if (isMismatch) {
      const conf = Math.round(selectedMass * 10000) / 100;

      return {
        status: "crop_mismatch",
        can_provide_treatment: false,
        selected_crop: selectedCropName,
        detected_crop: "Unknown / Unsupported",
        bangla_selected_crop: selMeta.bnName,
        bangla_detected_crop: "অনির্ণীত",
        confidence: conf,
        crop_confidence: conf,
        prediction: null,
        predictions: [],
        message: `The uploaded image does not appear to match the selected crop, ${selectedCropName}.`,
        banglaMessage: `আপলোড করা পাতাটিতে নির্বাচিত ফসল '${selMeta.bnName}'-এর কোনো পরিচিত রোগ বা লক্ষণ মেলেনি। ভুল চিকিৎসা রোধে ফলাফল অনির্ণীত রাখা হয়েছে।`,
        cropScores: {},
        isCrossCropAmbiguous: true,
        cropMargin: Math.round(cropMargin * 10000) / 10000,
        provider: "huggingface-router-fallback",
        latencyMs,
      };
    }

    const candidates = predsByCrop[selectedCropName].sort((a, b) => b.score - a.score);
    const best = candidates[0];
    const condScore = selectedMass > 0 ? best.score / selectedMass : best.score;
    const isHealthy = selMeta.healthyClasses.includes(best.label);
    const isLowConfidence = condScore < THRESHOLDS.diseaseConfidenceThreshold || best.score < 0.12;
    const status = isLowConfidence ? "low_confidence" : "success";

    return {
      status,
      can_provide_treatment: !isHealthy && status === "success",
      selected_crop: selectedCropName,
      detected_crop: selectedCropName,
      bangla_selected_crop: selMeta.bnName,
      bangla_detected_crop: selMeta.bnName,
      confidence: Math.round(condScore * 10000) / 100,
      crop_confidence: Math.round(selectedMass * 10000) / 100,
      prediction: status === "success" ? {
        label: best.label,
        crop: selectedCropName,
        score: Math.round(condScore * 10000) / 10000,
        isHealthy,
      } : null,
      predictions: status === "success" ? candidates.map((p) => ({
        label: p.label,
        score: Math.round((selectedMass > 0 ? p.score / selectedMass : p.score) * 10000) / 10000,
        raw_score: Math.round(p.score * 10000) / 10000,
      })) : [],
      message: `${isHealthy ? "Healthy foliage" : "Pathology confirmed"} identified for ${selectedCropName}.`,
      banglaMessage: `${selMeta.bnName} ফসলে ${isHealthy ? "সুস্থ পাতা" : "রোগ"} নিশ্চিতভাবে সনাক্ত হয়েছে।`,
      cropScores: Object.fromEntries(sortedCrops.slice(0, 5).map(([c, m]) => [c, Math.round(m * 10000) / 10000])),
      isCrossCropAmbiguous: cropMargin < THRESHOLDS.cropAmbiguityMargin,
      cropMargin: Math.round(cropMargin * 10000) / 10000,
      provider: "huggingface-router-fallback",
      latencyMs,
    };
  }

  // Auto-Detect Mode (Two-Stage Verification)
  const CONFUSION_PAIRS: [string, string][] = [
    ["Strawberry", "Grape"],
    ["Strawberry", "Rice"],
    ["Strawberry", "Tomato"],
    ["Strawberry", "Bell Pepper"],
    ["Wheat", "Rice"],
    ["Corn", "Rice"],
    ["Corn", "Wheat"],
    ["Potato", "Tomato"],
    ["Apple", "Grape"],
    ["Apple", "Peach"],
    ["Squash", "Strawberry"],
  ];
  const isConfPair = CONFUSION_PAIRS.some(
    ([a, b]) => (dominantCrop === a && secondCrop === b) || (dominantCrop === b && secondCrop === a)
  );
  const minMarginNeeded = isConfPair ? 0.35 : 0.20;
  let chosenCrop = dominantCrop;
  let chosenCropMass = dominantCropMass;
  let autoIsCredible =
    (dominantCropMass >= 0.65 && cropMargin >= minMarginNeeded) ||
    dominantCropMass >= 0.75;

  // Active pathology check:
  // If competing crops are generic healthy classes but a specific crop shows genuine disease pathology (>= 15%),
  // prioritize that crop to resolve foliar disease signatures accurately in Auto-Detect mode:
  const topDiseasePred = rawPredictions.find(
    (p) => !p.label.toLowerCase().includes("healthy") && p.score >= 0.15
  );
  let hasProminentDisease = false;
  if (!autoIsCredible && topDiseasePred) {
    const disCrop = LABEL_TO_CROP[topDiseasePred.label];
    if (disCrop && cropMass[disCrop] !== undefined) {
      chosenCrop = disCrop;
      chosenCropMass = cropMass[disCrop];
      autoIsCredible = true;
      hasProminentDisease = true;
    }
  }

  if (!autoIsCredible) {
    return {
      status: "unknown_crop",
      can_provide_treatment: false,
      selected_crop: null,
      detected_crop: "Unknown",
      bangla_selected_crop: null,
      bangla_detected_crop: "অনির্ণীত",
      confidence: Math.round(dominantCropMass * 10000) / 100,
      crop_confidence: Math.round(dominantCropMass * 10000) / 100,
      prediction: null,
      predictions: [],
      message:
        "Inconclusive result. The AI model detected ambiguous symptoms matching multiple crops in auto mode. To guarantee diagnostic accuracy and prevent incorrect treatments, please select your specific crop from the dropdown.",
      banglaMessage:
        "অনির্ণীত ফলাফল। পাতার লক্ষণগুলো একাধিক ফসলের লক্ষণের সাথে আংশিক মিল প্রদর্শন করছে। ভুল ফলাফল ও ভুল চিকিৎসা এড়াতে অনুগ্রহ করে ড্রপডাউন থেকে আপনার নির্দিষ্ট ফসলটি নির্বাচন করুন।",
      cropScores: Object.fromEntries(sortedCrops.slice(0, 5).map(([c, m]) => [c, Math.round(m * 10000) / 10000])),
      isCrossCropAmbiguous: true,
      cropMargin: Math.round(cropMargin * 10000) / 10000,
      provider: "huggingface-router-fallback",
      latencyMs,
    };
  }

  const domMeta = CROP_REGISTRY[dominantCrop] || { bnName: dominantCrop, healthyClasses: [] };
  const candidates = predsByCrop[dominantCrop].sort((a, b) => b.score - a.score);
  const best = candidates[0];
  const condScore = dominantCropMass > 0 ? best.score / dominantCropMass : best.score;
  const isHealthy = domMeta.healthyClasses.includes(best.label);
  const isLowConfidence =
    condScore < THRESHOLDS.diseaseConfidenceThreshold ||
    best.score < 0.12 ||
    (isHealthy && best.score < 0.70);
  const status = isLowConfidence ? "low_confidence" : "success";

  return {
    status,
    can_provide_treatment: !isHealthy && status === "success",
    selected_crop: null,
    detected_crop: dominantCrop,
    bangla_selected_crop: null,
    bangla_detected_crop: domMeta.bnName,
    confidence: Math.round(condScore * 10000) / 100,
    crop_confidence: Math.round(dominantCropMass * 10000) / 100,
    prediction: status === "success" ? {
      label: best.label,
      crop: dominantCrop,
      score: Math.round(condScore * 10000) / 10000,
      isHealthy,
    } : null,
    predictions: status === "success" ? candidates.map((p) => ({
      label: p.label,
      score: Math.round((dominantCropMass > 0 ? p.score / dominantCropMass : p.score) * 10000) / 10000,
      raw_score: Math.round(p.score * 10000) / 10000,
    })) : [],
    message: `${isHealthy ? "Healthy foliage" : "Pathology confirmed"} identified for ${dominantCrop}.`,
    banglaMessage: `${domMeta.bnName} ফসলে ${isHealthy ? "সুস্থ পাতা" : "রোগ"} নিশ্চিতভাবে সনাক্ত হয়েছে।`,
    cropScores: Object.fromEntries(sortedCrops.slice(0, 5).map(([c, m]) => [c, Math.round(m * 10000) / 10000])),
    isCrossCropAmbiguous: cropMargin < THRESHOLDS.cropAmbiguityMargin && dominantCropMass < 0.50,
    cropMargin: Math.round(cropMargin * 10000) / 10000,
    provider: "huggingface-router-fallback",
    latencyMs,
  };
}

// ── Tier 4: Gemini Multimodal Vision Engine ─────────────────────────
async function queryGeminiVision(
  base64Data: string,
  mimeType: string,
  cropHint?: string
): Promise<StructuredModelResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

  const model = "gemini-3.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const resolvedCrop = resolveCropName(cropHint);
  const prompt = `You are KrishiDrishti AI Agricultural Plant Pathology Engine.
Analyze the attached crop leaf image.
Target Crop Selection: ${resolvedCrop ? resolvedCrop : "Auto-Detect (Any of the 16 crops)"}.
Available Crops: Squash, Tomato, Potato, Rice, Corn (Maize), Wheat, Bell Pepper, Apple, Grape, Strawberry, Orange (Citrus), Peach, Cherry, Blueberry, Raspberry, Soybean.

Return strictly JSON with keys:
{
  "status": "success",
  "crop": "Squash",
  "cropBangla": "মিষ্টি কুমড়া",
  "disease": "Squash Powdery Mildew",
  "diseaseBangla": "মিষ্টি কুমড়ার পাউডারি মিলডিউ",
  "label": "Squash___Powdery_mildew",
  "confidence": 98.2,
  "isHealthy": false,
  "treatment": "আক্রান্ত পাতা অপসারণ করুন এবং অনুমোদিত ছত্রাকনাশক স্প্রে করুন।"
}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeType, data: base64Data } }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: "application/json"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini Vision error ${response.status}: ${errText}`);
  }

  const json = await response.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini Vision");

  const parsed = JSON.parse(text);
  const detectedCrop = parsed.crop || "Squash";
  const cropBn = parsed.cropBangla || (CROP_REGISTRY[detectedCrop]?.bnName || detectedCrop);
  const diseaseBn = parsed.diseaseBangla || parsed.disease;
  const isHealthy = !!parsed.isHealthy;
  const conf = parsed.confidence || 95;
  const label = parsed.label || `${detectedCrop}___${(parsed.disease || "healthy").replace(/\s+/g, "_")}`;

  return {
    status: parsed.status || "success",
    can_provide_treatment: !isHealthy && parsed.status !== "crop_mismatch",
    selected_crop: cropHint || null,
    detected_crop: detectedCrop,
    bangla_selected_crop: cropHint ? (CROP_REGISTRY[cropHint]?.bnName || cropHint) : null,
    bangla_detected_crop: cropBn,
    confidence: conf,
    crop_confidence: conf,
    prediction: {
      label,
      crop: detectedCrop,
      score: conf / 100,
      isHealthy,
    },
    predictions: [
      {
        label,
        score: conf / 100,
        raw_score: conf / 100,
      }
    ],
    message: `${isHealthy ? "Healthy foliage" : "Pathology confirmed"} identified for ${detectedCrop}.`,
    banglaMessage: `${cropBn} ফসলে ${isHealthy ? "সুস্থ পাতা" : diseaseBn} নিশ্চিতভাবে সনাক্ত হয়েছে।`,
    cropScores: { [detectedCrop]: conf / 100 },
    isCrossCropAmbiguous: false,
    cropMargin: 1.0,
    provider: "gemini-vision-engine",
  };
}

// ── Main API Route Handler ───────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { imageData, cropHint } = await request.json();

    if (!imageData) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 });
    }

    let mimeType = "image/jpeg";
    let base64Data = imageData;

    const dataUrlMatch = imageData.match(/^data:(.+);base64,(.+)$/);
    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1];
      base64Data = dataUrlMatch[2];
    }

    // 1. Try Tier 1: Local FastAPI Server (fastest)
    try {
      const fastApiRes = await queryLocalFastAPI(base64Data, cropHint);
      return NextResponse.json(fastApiRes);
    } catch (e: any) {
      console.warn("[detect API] Tier 1 (FastAPI) unavailable, falling back to Tier 2 (Python CLI)...");
    }

    // 2. Try Tier 2: Python CLI Subprocess
    try {
      const cliRes = await queryPythonCLI(base64Data, cropHint);
      return NextResponse.json(cliRes);
    } catch (e: any) {
      console.warn("[detect API] Tier 2 (Python CLI) failed, falling back to Tier 3 (HuggingFace)...", e.message);
    }

    // 3. Try Tier 3: Remote HuggingFace Router
    try {
      const binaryData = Buffer.from(base64Data, "base64");
      const routerRes = await queryHuggingFaceRouter(binaryData, mimeType, cropHint);
      return NextResponse.json(routerRes);
    } catch (e: any) {
      console.warn("[detect API] Tier 3 (HuggingFace) unavailable, falling back to Tier 4 (Gemini Vision)...", e.message);
    }

    // 4. Try Tier 4: Gemini Multimodal Vision Engine (Cloud serverless fallback)
    try {
      const geminiRes = await queryGeminiVision(base64Data, mimeType, cropHint);
      return NextResponse.json(geminiRes);
    } catch (e: any) {
      console.error("[detect API] Tier 4 (Gemini Vision) failed:", e.message);
    }

    return NextResponse.json(
      {
        status: "model_error",
        error: "INFERENCE_FAILED",
        message: "Failed to generate AI predictions across all providers.",
        can_provide_treatment: false,
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("[detect route] Unexpected error:", error.message);
    return NextResponse.json({ error: error.message, status: "model_error" }, { status: 500 });
  }
}
