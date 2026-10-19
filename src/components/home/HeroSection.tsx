"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Scan,
  TrendingUp,
  Volume2,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useLanguage } from "@/context/LanguageContext";

export const HeroSection: React.FC = () => {
  const { isBangla } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-agri-100/60 via-agri-50/20 to-transparent dark:from-agri-950/20 dark:via-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-agri-300 bg-agri-50/90 px-4 py-1.5 text-xs font-semibold text-agri-800 shadow-sm backdrop-blur-sm dark:border-agri-800 dark:bg-agri-950/60 dark:text-agri-300 animate-fadeIn">
            <span className="flex h-2 w-2 rounded-full bg-agri-500 animate-pulse" />
            <span>{isBangla ? "কৃষি দৃষ্টি (KrishiDrishti)" : "AI-Powered Plant Pathology"}</span>
            <span className="text-agri-400">&bull;</span>
            <span className="text-agri-700 dark:text-agri-400 font-bold">
              {isBangla ? "বাংলা কৃষি সহকারী ও স্ক্রিনিং" : "98% Laboratory Standard"}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            {isBangla ? (
              <>
                পাতার ছবি দিয়ে ফসলের রোগ শনাক্তকরণ ও{" "}
                <span className="bg-gradient-to-r from-agri-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  সহজ বাংলায় পরামর্শ
                </span>
              </>
            ) : (
              <>
                Professional Crop Disease Screening with{" "}
                <span className="bg-gradient-to-r from-agri-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  98% Accuracy
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isBangla
              ? "কৃষক ভাইদের জন্য এআই-চালিত স্মার্ট প্ল্যাটফর্ম। পাতার ছবি আপলোড বা ক্যামেরা দিয়ে ছবি তুলে মুহূর্তেই রোগ শনাক্ত করুন, বাংলায় অডিও পরামর্শ শুনুন এবং সঠিক রোগ ব্যবস্থাপনা জানুন।"
              : "Specialized AI agricultural platform for screening crop leaf diseases instantly. Get verified Bangla guidance, Text-to-Speech audio advice, and clinical treatment protocols in seconds."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link href="/scan">
              <Button size="lg" className="shadow-lg shadow-agri-600/30 text-base font-semibold">
                <Scan className="h-5 w-5 mr-1" />
                {isBangla ? "এখনই রোগ নির্ণয় করুন" : "Detect Disease Now"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            <Link href="/supported-crops">
              <Button variant="outline" size="lg" className="text-base font-semibold">
                {isBangla ? "সমর্থিত ফসল ও রোগ তালিকা" : "Supported Crops & Diseases"}
              </Button>
            </Link>
          </div>

          {/* Key Metric Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-agri-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBangla ? "সহজ বাংলা" : "Bangla Interface"}
                </p>
                <p className="text-xs text-slate-500">
                  {isBangla ? "কৃষকবান্ধব নির্দেশনা" : "Farming Guidance"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Volume2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBangla ? "ভয়েস সহকারী" : "Voice Assistant"}
                </p>
                <p className="text-xs text-slate-500">
                  {isBangla ? "অডিওতে পরামর্শ শুনুন" : "Text-to-Speech"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBangla ? "সেফটি গার্ড" : "Low Match Alert"}
                </p>
                <p className="text-xs text-slate-500">
                  {isBangla ? "কম কনফিডেন্স সতর্কতা" : "Safety Protection"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-agri-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBangla ? "যাচাইকৃত তথ্য" : "Verified Advice"}
                </p>
                <p className="text-xs text-slate-500">
                  {isBangla ? "BARI ও AIS নির্দেশনা" : "Agricultural Standard"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
