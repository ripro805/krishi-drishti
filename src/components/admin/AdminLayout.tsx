"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  LayoutDashboard,
  Users,
  Database,
  Activity,
  MessageSquare,
  FileEdit,
  ShieldCheck,
  ArrowLeft,
  Scan,
  AlertTriangle,
} from "lucide-react";

const ADMIN_LINKS = [
  { name: "ড্যাশবোর্ড (Dashboard)", href: "/admin", icon: LayoutDashboard },
  { name: "ব্যবহারকারী (Users)", href: "/admin/users", icon: Users },
  { name: "রোগ তথ্যভান্ডার (Diseases)", href: "/admin/diseases", icon: Database },
  { name: "প্রেডিকশন মনিটরিং (Scans)", href: "/admin/predictions", icon: Activity },
  { name: "ফিডব্যাক বিশ্লেষণ (Feedback)", href: "/admin/feedback", icon: MessageSquare },
  { name: "কনটেন্ট ও নোটিশ (Content)", href: "/admin/content", icon: FileEdit },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { currentUser, isAdmin, demoLogin } = useAuth();
  const { isBangla } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md shadow-purple-600/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {isBangla ? "কৃষি দৃষ্টি অ্যাডমিন কন্ট্রোল প্যানেল" : "KrishiDrishti Admin Dashboard"}
                </h1>
                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">
                  SYSTEM ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isBangla
                  ? "ব্যবহারকারী, রোগের তথ্যভান্ডার, প্রেডিকশন কার্যকলাপ ও ফিডব্যাক পরিচালনা করুন"
                  : "Manage users, pathology knowledge base, prediction metrics, and farmer feedback"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isAdmin && (
              <button
                type="button"
                onClick={() => demoLogin("admin")}
                className="rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-purple-700"
              >
                সুইচ টু অ্যাডমিন (Switch to Admin)
              </button>
            )}

            <Link
              href="/scan"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <Scan className="h-3.5 w-3.5 text-agri-600" />
              {isBangla ? "স্ক্যানারে যান" : "Leaf Scanner"}
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-2 mb-8 bg-white dark:bg-slate-900 px-4 rounded-2xl border shadow-sm">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-3.5 px-3 text-xs sm:text-sm font-bold transition-colors ${
                  isActive
                    ? "border-purple-600 text-purple-700 dark:text-purple-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Content Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};
