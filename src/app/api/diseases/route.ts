import { NextRequest, NextResponse } from "next/server";
import { getDiseasesListServer, saveDiseaseServer } from "@/lib/admin/serverAdmin";

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

function getUserRole(request: NextRequest): string | undefined {
  try {
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      token = request.cookies.get("krishi_auth_token")?.value || null;
    }
    if (!token) return undefined;
    const payload = decodeJwtPayload(token);
    return payload?.role;
  } catch {
    return undefined;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const crop = searchParams.get("crop") || undefined;
    const search = searchParams.get("search") || undefined;

    const data = await getDiseasesListServer({ crop, search });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve diseases" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const role = getUserRole(request);
    if (!role || (role !== "admin" && role !== "expert")) {
      return NextResponse.json(
        { error: "Unauthorized: Administrator or expert role required to add disease records" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const disease = await saveDiseaseServer(body, role);
    return NextResponse.json({ disease, message: "Disease record saved successfully" }, { status: 201 });
  } catch (error: any) {
    const isValidation = error.message.includes("Validation failed");
    return NextResponse.json(
      { error: error.message },
      { status: isValidation ? 400 : 500 }
    );
  }
}
