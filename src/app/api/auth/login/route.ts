import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, verifyPassword, generateToken } from "@/lib/auth/serverAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "ইমেল ও পাসওয়ার্ড উভয়ই প্রদান করতে হবে।" },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "এই ইমেল ঠিকানায় কোনো অ্যাকাউন্ট পাওয়া যায়নি।" },
        { status: 401 }
      );
    }

    // Verify password hash with bcrypt
    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "ভুল পাসওয়ার্ড। অনুগ্রহ করে সঠিক পাসওয়ার্ড প্রদান করুন।" },
        { status: 401 }
      );
    }

    const token = generateToken(user);
    const { passwordHash: _, ...safeUser } = user;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set("krishi_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 3600,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("[Auth Login API] Error:", err);
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
