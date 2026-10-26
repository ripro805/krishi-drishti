import {
  AgricultureChatRequest,
  AgricultureChatResponse,
  AIProviderName,
  AIProviderStrategy,
  ProviderResult,
} from "./types";
import { analyzeLanguage } from "./languageDetector";
import { buildAgriculturalSystemPrompt } from "./prompt";
import { callGroqProvider } from "./providers/groqProvider";
import { callGeminiProvider } from "./providers/geminiProvider";
import { callOpenAIProvider } from "./providers/openaiProvider";

export interface AIProviderStatus {
  openai: boolean;
  gemini: boolean;
  groq: boolean;
  strategy: AIProviderStrategy;
  primary: string;
  fallbackEnabled: boolean;
}

/**
 * Checks which providers have API keys configured
 */
export function getAIProviderStatus(): AIProviderStatus {
  return {
    openai: !!process.env.OPENAI_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY,
    groq: !!process.env.GROQ_API_KEY,
    strategy: (process.env.AI_PROVIDER_STRATEGY as AIProviderStrategy) || "auto",
    primary: process.env.AI_PRIMARY_PROVIDER || "auto",
    fallbackEnabled: process.env.AI_FALLBACK_ENABLED !== "false",
  };
}

/**
 * Resolves the ordered list of eligible providers to try
 */
function resolveProviderSequence(requestStrategy?: AIProviderStrategy): AIProviderName[] {
  const status = getAIProviderStatus();
  const configured: AIProviderName[] = [];

  if (status.groq) configured.push("groq");
  if (status.gemini) configured.push("gemini");
  if (status.openai) configured.push("openai");

  if (configured.length === 0) {
    return [];
  }

  const reqStrat = (requestStrategy || "").toLowerCase();
  const primary = (process.env.AI_PRIMARY_PROVIDER || "auto").toLowerCase();
  const strategy = (process.env.AI_PROVIDER_STRATEGY || "auto").toLowerCase();

  // If user passed a specific provider strategy in the request, prioritize it
  let chosenPrimary: AIProviderName | null = null;
  if (["groq", "gemini", "openai"].includes(reqStrat) && configured.includes(reqStrat as AIProviderName)) {
    chosenPrimary = reqStrat as AIProviderName;
  } else if (["groq", "gemini", "openai"].includes(primary) && configured.includes(primary as AIProviderName)) {
    chosenPrimary = primary as AIProviderName;
  } else if (["groq", "gemini", "openai"].includes(strategy) && configured.includes(strategy as AIProviderName)) {
    chosenPrimary = strategy as AIProviderName;
  }

  if (chosenPrimary) {
    const remaining = configured.filter((p) => p !== chosenPrimary);
    return status.fallbackEnabled ? [chosenPrimary, ...remaining] : [chosenPrimary];
  }

  // Default auto order: Gemini provides rich Bangla agricultural domain intelligence, then Groq, then OpenAI
  const priorityOrder: AIProviderName[] = ["gemini", "groq", "openai"];
  const sequence = priorityOrder.filter((p) => configured.includes(p));

  return sequence.length > 0 ? sequence : configured;
}

/**
 * Calls a specific provider by name
 */
