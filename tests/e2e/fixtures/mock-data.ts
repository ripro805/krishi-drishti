/**
 * Deterministic Test Fixtures and Mock Responses for KrishiDrishti E2E Tests
 */

// 1x1 green transparent PNG as a valid base64 image data URL
export const MOCK_BASE64_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export const MOCK_DETECT_SUCCESS_TOMATO = {
  status: "success",
  can_provide_treatment: true,
  selected_crop: "Tomato",
  detected_crop: "Tomato",
  bangla_selected_crop: "টমেটো",
  bangla_detected_crop: "টমেটো",
  confidence: 99.25,
  crop_confidence: 99.25,
  prediction: {
    label: "Tomato_Early_blight",
    crop: "Tomato",
    score: 0.9925,
    raw_score: 0.9925,
    isHealthy: false,
  },
  predictions: [
    { label: "Tomato_Early_blight", score: 0.9925, raw_score: 0.9925 },
    { label: "Tomato_Late_blight", score: 0.0075, raw_score: 0.0075 },
  ],
  message: "Pathology confirmed identified for Tomato.",
  banglaMessage: "টমেটো ফসলে রোগ লক্ষণ নিশ্চিতভাবে সনাক্ত হয়েছে।",
  cropScores: { Tomato: 0.9925 },
  isCrossCropAmbiguous: false,
  cropMargin: 0.985,
  provider: "mock-fastapi",
  latencyMs: 45.2,
};

export const MOCK_DETECT_CROP_MISMATCH = {
  status: "crop_mismatch",
  can_provide_treatment: false,
  selected_crop: "Tomato",
  detected_crop: "Unknown / Unsupported",
  bangla_selected_crop: "টমেটো",
  bangla_detected_crop: "অনির্ণীত",
  confidence: 4.26,
  crop_confidence: 4.26,
  prediction: null,
  predictions: [],
  message:
    "The uploaded leaf does not show confirmed characteristics of the selected crop (Tomato) or its known diseases in this model. Result held as Inconclusive to prevent incorrect treatment.",
  banglaMessage:
    "আপলোড করা পাতাটিতে নির্বাচিত ফসল 'টমেটো'-এর কোনো পরিচিত রোগ বা বৈশিষ্ট্য মেলেনি। ভুল চিকিৎসা প্রয়োগ রোধে ফলাফল অনির্ণীত রাখা হয়েছে।",
  cropScores: {},
  isCrossCropAmbiguous: true,
  cropMargin: 0.45,
  provider: "mock-fastapi",
  latencyMs: 38.1,
};

export const MOCK_DETECT_UNKNOWN_CROP = {
  status: "unknown_crop",
  can_provide_treatment: false,
  selected_crop: null,
  detected_crop: "Unknown",
  bangla_selected_crop: null,
  bangla_detected_crop: "অনির্ণীত",
  confidence: 35.2,
  crop_confidence: 35.2,
  prediction: null,
  predictions: [],
  message:
    "Inconclusive result. The AI model detected ambiguous symptoms matching multiple crops in auto mode. To guarantee diagnostic accuracy, please select your specific crop from the dropdown.",
  banglaMessage:
    "অনির্ণীত ফলাফল। পাতার লক্ষণগুলো একাধিক ফসলের লক্ষণের সাথে আংশিক মিল প্রদর্শন করছে। ভুল ফলাফল ও ভুল চিকিৎসা এড়াতে অনুগ্রহ করে ড্রপডাউন থেকে আপনার নির্দিষ্ট ফসলটি নির্বাচন করুন।",
  cropScores: { Strawberry: 0.48, Tomato: 0.26, Grape: 0.22 },
  isCrossCropAmbiguous: true,
  cropMargin: 0.22,
  provider: "mock-fastapi",
  latencyMs: 51.0,
};

export const MOCK_CHAT_RESPONSE = {
  success: true,
  answer:
    "টমেটোর আগাম ধসা (Early Blight) রোগের জন্য আক্রান্ত পাতা কেটে ধ্বংস করুন। কপার অক্সিক্লোরাইড (৫০ ডব্লিউপি) প্রতি লিটার পানিতে ২ গ্রাম মিশিয়ে ৭-১০ দিন পরপর স্প্রে করুন। জমিতে পানি নিষ্কাশন নিশ্চিত করুন।",
  provider: "mock-groq",
  cached: false,
  timestamp: new Date().toISOString(),
};
