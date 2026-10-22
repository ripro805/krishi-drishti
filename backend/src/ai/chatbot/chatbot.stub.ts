export interface ChatMessage {
  id?: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp?: string;
}

export interface ChatbotResponse {
  reply: string;
  banglaReply?: string;
  suggestedProducts?: {
    name: string;
    type: "organic" | "chemical" | "biofertilizer";
    dosage: string;
  }[];
  quickActions?: string[];
}

/**
 * Crop Doctor Chatbot Stub / Extension Point
 *
 * In production:
 * Calls Google Gemini Flash API (`env.CROP_DOCTOR_LLM_API_URL`) or an agronomy RAG vector index.
 */
export async function generateCropDoctorResponse(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<ChatbotResponse> {
  const queryLower = userQuery.toLowerCase();

  // Agronomic rule-based matching fallback
  if (queryLower.includes("blight") || queryLower.includes("ধসা") || queryLower.includes("দাগ")) {
    return {
      reply: "Based on the symptoms described, this is characteristic of Early Blight (Alternaria solani). Immediately prune infected lower leaves and apply Copper Oxychloride or Azoxystrobin (Amistar Top 1ml/L).",
      banglaReply: "আপনার বর্ণনামতে এটি টমেটো বা আলুর আগাম ধসা (Early Blight) রোগ। অবিলম্বে নিচের আক্রান্ত পাতাগুলো কেটে পুড়িয়ে ফেলুন এবং কপার অক্সিক্লোরাইড অথবা এমিস্টার টপ (১ মিলি/লিটার পানিতে) স্প্রে করুন।",
      suggestedProducts: [
        {
          name: "Amistar Top (Azoxystrobin + Difenoconazole)",
          type: "chemical",
          dosage: "1 mL per Liter of clean water",
        },
        {
          name: "Copper Soap (Copper Octanoate)",
          type: "organic",
          dosage: "15 mL per Liter of clean water",
        },
      ],
      quickActions: [
        "View Treatment Plan",
        "Calculate Spray Dosage",
        "Organic Fungicide Guide",
      ],
    };
  }

  if (queryLower.includes("fertilizer") || queryLower.includes("সার") || queryLower.includes("urea")) {
    return {
      reply: "For optimal vegetative and fruit growth, ensure balanced N-P-K. Avoid excessive urea in humid weather to reduce blight susceptibility. Split nitrogen into 3 stages: Basal, Vegetative, and Flowering.",
      banglaReply: "সুষম সার প্রয়োগের জন্য ইউরিয়া, ডিএপি ও এমওপি নির্দিষ্ট অনুপাতে দিন। কুয়াশাচ্ছন্ন আবহাওয়ায় অতিরিক্ত ইউরিয়া দেওয়া বন্ধ রাখুন, এতে ছত্রাকের আক্রমণ বাড়ে। সার ৩ কিস্তিতে প্রয়োগ করুন।",
      quickActions: [
        "Open Fertilizer Calculator",
        "Split Application Schedule",
      ],
    };
  }

  return {
    reply: "Hello! I am Crop Doctor AI. Please describe your plant's symptoms, upload a leaf scan, or ask about organic treatments, chemical dosages, and fertilizer timing.",
    banglaReply: "নমস্কার! আমি কৃষি দৃষ্টির ক্রপ ডক্টর এআই। আপনার ফসলের যেকোনো রোগ, পোকার আক্রমণ, সারের মাত্রা বা সমাধান সম্পর্কে বিস্তারিত জানতে প্রশ্ন করুন।",
    quickActions: [
      "Diagnose Leaf Spots",
      "Fertilizer Calculation",
      "Pest Prevention Tips",
    ],
  };
}
