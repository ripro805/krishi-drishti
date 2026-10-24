import { NextRequest, NextResponse } from "next/server";
import { submitFeedbackRecord, getFeedbackListServer } from "@/lib/feedback/serverFeedback";

export const dynamic = "force-dynamic";

function decodeJwtPayload(token: string): { id?: string; role?: string; email?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payloadJson = Buffer.from(parts[1], "base64url").toString("utf-8");
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || undefined;
    const rating = searchParams.get("rating") || undefined;

    const data = await getFeedbackListServer({ status, rating });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[Feedback API GET] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve feedback list" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      token = request.cookies.get("krishi_auth_token")?.value || null;
    }
    const user = token ? decodeJwtPayload(token) : null;

    const body = await request.json();

    if (!body.scanId || !body.crop || !body.disease || !body.rating) {
      return NextResponse.json(
        { error: "Validation failed: 'scanId', 'crop', 'disease', and 'rating' are required" },
        { status: 400 }
      );
    }

    const feedback = await submitFeedbackRecord({
      scanId: body.scanId,
      crop: body.crop,
      disease: body.disease,
      banglaDisease: body.banglaDisease,
      confidence: body.confidence,
      rating: body.rating,
      comment: body.comment,
      userName: body.userName,
      userId: user?.id || body.userId,
    });

    return NextResponse.json(
      { feedback, message: "Feedback submitted and persisted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    const isValidation = error.message.includes("Invalid rating") || error.message.includes("exceeds maximum length");
    return NextResponse.json(
      { error: error?.message || "Failed to submit feedback" },
      { status: isValidation ? 400 : 500 }
    );
  }
}
