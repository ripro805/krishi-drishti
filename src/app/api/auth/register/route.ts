import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, hashPassword, saveNewUser, generateToken } from "@/lib/auth/serverAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password, phone, role, district, upazila } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "সঠিক পূর্ণ নাম প্রদান করুন।" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "সঠিক ইমেল ঠিকানা প্রদান করুন।" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।" }, { status: 400 });
    }

    // Check duplicate
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "এই ইমেল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা আছে।" },
        { status: 409 }
      );
    }

    // Hash password securely with bcrypt
    const passwordHash = await hashPassword(password);

    const newUser = await saveNewUser({
      name,
      email,
      passwordHash,
      phone,
      role: role || "farmer",
      district,
      upazila,
    });

    const token = generateToken(newUser);

    // Return sanitized user (never return passwordHash)
    const { passwordHash: _, ...safeUser } = newUser;

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
    console.error("[Auth Register API] Error:", err);
    return NextResponse.json({ error: err.message || "Registration failed" }, { status: 500 });
  }
}
