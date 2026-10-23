import { NextResponse } from "next/server";
import { getAIProviderStatus } from "@/lib/ai/aiService";

export async function GET() {
  const status = getAIProviderStatus();
  const hasAtLeastOne = status.groq || status.gemini || status.openai;

  return NextResponse.json({
    status: hasAtLeastOne ? "ready" : "no_configured_providers",
    service: "KrishiDrishti AI Agriculture Chatbot",
    providers: {
      groq: status.groq,
      gemini: status.gemini,
      openai: status.openai,
    },
    strategy: status.strategy,
    primary: status.primary,
    fallbackEnabled: status.fallbackEnabled,
    timestamp: new Date().toISOString(),
  });
}
