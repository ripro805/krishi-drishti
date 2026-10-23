import { NextRequest, NextResponse } from "next/server";
import { generateAgricultureAnswer } from "@/lib/ai/aiService";
import { AgricultureChatRequest } from "@/lib/ai/types";

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip = request.headers.get("x-forwarded-for") || "client-local";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "RATE_LIMIT_EXCEEDED",
          message: "এক মিনিটে অতিরিক্ত অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন। (Too many requests. Please wait a moment.)",
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate JSON body
    let body: AgricultureChatRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "INVALID_JSON", message: "Invalid JSON in request payload" },
        { status: 400 }
      );
    }

    const { message, conversationId, languagePreference, history, diseaseContext } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "VALIDATION_ERROR", message: "মেসেজ ফাঁকা হতে পারে না। (Message is required)" },
        { status: 400 }
      );
    }

    if (message.length > 2500) {
      return NextResponse.json(
        { success: false, error: "VALIDATION_ERROR", message: "মেসেজের দৈর্ঘ্য সর্বোচ্চ ২৫০০ অক্ষরের মধ্যে হতে হবে।" },
        { status: 400 }
      );
    }

    // 3. Generate Answer through centralized AI Service
    const response = await generateAgricultureAnswer({
      message,
      conversationId,
      languagePreference,
      history,
      diseaseContext,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("[/api/chat] Error:", error.message || error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "দুঃখিত, কৃষি সহকারীর সার্ভারে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
      },
      { status: 500 }
    );
  }
}
