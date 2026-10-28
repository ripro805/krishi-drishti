export type SupportedLanguage = "auto" | "bn" | "en" | "banglish";

export type AIProviderName = "openai" | "gemini" | "groq";

export type AIProviderStrategy = "auto" | "openai" | "gemini" | "groq";

export interface ChatMessageItem {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
}

export interface DiseaseDetectionContext {
  crop?: string;
  banglaCrop?: string;
  diseaseName?: string;
  banglaDiseaseName?: string;
  confidence?: number;
  severity?: string;
  scanId?: string;
}

export interface AgricultureChatRequest {
  message: string;
  conversationId?: string;
  languagePreference?: SupportedLanguage;
  providerStrategy?: AIProviderStrategy;
  history?: ChatMessageItem[];
  diseaseContext?: DiseaseDetectionContext;
}

export interface AgricultureChatResponse {
  success: boolean;
  answer: string;
  conversationId: string;
  detectedLanguage: "bn" | "en" | "banglish";
  responseLanguage: "bn" | "en" | "banglish";
  provider: AIProviderName | "fallback-local" | "database-cache";
  model: string;
  error?: string;
  fallbackOccurred?: boolean;
  fromCache?: boolean;
  cachedTopic?: string;
}

export interface ProviderGenerationOptions {
  systemPrompt: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface ProviderResult {
  content: string;
  provider: AIProviderName;
  model: string;
}
