import React from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Scan, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-agri-900 via-emerald-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-agri-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-agri-500/30 bg-agri-500/10 px-4 py-1.5 text-xs font-semibold text-agri-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          <span>Join Thousands of Farmers Protecting Their Harvest</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Detect Crop Diseases with{" "}
          <span className="text-agri-400">98% Accuracy?</span>
        </h2>

        <p className="text-sm sm:text-base text-agri-100/80 max-w-2xl mx-auto leading-relaxed">
          Upload a leaf image now or try our Crop Doctor AI assistant to get instant diagnoses, organic bio-remedies, and precision fertilizer schedules.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/scan">
            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100 shadow-xl font-bold">
              <Scan className="h-5 w-5 mr-1 text-agri-600" />
              Start Free AI Leaf Scan
              <ArrowRight className="h-4 w-4 ml-1 text-slate-600" />
            </Button>
          </Link>

          <Link href="/crop-doctor">
            <Button
              variant="outline"
              size="lg"
              className="border-agri-400/40 text-white hover:bg-agri-900/60 bg-transparent font-semibold"
            >
              Consult Crop Doctor AI
            </Button>
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-agri-200/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-agri-400" />
            Zero Setup or Hardware Required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-agri-400" />
            Mobile & Tablet Optimized
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-agri-400" />
            Dual Organic & Conventional Guidance
          </span>
        </div>
      </div>
    </section>
  );
};
