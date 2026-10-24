import { NextRequest, NextResponse } from "next/server";
import { getScansList, createScanRecord } from "@/lib/scans/serverScans";

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

function getAuthenticatedUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      token = request.cookies.get("krishi_auth_token")?.value || null;
    }
    if (!token) return null;
    return decodeJwtPayload(token);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    const searchParams = request.nextUrl.searchParams;

    const crop = searchParams.get("crop") || undefined;
    const status = searchParams.get("status") || undefined;
    const escalated = searchParams.get("escalated") === "true";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 50;

    const result = await getScansList({
      userId: user?.id || null,
      userRole: user?.role,
      crop,
      status,
      escalatedOnly: escalated,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[Scans API GET] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve scan history" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    const body = await request.json();

    if (!body.crop || !body.disease) {
      return NextResponse.json(
        { error: "Validation failed: 'crop' and 'disease' fields are required" },
        { status: 400 }
      );
    }

    const scan = await createScanRecord(body, user);
    return NextResponse.json({ scan, message: "Scan persisted successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("[Scans API POST] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to persist scan" },
      { status: 500 }
    );
  }
}
