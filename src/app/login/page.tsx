"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import {
  LogIn,
  Scan,
  ShieldCheck,
  UserCheck,
  Sprout,
  Stethoscope,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin, isAuthenticated, currentUser } = useAuth();
  const { isBangla } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await login({ email, password });
    setIsLoading(false);

    if (result.success) {
      router.push("/scan");
    } else {
      setError(result.error || "লগইন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
    }
  };

  const handleDemo = (role: "farmer" | "expert" | "admin") => {
    demoLogin(role);
    router.push(role === "admin" ? "/admin" : "/scan");
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-500 to-agri-700 text-white shadow-lg shadow-agri-600/30 mb-2">
            <Scan className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isBangla ? "কৃষি দৃষ্টি অ্যাকাউন্টে প্রবেশ করুন" : "Sign In to KrishiDrishti"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isBangla
              ? "রোগ নির্ণয়ের ইতিহাস ও বিশেষজ্ঞ পরামর্শ পেতে লগইন করুন"
              : "Access your field scan logs and personalized agronomic guidance"}
          </p>
        </div>

        {/* 1-Click Demo Login Box */}
        <div className="mb-6 rounded-2xl border border-agri-200 bg-agri-50/70 p-4 dark:border-agri-900/60 dark:bg-agri-950/30">
          <p className="text-xs font-bold text-agri-900 dark:text-agri-200 mb-2.5 flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-agri-600" />
            {isBangla ? "দ্রুত টেস্ট লগইন (১-ক্লিক ডেমো অ্যাকাউন্ট):" : "Fast 1-Click Demo Accounts:"}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemo("farmer")}
              className="flex flex-col items-center justify-center rounded-xl bg-white p-2.5 text-center shadow-sm border border-agri-200 hover:border-agri-400 dark:bg-slate-800 dark:border-slate-700 transition-all hover:scale-[1.02]"
            >
              <Sprout className="h-5 w-5 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">কৃষক</span>
              <span className="text-[9px] text-slate-400">Farmer</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemo("expert")}
              className="flex flex-col items-center justify-center rounded-xl bg-white p-2.5 text-center shadow-sm border border-agri-200 hover:border-agri-400 dark:bg-slate-800 dark:border-slate-700 transition-all hover:scale-[1.02]"
            >
              <Stethoscope className="h-5 w-5 text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">কৃষিবিদ</span>
              <span className="text-[9px] text-slate-400">Officer</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemo("admin")}
              className="flex flex-col items-center justify-center rounded-xl bg-white p-2.5 text-center shadow-sm border border-agri-200 hover:border-agri-400 dark:bg-slate-800 dark:border-slate-700 transition-all hover:scale-[1.02]"
            >
              <ShieldCheck className="h-5 w-5 text-purple-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">অ্যাডমিন</span>
              <span className="text-[9px] text-slate-400">Admin</span>
            </button>
          </div>
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
                {isBangla ? "ইমেল বা মোবাইল নম্বর" : "Email or Phone Number"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@krishi.gov.bd"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isBangla ? "পাসওয়ার্ড" : "Password"}
                </label>
                <span className="text-[11px] text-slate-400">
                  {isBangla ? "(ডেমোর জন্য যেকোনো ৪+ অক্ষর)" : "(4+ chars for demo)"}
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading
                ? isBangla
                  ? "প্রবেশ করা হচ্ছে..."
                  : "Signing In..."
                : isBangla
                ? "লগইন করুন"
                : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isBangla ? "নতুন একাউন্ট খুলতে চান? " : "Don't have an account yet? "}
              <Link
                href="/register"
                className="font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400 underline"
              >
                {isBangla ? "বিনামূল্যে নিবন্ধন করুন" : "Register Free"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
