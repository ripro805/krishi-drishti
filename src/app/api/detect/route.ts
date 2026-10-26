import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

/**
 * Multi-tier AI Inference Engine for KrishiDrishti
 *
 * Tier 1: Local FastAPI model server (http://127.0.0.1:5005/predict)
 *         Fastest (~50ms) as the model weights are preloaded in memory.
 *
 * Tier 2: Direct Python CLI execution (scripts/predict.py --stdin)
 *         Automatic local fallback if the FastAPI server is not currently running.
 *
 * Tier 3: HuggingFace Serverless Inference Router
 *         Remote fallback if Python is unavailable.
 */

const LOCAL_SERVER_URL = process.env.MODEL_SERVER_URL || "http://127.0.0.1:5005/predict";
const HF_MODEL_ID = process.env.HF_MODEL_ID || "ripro805/krishidrishti-plant-disease";
const HF_ROUTER_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL_ID}`;
const HF_TOKEN = process.env.HF_TOKEN || "";

interface Prediction {
  label: string;
  score: number;
}

interface FastAPIResponse {
  predictions: Prediction[];
  latencyMs?: number;
  provider?: string;
  classesCount?: number;
  dominantCrop?: string;
  dominantCropScore?: number;
  cropScores?: Record<string, number>;
  isCrossCropAmbiguous?: boolean;
  disambiguatedTop?: {
    label: string;
    score: number;
    crop: string;
  };
}

// ── Tier 1: Local FastAPI Server ──────────────────────────────────
async function queryLocalFastAPI(base64Data: string, cropHint?: string): Promise<FastAPIResponse> {
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
      if (Array.isArray(data.predictions) && data.predictions.length > 0) {
        return data as FastAPIResponse;
      }
    }
    throw new Error(`Local FastAPI error: status ${response.status}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

// ── Tier 2: Local Python CLI Subprocess ───────────────────────────
function queryPythonCLI(base64Data: string): Promise<Prediction[]> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(process.cwd(), "scripts", "predict.py");
    const py = spawn("python", [scriptPath, "--stdin"], {
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
        if (Array.isArray(parsed) && parsed.length > 0) {
          return resolve(parsed);
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

// ── Tier 3: Hugging Face Router ──────────────────────────────────
async function queryHuggingFaceRouter(
  binaryData: Buffer,
  mimeType: string
): Promise<Prediction[]> {
  const response = await fetch(HF_ROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": mimeType,
      ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {}),
    },
    body: binaryData,
  });

  if (response.ok) {
    const result = await response.json();
    return result as Prediction[];
  }

  const errorText = await response.text();
  throw new Error(`HF Router error: ${response.status}: ${errorText}`);
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
      return NextResponse.json({
        predictions: fastApiRes.predictions,
        latencyMs: fastApiRes.latencyMs,
        provider: "local-fastapi",
        dominantCrop: fastApiRes.dominantCrop,
        dominantCropScore: fastApiRes.dominantCropScore,
        cropScores: fastApiRes.cropScores,
        isCrossCropAmbiguous: fastApiRes.isCrossCropAmbiguous,
        disambiguatedTop: fastApiRes.disambiguatedTop,
      });
    } catch (e: any) {
      console.warn("[detect API] Tier 1 (FastAPI) unavailable, falling back to Tier 2 (Python CLI)...");
    }

    // 2. Try Tier 2: Python CLI Subprocess
    try {
      const predictions = await queryPythonCLI(base64Data);
      return NextResponse.json({ predictions, provider: "local-python-cli" });
    } catch (e: any) {
      console.warn("[detect API] Tier 2 (Python CLI) failed, falling back to Tier 3 (HuggingFace)...", e.message);
    }

    // 3. Try Tier 3: Remote HuggingFace Router
    try {
      const binaryData = Buffer.from(base64Data, "base64");
      const predictions = await queryHuggingFaceRouter(binaryData, mimeType);
      return NextResponse.json({ predictions, provider: "huggingface-router" });
    } catch (e: any) {
      console.error("[detect API] Tier 3 (HuggingFace) failed:", e.message);
    }

    return NextResponse.json(
      { error: "INFERENCE_FAILED", message: "Failed to generate AI predictions across all providers." },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("[detect route] Unexpected error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
