"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

export const ScanningAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Preprocessing optical leaf pixels & chlorophyll ratio...",
    "Extracting cellular necrosis & lesion morphology...",
    "Querying 200+ pathogen profiles in plant pathology model...",
    "Synthesizing customized organic & chemical treatment plan...",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 400);
    const timer2 = setTimeout(() => setCurrentStep(2), 900);
    const timer3 = setTimeout(() => setCurrentStep(3), 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-3xl bg-slate-950/80 backdrop-blur-md p-6 text-white overflow-hidden">
      {/* Laser Scanning Line */}
      <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-scan-laser z-20 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="relative z-30 max-w-md w-full text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-500/20">
          <Sparkles className="h-7 w-7 animate-pulse" />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            KrishiDrishti AI Diagnostic Engine
          </h3>
          <p className="text-xs text-emerald-300 font-mono mt-1">
            ConvNeXt-Tiny &bull; 98% Pathology Benchmark Active
          </p>
        </div>

        {/* Dynamic Step Status */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 text-left space-y-2.5 shadow-2xl">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                  isDone
                    ? "text-emerald-400 font-medium"
                    : isCurrent
                    ? "text-white font-semibold"
                    : "text-slate-500"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-emerald-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span className="line-clamp-1">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
