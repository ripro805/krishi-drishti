import { ProviderGenerationOptions, ProviderResult } from "../types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";

export async function callGroqProvider(
  options: ProviderGenerationOptions
): Promise<ProviderResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_CONFIG_ERROR: GROQ_API_KEY is not configured.");
  }

  const model = process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;
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
    const response = await fetch(GROQ_API_URL, {
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
      try {
        const errorJson = JSON.parse(errorText);
        parsedError = errorJson.error?.message || errorText;
      } catch {
        // use raw errorText
      }

      if (response.status === 429) {
        throw new Error(`GROQ_RATE_LIMIT: Rate limit exceeded: ${parsedError}`);
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error(`GROQ_AUTH_ERROR: Invalid API key: ${parsedError}`);
      }
      throw new Error(`GROQ_API_ERROR (${response.status}): ${parsedError}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      throw new Error("GROQ_EMPTY_RESPONSE: Model returned an empty response.");
    }

    return {
      content: content.trim(),
      provider: "groq",
      model: data.model || model,
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`GROQ_TIMEOUT: Request timed out after ${timeoutMs}ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
