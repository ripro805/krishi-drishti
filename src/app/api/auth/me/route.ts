import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken, findUserById } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Check Authorization header or Cookie
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      token = request.cookies.get("krishi_auth_token")?.value || null;
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const payload = verifyAuthToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
    }

    const user = await findUserById(payload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { passwordHash: _, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (err: any) {
    console.error("[Auth Me API] Error:", err);
    return NextResponse.json({ error: "Authentication verification failed" }, { status: 500 });
  }
}
