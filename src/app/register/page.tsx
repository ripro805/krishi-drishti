"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/common/Button";
import { UserRole } from "@/types/auth";
import {
  UserPlus,
  Scan,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { isBangla } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("farmer");
  const [district, setDistrict] = useState("বগুড়া");
  const [upazila, setUpazila] = useState("শিবগঞ্জ");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await register({
      name,
      email,
      phone,
      password,
      role,
      district,
      upazila,
    });

    setIsLoading(false);

    if (result.success) {
      router.push("/scan");
    } else {
      setError(result.error || "নিবন্ধন সম্পন্ন হতে পারেনি। পুনরায় চেষ্টা করুন।");
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-500 to-agri-700 text-white shadow-lg shadow-agri-600/30 mb-2">
            <Scan className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isBangla ? "নতুন কৃষক অ্যাকাউন্ট নিবন্ধন" : "Create KrishiDrishti Account"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isBangla
              ? "বিনামূল্যে অ্যাকাউন্ট খুলে ফসলের সুরক্ষা ও বিশেষজ্ঞদের পরামর্শ গ্রহণ করুন"
              : "Register to save your disease scans and unlock direct agronomic support"}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-2xl bg-rose-50 p-3.5 text-xs text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900 animate-fadeIn">
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isBangla ? "আপনার পুরো নাম" : "Full Name"}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isBangla ? "ইমেল ঠিকানা" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isBangla ? "মোবাইল নম্বর" : "Phone Number"}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isBangla ? "ব্যবহারকারীর ধরণ (ভূমিকা)" : "Account Type (Role)"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`rounded-xl p-2.5 text-center text-xs font-bold transition-all border ${
                    role === "farmer"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  🌾 কৃষক (Farmer)
                </button>

                <button
                  type="button"
                  onClick={() => setRole("expert")}
                  className={`rounded-xl p-2.5 text-center text-xs font-bold transition-all border ${
                    role === "expert"
                      ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  🩺 কৃষিবিদ (Officer)
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`rounded-xl p-2.5 text-center text-xs font-bold transition-all border ${
                    role === "admin"
                      ? "border-purple-500 bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-200 ring-2 ring-purple-500/20"
                      : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  🛡️ অ্যাডমিন (Admin)
                </button>
              </div>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isBangla ? "জেলা" : "District"}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="যেমন: বগুড়া"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isBangla ? "উপজেলা" : "Upazila"}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    placeholder="যেমন: শিবগঞ্জ"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isBangla ? "পাসওয়ার্ড নির্ধারণ করুন" : "Set Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              className="w-full justify-center shadow-lg shadow-agri-600/30 mt-2"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isLoading
                ? isBangla
                  ? "নিবন্ধন করা হচ্ছে..."
                  : "Registering..."
                : isBangla
                ? "অ্যাকাউন্ট তৈরি সম্পন্ন করুন"
                : "Complete Registration"}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isBangla ? "ইতিমধ্যে অ্যাকাউন্ট আছে? " : "Already have an account? "}
              <Link
                href="/login"
                className="font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400 underline"
              >
                {isBangla ? "এখানে লগইন করুন" : "Sign In Here"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
