import React from "react";
import { ShieldCheck, Award, Zap, TrendingDown, Users } from "lucide-react";

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: "98.2%",
      label: "Diagnostic Accuracy",
      desc: "Validated on 500k+ university pathology images",
      icon: Award,
    },
    {
      value: "200+",
      label: "Crop Diseases & Pests",
      desc: "Solanaceae, cereals, fruit trees, and vegetables",
      icon: ShieldCheck,
    },
    {
      value: "< 3.0s",
      label: "Inference Latency",
      desc: "Instant real-time neural vision classification",
      icon: Zap,
    },
    {
      value: "35%",
      label: "Input Cost Reduction",
      desc: "Targeted sprays replace wasteful blanket broadcasting",
      icon: TrendingDown,
    },
  ];

  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-agri-950/40 via-slate-900 to-agri-950/40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-agri-500/20 text-agri-400 mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-slate-200">{stat.label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
