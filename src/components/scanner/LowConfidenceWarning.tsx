"use client";

import React from "react";
import { AlertTriangle, Camera, PhoneCall, HelpCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/common/Button";
import Link from "next/link";

interface LowConfidenceWarningProps {
  confidence: number;
  onRetake?: () => void;
}

export const LowConfidenceWarning: React.FC<LowConfidenceWarningProps> = ({
  confidence,
  onRetake,
}) => {
  return (
    <div className="rounded-3xl border-2 border-amber-300 bg-amber-50/90 p-5 sm:p-7 dark:border-amber-700/70 dark:bg-amber-950/40 shadow-sm animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-amber-200/90 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-amber-950 dark:bg-amber-800 dark:text-amber-100">
              কম কনফিডেন্স সতর্কতা (Low Confidence Match)
            </span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
              নিশ্চয়তার মাত্রা: {confidence.toFixed(1)}% (প্রয়োজনীয় মান &ge; ৭৫%)
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-amber-950 dark:text-amber-100">
            AI মডেল এই ফলাফল সম্পর্কে সম্পূর্ণ নিশ্চিত হতে পারছে না
          </h3>

          <p className="text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90">
            ছবির অস্পষ্টতা, অপর্যাপ্ত আলো, দূর থেকে তোলা বা একাধিক রোগের মিশ্র লক্ষণের কারণে সঠিক রোগ শনাক্তকরণে দ্বিধা রয়েছে। ভুল ওষুধ প্রয়োগ ফসলের অপূরণীয় ক্ষতি করতে পারে।
          </p>

          {/* Action Guidelines */}
          <div className="mt-3 rounded-2xl bg-white/80 p-3.5 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              আপনার পরবর্তী জরুরি করণীয়:
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
              <li>দিনের স্বাভাবিক ভালো আলোতে আক্রান্ত পাতার একদম কাছাকাছি ফোকাস করে পুনরায় ছবি তুলুন।</li>
              <li>পাতার ওপর ছায়া পড়া বা হাত কেঁপে যাওয়া পরিহার করুন।</li>
              <li>কোনো রাসায়নিক ওষুধ বা ছত্রাকনাশক স্প্রে করার আগে অবশ্যই আক্রান্ত পাতাসহ নিকটস্থ <strong>উপজেলা কৃষি কর্মকর্তা</strong> বা <strong>উপসহকারী কৃষি কর্মকর্তার (SAAO)</strong> সরাসরি পরামর্শ নিন।</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {onRetake && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={onRetake}
                className="bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30"
              >
                <Camera className="h-4 w-4 mr-1.5" />
                নতুন স্পষ্ট ছবি তুলুন
              </Button>
            )}

            <Link href="/crop-doctor?prompt=আমার পাতার ছবিতে রোগ স্পষ্ট ধরা পড়ছে না, কম কনফিডেন্স এসেছে। এখন আমার কী করণীয়?">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-amber-400 bg-white text-amber-900 hover:bg-amber-50 dark:border-amber-700 dark:bg-slate-800 dark:text-amber-200"
              >
                <HelpCircle className="h-4 w-4 mr-1.5" />
                কৃষি সহকারীর সাথে কথা বলুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
