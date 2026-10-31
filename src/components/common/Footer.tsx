"use client";

import React from "react";
import Link from "next/link";
import { Scan, ShieldCheck, Mail, ArrowUpRight, Heart, Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { isBangla } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 py-16 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-500 to-agri-600 text-white shadow-md">
                <Scan className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {isBangla ? "কৃষি" : "Krishi"}{" "}
                <span className="text-agri-400">{isBangla ? "দৃষ্টি (KrishiDrishti)" : "Drishti AI"}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              {isBangla
                ? "ডিপ ভিশন কনভোলিউশনাল নিউরাল নেটওয়ার্ক চালিত আধুনিক উদ্ভিদ প্যাথলজি প্ল্যাটফর্ম। ৩ সেকেন্ডের মধ্যে ৯৮% ল্যাবরেটরি বেঞ্চমার্ক নির্ভুলতায় ফসলের রোগ নির্ণয়।"
                : "Professional agricultural pathology platform powered by deep vision neural networks. Identify 200+ crop diseases in under 3 seconds with 98% laboratory benchmark accuracy."}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-agri-300">
              <ShieldCheck className="h-4 w-4 text-agri-400" />
              <span>
                {isBangla
                  ? "প্ল্যান্টভিলেজ ডেটাসেট দ্বারা যাচাইকৃত • গ্লোবাল এগ্রোনমি বেঞ্চমার্ক"
                  : "PlantVillage Dataset Validated • Global Field Agronomy Benchmarks"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              {isBangla ? "ডায়াগনস্টিক টুলস" : "Diagnostic Tools"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/scan" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  {isBangla ? "এআই লিফ স্ক্যানার" : "AI Leaf Scanner"} <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/crop-doctor" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  {isBangla ? "ক্রপ ডক্টর সহকারী" : "Crop Doctor AI Assistant"} <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  {isBangla ? "সার ক্যালকুলেটর" : "Fertilizer Dosage Engine"} <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  {isBangla ? "রোগ তথ্যভাণ্ডার" : "Pathology Encyclopedia"} <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-agri-400 transition-colors flex items-center gap-1">
                  {isBangla ? "স্ক্যান ইতিহাস ও রিপোর্ট" : "Scan History & Reports"} <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Plant Groups */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              {isBangla ? "সমর্থিত ফসল" : "Supported Crops"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/scan?crop=Rice" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "ধান ও খাদ্যশস্য (Paddy)" : "Rice & Field Grains"}
                </Link>
              </li>
              <li>
                <Link href="/scan?crop=Tomato" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "টমেটো ও বেগুন (Solanaceae)" : "Tomato & Nightshades"}
                </Link>
              </li>
              <li>
                <Link href="/scan?crop=Potato" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "আলু ও কন্দ ফসল (Tubers)" : "Potato & Root Tubers"}
                </Link>
              </li>
              <li>
                <Link href="/scan?crop=Chili" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "মরিচ ও গোলমরিচ (Peppers)" : "Chili & Bell Peppers"}
                </Link>
              </li>
              <li>
                <Link href="/supported-crops" className="text-agri-400 font-semibold hover:underline">
                  {isBangla ? "সকল ১৬টি ফসল দেখুন →" : "All 16 Crops List →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Security */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              {isBangla ? "পোর্টাল ও অ্যাক্সেস" : "Portals & Access"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/expert" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "কৃষি বিশেষজ্ঞ পোর্টাল" : "Agronomist Portal"}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "সিস্টেম অ্যাডমিন প্যানেল" : "System Admin Panel"}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "ইউজার লগইন" : "Farmer Account Sign In"}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-agri-400 transition-colors">
                  {isBangla ? "নতুন অ্যাকাউন্ট খুলুন" : "Create Free Account"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} KrishiDrishti (কৃষি দৃষ্টি) AI.{" "}
            {isBangla ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <Leaf className="h-3.5 w-3.5 text-agri-400" />
              {isBangla ? "টেকসই কৃষির সহযোগী" : "Sustainable Smart Agriculture"}
            </span>
            <span>•</span>
            <span>{isBangla ? "গোপনীয়তা ও শর্তাবলী" : "Privacy Policy & Terms"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
