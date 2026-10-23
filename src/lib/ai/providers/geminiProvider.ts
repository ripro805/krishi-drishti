import { ProviderGenerationOptions, ProviderResult } from "../types";

const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

export async function callGeminiProvider(
  options: ProviderGenerationOptions
): Promise<ProviderResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_CONFIG_ERROR: GEMINI_API_KEY is not configured.");
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
  const timeoutMs = options.timeoutMs || 15000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const cleanModel = model.replace(/^models\//, "");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;

  // Map messages to Gemini contents structure
  const contents = options.messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const payload: any = {
    system_instruction: {
      parts: [{ text: options.systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.maxTokens ?? 1024,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
        throw new Error(`GEMINI_RATE_LIMIT: Rate limit or quota exceeded: ${parsedError}`);
      }
      if (response.status === 400 || response.status === 403) {
        throw new Error(`GEMINI_AUTH_ERROR: Invalid key or request parameter: ${parsedError}`);
      }
      if (response.status === 404) {
        throw new Error(`GEMINI_MODEL_ERROR: Model not found (${cleanModel}): ${parsedError}`);
      }
      throw new Error(`GEMINI_API_ERROR (${response.status}): ${parsedError}`);
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText || typeof candidateText !== "string") {
      throw new Error("GEMINI_EMPTY_RESPONSE: Model returned an empty response.");
    }

    return {
      content: candidateText.trim(),
      provider: "gemini",
      model: cleanModel,
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`GEMINI_TIMEOUT: Request timed out after ${timeoutMs}ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
