import React from "react";
import Link from "next/link";
import { FEATURES_DATA } from "@/data/featuresData";
import { Badge } from "@/components/common/Badge";
import {
  Scan,
  Bot,
  Calculator,
  BookOpen,
  BarChart3,
  CloudRain,
  ArrowRight,
  Check,
} from "lucide-react";

export const FeaturesGrid: React.FC = () => {
  const iconMap: Record<string, any> = {
    Scan,
    Bot,
    Calculator,
    BookOpen,
    BarChart3,
    CloudRain,
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="success" size="md">
            Complete Agricultural Intelligence Suite
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need for Smart Crop Protection
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            From optical leaf diagnosis to nitrogen optimization and agronomist chatbot support,
            our platform equips farmers and consultants with professional-grade diagnostic technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feat) => {
            const Icon = iconMap[feat.icon] || Scan;
            return (
              <div
                key={feat.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-agri-900/5 hover:-translate-y-1.5 hover:border-agri-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-agri-600"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-50 to-agri-100 text-agri-700 dark:from-agri-950 dark:to-agri-900 dark:text-agri-400 border border-agri-200 dark:border-agri-800 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {feat.stats}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mb-5">
                    {feat.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {feat.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="h-3.5 w-3.5 text-agri-600 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400 dark:hover:text-agri-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Launch Feature</span>
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
