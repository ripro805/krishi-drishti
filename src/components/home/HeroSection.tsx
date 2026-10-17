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
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-agri-100/60 via-agri-50/20 to-transparent dark:from-agri-950/20 dark:via-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-agri-300 bg-agri-50/90 px-4 py-1.5 text-xs font-semibold text-agri-800 shadow-sm backdrop-blur-sm dark:border-agri-800 dark:bg-agri-950/60 dark:text-agri-300 animate-fadeIn">
            <span className="flex h-2 w-2 rounded-full bg-agri-500 animate-pulse" />
            <span>AI-Powered Plant Pathology</span>
            <span className="text-agri-400">&bull;</span>
            <span className="text-agri-700 dark:text-agri-400 font-bold">98% Accuracy Lab Standard</span>
          </div>

          {/* Main Headline matching cropdiseasedetection.com */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Professional Crop Disease Detection with{" "}
            <span className="bg-gradient-to-r from-agri-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              98% Accuracy
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Specialized AI agricultural platform for identifying 200+ plant diseases and pests instantly.
            Get laboratory-grade optical diagnosis and tailored organic and chemical treatment plans in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link href="/scan">
              <Button size="lg" className="shadow-lg shadow-agri-600/30 text-base font-semibold">
                <Scan className="h-5 w-5 mr-1" />
                Detect Disease Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            <Link href="/library">
              <Button variant="outline" size="lg" className="text-base font-semibold">
                Explore 200+ Pathogens
              </Button>
            </Link>
          </div>

          {/* Key Metric Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-agri-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">200+ Diseases</p>
                <p className="text-xs text-slate-500">Pathogens Indexed</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-agri-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">98% Accuracy</p>
                <p className="text-xs text-slate-500">Verified Precision</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Zap className="h-5 w-5 text-agri-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">&lt; 3 Seconds</p>
                <p className="text-xs text-slate-500">Instant AI Diagnosis</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <TrendingUp className="h-5 w-5 text-agri-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Dual Protocol</p>
                <p className="text-xs text-slate-500">Organic & Agchem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
