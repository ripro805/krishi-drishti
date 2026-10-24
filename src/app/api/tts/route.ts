import { NextRequest, NextResponse } from "next/server";

// In-memory cache for generated TTS audio buffers (max 100 entries)
const audioCache = new Map<string, { buffer: Buffer; timestamp: number }>();
const MAX_CACHE_SIZE = 100;

function cleanOldCache() {
  if (audioCache.size > MAX_CACHE_SIZE) {
    const oldestKey = audioCache.keys().next().value;
    if (oldestKey) audioCache.delete(oldestKey);
  }
}

/**
 * Server-side Bangla TTS Endpoint
 * GET /api/tts?text=...
 * POST /api/tts { text: "..." }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text")?.trim();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    return await handleTTSRequest(text);
  } catch (err: any) {
    console.error("[TTS API] Error handling request:", err);
    return NextResponse.json({ error: err.message || "Failed to synthesize speech" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    return await handleTTSRequest(text);
  } catch (err: any) {
    console.error("[TTS API] Error handling POST request:", err);
    return NextResponse.json({ error: err.message || "Failed to synthesize speech" }, { status: 500 });
  }
}

async function handleTTSRequest(rawText: string) {
  // Cap length to protect server resources
  const text = rawText.slice(0, 600);

  // Check cache
  const cached = audioCache.get(text);
  if (cached) {
    return new Response(new Uint8Array(cached.buffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
        "X-Audio-Cache": "HIT",
      },
    });
  }

  // Split into chunks of max 180 characters along sentence boundaries (।, ., ,, ?, !)
  const chunks = splitIntoChunks(text, 180);
  const audioBuffers: Buffer[] = [];

  for (const chunk of chunks) {
    if (!chunk.trim()) continue;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=bn&client=tw-ob`;
    
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`TTS upstream returned status ${res.status}`);
    }

    const arrayBuf = await res.arrayBuffer();
    audioBuffers.push(Buffer.from(arrayBuf));
  }

  const mergedBuffer = Buffer.concat(audioBuffers);

  // Store in cache
  cleanOldCache();
  audioCache.set(text, { buffer: mergedBuffer, timestamp: Date.now() });

  return new Response(new Uint8Array(mergedBuffer), {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": mergedBuffer.length.toString(),
      "Cache-Control": "public, max-age=86400",
      "X-Audio-Cache": "MISS",
    },
  });
}

function splitIntoChunks(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) return [text];

  const sentences = text.split(/(?<=[।?!.,\n])/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length <= maxLength) {
      current += sentence;
    } else {
      if (current) chunks.push(current);
      current = sentence;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}
