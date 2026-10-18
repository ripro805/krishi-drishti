import React from "react";
import Link from "next/link";
import { FEATURES_DATA } from "@/data/featuresData";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import {
  Scan,
  Bot,
  Calculator,
  BookOpen,
  BarChart3,
  CloudRain,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function FeaturesPage() {
  const iconMap: Record<string, any> = {
    Scan,
    Bot,
    Calculator,
    BookOpen,
    BarChart3,
    CloudRain,
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <Badge variant="success" size="md">
          <ShieldCheck className="h-3.5 w-3.5" />
          Enterprise Agricultural Suite
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          State-of-the-Art Precision Farming Features
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Explore the modular technology stack powering KrishiDrishti — from real-time neural vision pathology to agronomist chatbots and nitrogen optimization.
        </p>
      </div>

      <div className="space-y-12">
        {FEATURES_DATA.map((feat, idx) => {
          const Icon = iconMap[feat.icon] || Scan;
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={feat.id}
              className={`flex flex-col lg:flex-row items-center gap-10 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-500 to-agri-600 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline">{feat.badge}</Badge>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {feat.title}
                </h2>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {feat.description}
                </p>

                <div className="space-y-2 pt-2">
                  {feat.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href={
                      feat.id === "feat-ai-scanner"
                        ? "/scan"
                        : feat.id === "feat-crop-doctor"
                        ? "/crop-doctor"
                        : feat.id === "feat-dosage-calc"
                        ? "/calculator"
                        : feat.id === "feat-pathology-library"
                        ? "/library"
                        : "/history"
                    }
                  >
                    <Button size="md">
                      <span>Explore {feat.title}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Feature Preview Card */}
              <div className="flex-1 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-6 border border-slate-200 dark:border-slate-700 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="h-16 w-16 rounded-3xl bg-agri-100 dark:bg-agri-950 flex items-center justify-center text-agri-600 dark:text-agri-400 mb-4 shadow-inner">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                    {feat.stats}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                    Performance Benchmark
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