async function invokeProvider(
  provider: AIProviderName,
  systemPrompt: string,
  messages: { role: "user" | "assistant" | "system"; content: string }[]
): Promise<ProviderResult> {
  const options = {
    systemPrompt,
    messages,
    temperature: 0.35,
    maxTokens: 800,
    timeoutMs: 14000,
  };

  switch (provider) {
    case "gemini":
      return await callGeminiProvider(options);
    case "groq":
      return await callGroqProvider(options);
    case "openai":
      return await callOpenAIProvider(options);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

/**
 * Local offline agronomic fallback when all external APIs are unreachable
 */
function generateLocalOfflineAnswer(
  query: string,
  targetLanguage: "bn" | "en" | "banglish"
): string {
  const isBangla = targetLanguage === "bn" || targetLanguage === "banglish";
  const lower = query.toLowerCase();

  if (lower.includes("dhan") || lower.includes("ধান") || lower.includes("rice")) {
    return isBangla
      ? `**ধানের স্বাস্থ্য ও পরিচর্যা নির্দেশনা:**\n\n- **সমস্যা পর্যালোচনা:** ধানের পাতায় বাদামি দাগ, হলদে ভাব বা ব্লাস্টের প্রাথমিক লক্ষণ দেখা দিলে জমি থেকে অতিরিক্ত পানি নিষ্কাশন করে শুকনো অবস্থা (AWD পদ্ধতি) তৈরি করুন।\n- **করণীয়:** সুষম মাত্রায় পটাশ (MOP) সার প্রয়োগ করুন। ইউরিয়ার অতিরিক্ত ব্যবহার বন্ধ রাখুন।\n- **পরামর্শ:** পাতার সঠিক রোগ নির্ণয় করতে KrishiDrishti-এর **AI Leaf Scanner** (/scan) ব্যবহার করে পাতার ছবি আপলোড করুন। বিস্তারিত পরামর্শের জন্য স্থানীয় উপ-সহকারী কৃষি কর্মকর্তার সাথে যোগাযোগ করুন।`
      : `**Rice Crop Management Guidance:**\n\n- **Assessment:** For foliar spots or yellowing in paddy, avoid over-applying nitrogen/urea and ensure proper field drainage.\n- **Recommended Action:** Apply balanced potash (MOP) fertilizer and avoid water stagnation.\n- **Next Steps:** Please upload a leaf photo to KrishiDrishti's **AI Leaf Scanner** (/scan) for pathology confirmation.`;
  }

  if (lower.includes("tomato") || lower.includes("টমেটো") || lower.includes("alu") || lower.includes("আলু")) {
    return isBangla
      ? `**টমেটো ও আলু ফসলের সাধারণ রোগ ব্যবস্থাপনা:**\n\n- **সমস্যা:** পাতা কুঁকড়ানো বা ধসা রোগ সাধারণত ছত্রাক বা সাদা মাছির দ্বারা ছড়ায়।\n- **করণীয়:** নিচের রোগাক্রান্ত পাতাগুলো ছেঁটে ধ্বংস করুন। গাছে অতিরিক্ত পানি স্প্রে না করে গোড়ায় ড্রিপ সেচ দিন।\n- **পরামর্শ:** কোনো রাসায়নিক স্প্রে করার পূর্বে KrishiDrishti স্ক্যানারে পাতার স্পষ্ট ছবি তুলে রোগ নিশ্চিত হোন।`
      : `**Tomato & Potato Crop Guidance:**\n\n- **Assessment:** Foliar curling or blight symptoms often arise from fungal pathogens or sucking insect vectors.\n- **Action:** Prune bottom infected foliage and avoid overhead wetting.\n- **Next Step:** Upload a leaf image to KrishiDrishti Leaf Scanner for confirmation before chemical spray.`;
  }

  if (lower.includes("aam") || lower.includes("আম") || lower.includes("mango")) {
    return isBangla
      ? `**আম চাষ ও জমি প্রস্তুতি গাইডলাইন:**\n\n- **জমি নির্বাচন ও প্রস্তুতি:** উর্বর দোআঁশ বা বেলে-দোআঁশ মাটি আম চাষের জন্য উপযোগী। জমি ৩-৪ বার চাষ ও মই দিয়ে সমান করুন। বৃষ্টির পানি যাতে না জমে সেজন্য নিষ্কাশনের সুব্যবস্থা রাখুন।\n- **গর্ত তৈরি ও সার:** চারা রোপণের ১৫-২০ দিন আগে ৩×৩ ফুট আকারের গর্ত করুন। প্রতি গর্তে ১০-১৫ কেজি পচা গোবর, ২৫০ গ্রাম টিএসপি, ১৫০ গ্রাম এমওপি (পটাশ), ১০০ গ্রাম জিপসাম এবং ২০ গ্রাম বোরন সার মাটির সাথে মিশিয়ে গর্ত ভরে পানি দিন।\n- **রোপণ:** সার পচে মাটি স্বাভাবিক হলে সুস্থ গ্রাফটিং করা কলম বা চারা রোপণ করুন।`
      : `**Mango Cultivation & Land Preparation:**\n\n- **Soil & Preparation:** Fertile, well-draining loamy soil is ideal for mango. Deep plow 3-4 times. Ensure no waterlogging.\n- **Pit Preparation:** Dig 3x3 ft pits 15-20 days before planting. Mix 10-15 kg well-rotted cowdung, 250g TSP, 150g MOP, 100g Gypsum, and 20g Boron with topsoil.\n- **Planting:** Plant vigorous grafted saplings once soil and compost settle.`;
  }

  if (lower.includes("lichu") || lower.includes("লিচু") || lower.includes("litchi")) {
    return isBangla
      ? `**লিচু চাষ ও পরিচর্যা নির্দেশনা:**\n\n- **উপযুক্ত মাটি:** গভীর, উর্বর এবং নিষ্কাশনযুক্ত দোআঁশ বা পলিমাটি লিচুর জন্য সর্বোত্তম।\n- **জমি ও চারা রোপণ:** বর্ষার শুরুতে বা ভাদ্র-আশ্বিন মাসে ৮-১০ মিটার দূরত্বে ৩×৩ ফুট গর্ত করে রোপণ করুন। গর্তে জৈব সার ও সুষম রাসায়নিক সার প্রয়োগ করে ১৫ দিন পর গুটি কলমের চারা লাগান।\n- **পরিচর্যা:** ফল ধরার সময় খরা থাকলে নিয়মিত সেচ দিন এবং ফল ফেটে যাওয়া রোধে বোরন স্প্রে করুন।`
      : `**Litchi Crop Management Guidance:**\n\n- **Soil:** Deep, fertile, well-drained loamy soil is best.\n- **Planting:** Plant air-layered saplings 8-10m apart in prepared pits with well-rotted manure and balanced NPK.\n- **Care:** Provide regular irrigation during fruit development and spray boron to prevent fruit cracking.`;
  }

  if (lower.includes("garlic") || lower.includes("রসুন") || lower.includes("roshun") || lower.includes("peyaj") || lower.includes("পেঁয়াজ")) {
    return isBangla
      ? `**রসুন ও পেঁয়াজ চাষ পদ্ধতি:**\n\n- **বপনের সময়:** কার্তিক থেকে অগ্রহায়ণ (অক্টোবর-নভেম্বর) মাস রসুন ও পেঁয়াজ রোপণের সর্বোত্তম সময়। বিনা চাষেও রসুনের আবাদ জনপ্রিয়।\n- **জমি তৈরি ও সার:** ৪-৫ বার চাষ দিয়ে মাটি ঝুরঝুরে করুন। প্রতি বিঘায় ৫-৬ মণ গোবর, ২০-২৫ কেজি ডিএপি, ১৫ কেজি পটাশ ও ১০ কেজি জিপসাম শেষ চাষে প্রয়োগ করুন।\n- **বীজ রোপণ:** সারি থেকে সারি ১৫ সেমি এবং কোয়া থেকে কোয়ার দূরত্ব ১০ সেমি রেখে কোয়া মাটির নিচে ২-৩ সেমি গভীরে পুঁতে দিন।`
      : `**Garlic & Onion Cultivation Guidance:**\n\n- **Sowing Period:** October to November is optimal in Bangladesh.\n- **Soil Preparation:** Plow finely with compost, balanced DAP, MOP, and Gypsum.\n- **Spacing:** Plant cloves at 15cm x 10cm spacing, 2-3cm deep in moist soil.`;
  }

  if (lower.includes("begun") || lower.includes("বেগুন") || lower.includes("morich") || lower.includes("মরিচ")) {
    return isBangla
      ? `**বেগুন ও মরিচ ফসলের ব্যবস্থাপনা:**\n\n- **ডগা ও ফল ছিদ্রকারী পোকা:** আক্রমণ দেখা দিলে আক্রান্ত ডগা হাত দিয়ে ভেঙে ধ্বংস করুন। ফেরোমোন ফাঁদ ব্যবহার করুন।\n- **পাতা কুঁকড়ানো রোগ:** সাধারণত সাদা মাছি বা মাকড়ের কারণে হয়। নিম তেলের দ্রবণ (৫ মিলি/লিটার) অথবা অনুমোদিত মাকড়নাশক স্প্রে করুন।`
      : `**Eggplant & Chili Management:**\n\n- **Shoot & Fruit Borers:** Handpick and destroy infested shoots. Use pheromone traps.\n- **Leaf Curl / Mites:** Spray neem oil solution (5ml/L) or approved acaricides.`;
  }

  return isBangla
    ? `ধন্যবাদ! আপনার কৃষি জিজ্ঞাসাটি গৃহীত হয়েছে। বর্তমানে সার্ভার ব্যস্ত থাকায় এআই লাইভ সার্ভিস সীমাবদ্ধ হতে পারে। সাধারণ নিয়ম অনুযায়ী আক্রান্ত অংশ পরিষ্কার রাখুন, সুষম সার ও সেচ ব্যবস্থাপনা অনুসরণ করুন এবং রোগাক্রান্ত পাতার স্পষ্ট ছবি KrishiDrishti স্ক্যানারে আপলোড করুন।`
    : `Thank you for your agricultural inquiry. For specific diagnosis, please capture a close-up photo of the symptomatic leaf and test it using KrishiDrishti's AI Leaf Scanner.`;
}

/**
 * Central AI Service entry point
 */
export async function generateAgricultureAnswer(
  request: AgricultureChatRequest
): Promise<AgricultureChatResponse> {
  const rawMessage = (request.message || "").trim();
  const conversationId = request.conversationId || `conv-${Date.now().toString(36)}`;

  // 1. Validation
  if (!rawMessage) {
    return {
      success: false,
      answer: "অনুগ্রহ করে আপনার কৃষি বিষয়ক প্রশ্নটি লিখুন। (Please provide a question).",
      conversationId,
      detectedLanguage: "bn",
      responseLanguage: "bn",
      provider: "fallback-local",
      model: "none",
      error: "EMPTY_MESSAGE",
    };
  }

  if (rawMessage.length > 2500) {
    return {
      success: false,
      answer: "আপনার প্রশ্নটি অত্যন্ত দীর্ঘ। অনুগ্রহ করে সংক্ষেপে আপনার ফসলের লক্ষণ বা সমস্যা লিখুন।",
      conversationId,
      detectedLanguage: "bn",
      responseLanguage: "bn",
      provider: "fallback-local",
      model: "none",
      error: "MESSAGE_TOO_LONG",
    };
  }

  // 2. Language Analysis
  const langAnalysis = analyzeLanguage(rawMessage, request.languagePreference);
  const targetLanguage = langAnalysis.targetResponseLanguage;

  // 3. System Prompt
  const systemPrompt = buildAgriculturalSystemPrompt(targetLanguage, request.diseaseContext);

  // 4. Sanitize and prepare history (limit to last 10 messages)
  const history = Array.isArray(request.history) ? request.history : [];
  const sanitizedHistory = history
    .slice(-10)
    .filter((h) => h && typeof h.content === "string" && h.content.trim())
    .map((h) => ({
      role: (h.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
      content: h.content.trim().slice(0, 2000),
    }));

  const messagesPayload = [
    ...sanitizedHistory,
    { role: "user" as const, content: rawMessage },
  ];

  // 5. Provider Resolution and Fallback Execution
  const providerSequence = resolveProviderSequence(request.providerStrategy);
  let lastError: Error | null = null;
  let fallbackOccurred = false;

  for (let i = 0; i < providerSequence.length; i++) {
    const provider = providerSequence[i];
    try {
      console.log(`[aiService] Attempting provider: ${provider} (priority index ${i})`);
      const result = await invokeProvider(provider, systemPrompt, messagesPayload);

      return {
        success: true,
        answer: result.content,
        conversationId,
        detectedLanguage: langAnalysis.detectedLanguage,
        responseLanguage: targetLanguage,
        provider: result.provider,
        model: result.model,
        fallbackOccurred: i > 0,
      };
    } catch (err: any) {
      lastError = err;
      fallbackOccurred = true;
      console.warn(`[aiService] Provider ${provider} failed: ${err.message || err}. Checking next eligible provider...`);
    }
  }

  // 6. If all configured providers fail or none configured, use offline fallback
  console.error("[aiService] All AI providers exhausted or unavailable. Triggering fallback.");
  const offlineAnswer = generateLocalOfflineAnswer(rawMessage, targetLanguage);

  return {
    success: true,
    answer: offlineAnswer,
    conversationId,
    detectedLanguage: langAnalysis.detectedLanguage,
    responseLanguage: targetLanguage,
    provider: "fallback-local",
    model: "local-knowledgebase",
    error: lastError ? lastError.message : "NO_CONFIGURED_PROVIDERS",
    fallbackOccurred: true,
  };
}
