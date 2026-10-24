import { NextRequest, NextResponse } from "next/server";
import { getScanById, updateScanStatus, deleteScanRecord } from "@/lib/scans/serverScans";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const scan = await getScanById(params.id);
    if (!scan) {
      return NextResponse.json({ error: "Scan record not found" }, { status: 404 });
    }
    return NextResponse.json({ scan });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve scan" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthenticatedUser(request);
    const body = await request.json();

    if (!body.status || !["Active", "Treated", "Monitoring"].includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'Active', 'Treated', or 'Monitoring'" },
        { status: 400 }
      );
    }

    const updated = await updateScanStatus(params.id, body.status, user);
    if (!updated) {
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    return NextResponse.json({ scan: updated, message: `Status updated to ${body.status}` });
  } catch (error: any) {
    const status = error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthenticatedUser(request);
    const success = await deleteScanRecord(params.id, user);
    if (!success) {
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Scan deleted successfully" });
  } catch (error: any) {
    const status = error.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
