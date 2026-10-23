"use client";

import React from "react";
import { ShieldCheck, Award, Zap, TrendingDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const StatsSection: React.FC = () => {
  const { isBangla } = useLanguage();

  const stats = [
    {
      value: "98.2%",
      label: isBangla ? "ডায়াগনস্টিক নির্ভুলতা" : "Diagnostic Accuracy",
      desc: isBangla ? "৫ লক্ষাধিক উদ্ভিদের রোগাক্রান্ত পাতায় প্রশিক্ষিত" : "Validated on 500k+ university pathology images",
      icon: Award,
    },
    {
      value: "200+",
      label: isBangla ? "ফসলের রোগ ও বালাই" : "Crop Diseases & Pests",
      desc: isBangla ? "টমেটো, আলু, মরিচ, ধান, ভুট্টা ও সবজি পরিবার" : "Solanaceae, cereals, fruit trees, and vegetables",
      icon: ShieldCheck,
    },
    {
      value: "< 3.0s",
      label: isBangla ? "তাত্ক্ষণিক ফলাফল" : "Inference Latency",
      desc: isBangla ? "রিয়েল-টাইম নিউরাল ভিশন মডেলের দ্রুততম বিশ্লেষণ" : "Instant real-time neural vision classification",
      icon: Zap,
    },
    {
      value: "35%",
      label: isBangla ? "কীটনাশক খরচ সাশ্রয়" : "Input Cost Reduction",
      desc: isBangla ? "অপ্রয়োজনীয় বিষপ্রয়োগ রোধে সুনির্দিষ্ট প্রেসক্রিপশন" : "Targeted sprays replace wasteful blanket broadcasting",
      icon: TrendingDown,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-y border-emerald-950/40">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-radial-mesh opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-800/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-2 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-slate-100">{stat.label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
