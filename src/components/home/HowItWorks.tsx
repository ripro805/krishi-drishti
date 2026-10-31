"use client";

import React from "react";
import { Camera, Cpu, FileCheck2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const HowItWorks: React.FC = () => {
  const { isBangla } = useLanguage();

  const steps = [
    {
      step: "01",
      title: isBangla ? "পাতার ছবি তুলুন বা আপলোড করুন" : "Capture or Upload Leaf",
      description: isBangla
        ? "ফোনের ক্যামেরা দিয়ে আক্রান্ত বা বিবর্ণ পাতার ছবি তুলুন অথবা আপনার ডিভাইস থেকে ইমেজ ফাইল আপলোড করুন।"
        : "Take a clear photo of an infected or discolored leaf using your phone camera or upload an image file from your device.",
      icon: Camera,
      tag: isBangla ? "১০ সেকেন্ড" : "10 Seconds",
    },
    {
      step: "02",
      title: isBangla ? "ডিপ ভিশন এআই বিশ্লেষণ" : "Deep Vision AI Analysis",
      description: isBangla
        ? "আমাদের উন্নত কনভোলিউশনাল নিউরাল নেটওয়ার্ক ৩ সেকেন্ডের মধ্যে পাতার ক্ষত ও নেক্রোটিক লক্ষণ বিশ্লেষণ করে।"
        : "Our convolutional neural network extracts chlorotic halos, necrotic spot patterns, and vein morphology in under 3 seconds.",
      icon: Cpu,
      tag: isBangla ? "রিয়েল-টাইম এআই" : "Real-time AI",
    },
    {
      step: "03",
      title: isBangla ? "সঠিক চিকিৎসা প্রেসক্রিপশন পান" : "Receive Targeted Prescription",
      description: isBangla
        ? "তাত্ক্ষণিক প্যাথোজেনের নাম, ক্ষতির মাত্রা এবং ধাপে ধাপে কার্যকর জৈব ও রাসায়নিক প্রতিকার পরামর্শ জেনে নিন।"
        : "Get instant pathogen classification, severity rating, and step-by-step biological and chemical treatment recommendations.",
      icon: FileCheck2,
      tag: isBangla ? "কার্যকর সমাধান" : "Actionable",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-agri-600 dark:text-agri-400">
            {isBangla ? "সহজ ৩-ধাপের প্রক্রিয়া" : "Simple 3-Step Workflow"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? "কৃষি দৃষ্টি এআই কীভাবে কাজ করে" : "How AI Crop Disease Detection Works"}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {isBangla
              ? "ল্যাবরেটরি বা কোনো জটিল যন্ত্রপাতি ছাড়াই আপনার হাতের মুঠোয় তাত্ক্ষণিক রোগ নির্ণয় ও সমাধান।"
              : "No lab equipment or specialized agronomic training required. Instant clinical guidance in the palm of your hand."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col rounded-3xl border border-slate-200 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-600 to-agri-500 text-white shadow-md shadow-agri-600/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-300 dark:text-slate-700">
                    {item.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="rounded-md bg-agri-100 text-agri-800 dark:bg-agri-950 dark:text-agri-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
