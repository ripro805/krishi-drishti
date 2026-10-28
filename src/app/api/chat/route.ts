import { NextRequest, NextResponse } from "next/server";
import { generateAgricultureAnswer } from "@/lib/ai/aiService";
import { AgricultureChatRequest } from "@/lib/ai/types";
import {
  findCachedKnowledgeAnswer,
  saveToKnowledgeDatabase,
} from "@/lib/ai/chatKnowledgeService";

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

    const { message, conversationId, languagePreference, providerStrategy, history, diseaseContext } = body;

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

    // 3. STEP A: Check Database Cache for existing cultivation technique or frequent answer
    // This avoids redundant AI API calls for common farming methods (e.g. mango, strawberry, tomato chas).
    const cachedRecord = findCachedKnowledgeAnswer(message);
    if (cachedRecord) {
      console.log(`[/api/chat] Database Cache HIT for: "${message}" -> Stored Topic: "${cachedRecord.topic}"`);
      return NextResponse.json(
        {
          success: true,
          answer: cachedRecord.answer,
          conversationId: conversationId || `conv-${Date.now().toString(36)}`,
          detectedLanguage: cachedRecord.language,
          responseLanguage: cachedRecord.language,
          provider: "database-cache",
          model: "agri-knowledge-base",
          cachedTopic: cachedRecord.topic,
          fromCache: true,
        },
        { status: 200 }
      );
    }

    console.log(`[/api/chat] Database Cache MISS for: "${message}". Invoking AI Provider API...`);

    // 3. STEP B: Generate Answer through centralized AI Service when not found in Database
    const response = await generateAgricultureAnswer({
      message,
      conversationId,
      languagePreference,
      providerStrategy,
      history,
      diseaseContext,
    });

    // 4. STEP C: Automatically save newly answered questions into the Database for future queries
    if (response.success && response.answer && response.answer.length >= 20) {
      try {
        saveToKnowledgeDatabase(message, response.answer, {
          crop: diseaseContext?.crop,
          language: response.responseLanguage,
        });
      } catch (saveErr: any) {
        console.warn("[/api/chat] Notice: Could not save to knowledge database:", saveErr.message || saveErr);
      }
    }

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
