import { ProviderGenerationOptions, ProviderResult } from "../types";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

export async function callOpenAIProvider(
  options: ProviderGenerationOptions
): Promise<ProviderResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_CONFIG_ERROR: OPENAI_API_KEY is not configured.");
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL;
  const timeoutMs = options.timeoutMs || 15000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const messagesPayload = [
    { role: "system", content: options.systemPrompt },
    ...options.messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: messagesPayload,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 1024,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedError = errorText;
      let errorCode = "";
      try {
        const errorJson = JSON.parse(errorText);
        parsedError = errorJson.error?.message || errorText;
        errorCode = errorJson.error?.code || "";
      } catch {
        // use raw errorText
      }

      if (response.status === 429 || errorCode === "insufficient_quota" || parsedError.includes("quota")) {
        throw new Error(`OPENAI_QUOTA_ERROR: OpenAI quota/credits exhausted or rate limited: ${parsedError}`);
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error(`OPENAI_AUTH_ERROR: Invalid OpenAI API key: ${parsedError}`);
      }
      throw new Error(`OPENAI_API_ERROR (${response.status}): ${parsedError}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      throw new Error("OPENAI_EMPTY_RESPONSE: Model returned an empty response.");
    }

    return {
      content: content.trim(),
      provider: "openai",
      model: data.model || model,
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`OPENAI_TIMEOUT: Request timed out after ${timeoutMs}ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
