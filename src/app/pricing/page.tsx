import React from "react";
import Link from "next/link";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Check, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Farmer Starter",
      price: "$0",
      period: "forever free",
      desc: "Ideal for smallholders and family farms seeking instant crop disease diagnosis.",
      highlight: false,
      badge: "Community Access",
      features: [
        "Unlimited AI leaf disease scans",
        "98% laboratory benchmark precision",
        "200+ crop disease library access",
        "Basic organic bio-control recipes",
        "Mobile browser camera support",
        "Local device scan history",
      ],
      cta: "Start Free Scanning",
      href: "/scan",
    },
    {
      name: "Agri Professional",
      price: "$19",
      period: "per farm / month",
      desc: "Designed for commercial growers, agronomists, and greenhouse managers.",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Everything in Farmer Starter",
        "Downloadable PDF Pathology Dossiers",
        "24/7 Crop Doctor AI Agronomist Chatbot",
        "Precision Urea & N-P-K Dosage Calculator",
        "High-priority GPU inference queue",
        "Multi-plot field outbreak tracking",
        "Pre-Harvest Interval (PHI) compliance alerts",
      ],
      cta: "Upgrade to Pro",
      href: "/scan",
    },
    {
      name: "Enterprise & Co-op",
      price: "$79",
      period: "per organization / month",
      desc: "For agricultural cooperatives, fertilizer distributors, and research institutions.",
      highlight: false,
      badge: "Commercial Scale",
      features: [
        "Everything in Agri Professional",
        "Multi-tenant farm & grower management",
        "REST API & Webhook integration",
        "Custom drone aerial imagery analysis",
        "Dedicated agronomist consultation SLA",
        "Custom local crop dataset fine-tuning",
        "Export audit logs for organic certifiers",
      ],
      cta: "Contact Enterprise Team",
      href: "/crop-doctor?prompt=I am interested in Enterprise co-op deployment",
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <Badge variant="success" size="md">
          <Sparkles className="h-3.5 w-3.5" />
          Transparent Agricultural Plans
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Simple, Predictable Pricing for Every Farm
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          Start identifying diseases for free. Upgrade whenever you need advanced PDF reporting, agronomist chatbots, and multi-tenant farm tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
              p.highlight
                ? "border-2 border-agri-500 bg-white shadow-2xl ring-4 ring-agri-500/10 dark:bg-slate-900 lg:-translate-y-2"
                : "border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-agri-600 to-emerald-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                  {p.badge}
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {p.name}
                </h3>
                {!p.highlight && (
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                    {p.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                {p.desc}
              </p>

              <div className="mt-6 mb-6 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {p.price}
                </span>
                <span className="text-xs text-slate-500">/{p.period}</span>
              </div>

              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Included Capabilities:
                </p>
                {p.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link href={p.href} className="w-full block">
                <Button
                  variant={p.highlight ? "primary" : "outline"}
                  size="md"
                  className="w-full justify-center text-sm font-bold"
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
