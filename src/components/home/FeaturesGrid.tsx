"use client";

import React from "react";
import Link from "next/link";
import { FEATURES_DATA } from "@/data/featuresData";
import {
  Scan,
  Bot,
  Calculator,
  BookOpen,
  BarChart3,
  CloudRain,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const FeaturesGrid: React.FC = () => {
  const { isBangla } = useLanguage();

  const iconMap: Record<string, any> = {
    Scan,
    Bot,
    Calculator,
    BookOpen,
    BarChart3,
    CloudRain,
  };

  const banglaFeatures: Record<string, { title: string; desc: string; action: string }> = {
    "feat-ai-scanner": {
      title: "এআই উদ্ভিদের পাতা স্ক্যানার",
      desc: "মুহূর্তেই ৯৮.২% নির্ভুলতায় পাতার ছবি দেখে রোগ শনাক্তকরণ এবং BARI নির্দেশিত সমাধান।",
      action: "স্ক্যানার চালু করুন",
    },
    "feat-crop-doctor": {
      title: "কৃষি ডাক্তার এআই চ্যাটবট",
      desc: "বাংলায় মুখে কথা বলে বা লিখে ২৪/৭ সার্বক্ষণিক বিশেষজ্ঞ কৃষি ও ফসল ব্যবস্থাপনা পরামর্শ পান।",
      action: "ডাক্তারের সাথে চ্যাট করুন",
    },
    "feat-dosage-calc": {
      title: "সার ও কীটনাশক ক্যালকুলেটর",
      desc: "জমি ও ফসলের মাপ অনুযায়ী ইউরিয়া, ডিএপি ও এমওপি সারের সুনির্দিষ্ট ডোজ হিসাব করুন।",
      action: "ক্যালকুলেটরে যান",
    },
    "feat-pathology-library": {
      title: "রোগ ও বালাই কোষাগার",
      desc: "টমেটো, আলু, ধান, মরিচসহ সকল প্রধান ফসলের লক্ষণ ও সমন্বিত বালাইদমন নির্দেশিকা।",
      action: "কোষাগার দেখুন",
    },
    "feat-growth-analytics": {
      title: "স্ক্যান ও ফলন বিশ্লেষণ",
      desc: "আপনার পূর্ববর্তী স্ক্যান হিস্ট্রি এবং ফসলের স্বাস্থ্যের অগ্রগতি পর্যবেক্ষণ করুন।",
      action: "ইতিহাস দেখুন",
    },
    "feat-weather-advisory": {
      title: "আবহাওয়া ও কৃষি সতর্কতা",
      desc: "আবহাওয়ার পূর্বাভাস অনুযায়ী রোগবালাইয়ের ঝুঁকি ও স্প্রে করার সঠিক সময় জানুন।",
      action: "পরামর্শ দেখুন",
    },
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 shadow-xs">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>{isBangla ? "স্মার্ট কৃষি সুরক্ষা স্যুট" : "Complete Agricultural Intelligence Suite"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? "স্মার্ট ফসল সুরক্ষায় আপনার যা যা প্রয়োজন" : "Everything You Need for Smart Crop Protection"}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {isBangla
              ? "অপটিক্যাল রোগ স্ক্রিনিং থেকে শুরু করে বাংলা এআই চ্যাটবট ও সারের সঠিক মাত্রা—সবই এক প্ল্যাটফর্মে।"
              : "From optical leaf diagnosis to fertilizer optimization and agronomist chatbot support, our platform equips farmers with professional-grade diagnostic technology."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
          {FEATURES_DATA.map((feat) => {
            const Icon = iconMap[feat.icon] || Scan;
            const bInfo = banglaFeatures[feat.id];
            const title = isBangla && bInfo ? bInfo.title : feat.title;
            const description = isBangla && bInfo ? bInfo.desc : feat.description;
            const actionText = isBangla && bInfo ? bInfo.action : "Launch Feature";

            const href =
              feat.id === "feat-ai-scanner"
                ? "/scan"
                : feat.id === "feat-crop-doctor"
                ? "/chat"
                : feat.id === "feat-dosage-calc"
                ? "/calculator"
                : feat.id === "feat-pathology-library"
                ? "/library"
                : "/history";

            return (
              <div
                key={feat.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-600 backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-700 dark:from-emerald-950 dark:to-emerald-900 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200/70 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
                      {feat.stats}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mb-5">
                    {description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {feat.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>{actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
