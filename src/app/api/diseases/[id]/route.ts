import { NextRequest, NextResponse } from "next/server";
import { getDiseaseByIdServer, saveDiseaseServer, deleteDiseaseServer } from "@/lib/admin/serverAdmin";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const disease = await getDiseaseByIdServer(params.id);
    if (!disease) {
      return NextResponse.json({ error: "Disease record not found" }, { status: 404 });
    }
    return NextResponse.json({ disease });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve disease" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const role = getUserRole(request);
    if (!role || (role !== "admin" && role !== "expert")) {
      return NextResponse.json(
        { error: "Unauthorized: Administrator or expert role required to update disease records" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const disease = await saveDiseaseServer({ ...body, id: params.id }, role);
    return NextResponse.json({ disease, message: "Disease updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update disease" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const role = getUserRole(request);
    if (!role || role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only administrators can delete disease records" },
        { status: 403 }
      );
    }

    const success = await deleteDiseaseServer(params.id, role);
    if (!success) {
      return NextResponse.json({ error: "Disease record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Disease deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete disease" },
      { status: 500 }
    );
  }
}
