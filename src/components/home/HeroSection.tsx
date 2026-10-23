"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Scan,
  Volume2,
  AlertTriangle,
  Layers,
  Bot,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const HeroSection: React.FC = () => {
  const { isBangla } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Eye-catching background effects: Ambient mesh gradients & grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[580px] bg-radial-mesh pointer-events-none -z-10 blur-3xl" />
      
      {/* Decorative floating blur circles */}
      <div className="absolute top-16 left-[5%] w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-28 right-[5%] w-[420px] h-[420px] rounded-full bg-teal-300/20 blur-3xl pointer-events-none -z-10" />

      {/* Main Expansive Container */}
      <div className="relative mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Main Hero Header */}
        <div className="text-center max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-7 xl:space-y-8">
          {/* Top Floating Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-white/90 px-5 py-2 text-xs sm:text-sm font-semibold text-emerald-900 shadow-sm shadow-emerald-500/10 backdrop-blur-md dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 animate-fadeIn">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-400" />
            </span>
            <span className="font-bold">
              {isBangla ? "কৃষি দৃষ্টি (KrishiDrishti)" : "KrishiDrishti AI v2.4"}
            </span>
            <span className="text-emerald-300 dark:text-emerald-700 font-bold">•</span>
            <span className="text-emerald-700 dark:text-emerald-300">
              {isBangla ? "বাংলা কৃষি সহকারী ও নির্ভুল রোগ স্ক্রিনিং" : "98.2% Accuracy Benchmark"}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[66px] 2xl:text-[72px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25] sm:leading-[1.18] xl:leading-[1.15]">
            {isBangla ? (
              <>
                <span className="inline-block">পাতার ছবি দিয়ে ফসলের রোগ শনাক্তকরণ</span>
                <span className="block mt-2 sm:mt-3 xl:mt-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent drop-shadow-xs">
                  ও সহজ বাংলায় সঠিক পরামর্শ
                </span>
              </>
            ) : (
              <>
                <span className="inline-block">Identify Crop Leaf Diseases with</span>
                <span className="block mt-2 sm:mt-3 xl:mt-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent drop-shadow-xs">
                  98.2% Neural AI Accuracy
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl xl:max-w-5xl mx-auto font-normal">
            {isBangla
              ? "কৃষক ভাইদের জন্য অত্যাধুনিক এআই-চালিত স্মার্ট প্ল্যাটফর্ম। আক্রান্ত পাতার ছবি তুলে মুহূর্তেই রোগ শনাক্ত করুন, বাংলায় অডিও পরামর্শ শুনুন এবং BARI ও AIS নির্দেশিত সঠিক রোগ ব্যবস্থাপনা জানুন।"
              : "Specialized AI agricultural platform for screening crop leaf diseases instantly. Get verified Bangla guidance, Text-to-Speech audio advice, and clinical treatment protocols in seconds."}
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-3">
            <Link href="/scan">
              <button className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-7 py-4 text-base sm:text-lg font-bold text-white shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/45 hover:-translate-y-0.5 active:scale-98 transition-all duration-300">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <Scan className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-12 duration-300" />
                <span>{isBangla ? "এখনই রোগ নির্ণয় করুন" : "Detect Disease Now"}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 duration-300" />
              </button>
            </Link>

            <Link href="/chat">
              <button className="group inline-flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/90 px-6 py-4 text-base sm:text-lg font-semibold text-slate-800 shadow-sm backdrop-blur-md hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-700 hover:-translate-y-0.5 active:scale-98 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all duration-300">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110 duration-300" />
                <span>{isBangla ? "AI কৃষি ডাক্তার চ্যাট" : "Consult AI Crop Doctor"}</span>
              </button>
            </Link>

            <Link href="/supported-crops" className="hidden sm:inline-block">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-transparent px-5 py-4 text-base font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-slate-400 dark:hover:text-emerald-300 transition-all">
                <Layers className="h-5 w-5 text-emerald-600" />
                <span>{isBangla ? "সমর্থিত ফসল ও রোগ" : "Supported Crops"}</span>
              </button>
            </Link>
          </div>
        </div>

        {/* 4 Feature Micro-Cards - Expansive Full Width Grid */}
        <div className="mt-16 sm:mt-20 w-full max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8">
            {/* Card 1 */}
            <div className="group relative flex items-start gap-4 p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-emerald-950/10 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 xl:h-14 xl:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shadow-xs group-hover:scale-105 transition-transform">
                <CheckCircle2 className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base xl:text-lg font-bold text-slate-900 dark:text-white">
                  {isBangla ? "সহজ বাংলা" : "Bangla Interface"}
                </h2>
                <p className="text-xs xl:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isBangla ? "সহজ ভাষায় কৃষকবান্ধব রোগ ব্যবস্থাপনা নির্দেশনা" : "Farmer-friendly Bangla guidance"}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative flex items-start gap-4 p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-emerald-950/10 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 xl:h-14 xl:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-100/80 text-teal-700 dark:bg-teal-950/80 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60 shadow-xs group-hover:scale-105 transition-transform">
                <Volume2 className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base xl:text-lg font-bold text-slate-900 dark:text-white">
                  {isBangla ? "ভয়েস সহকারী" : "Voice Assistant"}
                </h2>
                <p className="text-xs xl:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isBangla ? "এক ক্লিকে বাংলায় সঠিক অডিও পরামর্শ শুনুন" : "Click to hear Bangla speech advice"}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative flex items-start gap-4 p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-emerald-950/10 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-amber-900/5 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 xl:h-14 xl:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 shadow-xs group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base xl:text-lg font-bold text-slate-900 dark:text-white">
                  {isBangla ? "সেফটি গার্ড" : "Low Match Alert"}
                </h2>
                <p className="text-xs xl:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isBangla ? "কম কনফিডেন্স হলে সতর্কবার্তা ও বিশেষজ্ঞ পরামর্শ" : "Low-confidence safety alert system"}
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative flex items-start gap-4 p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-emerald-950/10 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 xl:h-14 xl:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base xl:text-lg font-bold text-slate-900 dark:text-white">
                  {isBangla ? "যাচাইকৃত তথ্য" : "Verified Advice"}
                </h2>
                <p className="text-xs xl:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isBangla ? "BARI ও AIS কৃষি নির্দেশিকা অনুযায়ী অনুমোদিত" : "BARI & AIS agronomy standards"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
