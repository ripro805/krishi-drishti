"use client";

import React from "react";
import { SAMPLE_LEAVES, SampleLeaf } from "@/data/sampleLeaves";
import { Badge } from "@/components/common/Badge";
import { Sparkles, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface SampleLeafSelectorProps {
  onSelectSample: (sample: SampleLeaf) => void;
  selectedSampleId: string | null;
  disabled?: boolean;
}

export const SampleLeafSelector: React.FC<SampleLeafSelectorProps> = ({
  onSelectSample,
  selectedSampleId,
  disabled = false,
}) => {
  const { isBangla } = useLanguage();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-agri-600" />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {isBangla ? "বা মাঠের নমুনা পাতা নির্বাচন করে পরীক্ষা করুন" : "Or Test Instantly with Pre-Loaded Field Samples"}
          </h4>
        </div>
        <span className="text-xs text-agri-600 font-semibold bg-agri-50 dark:bg-agri-950/60 px-2 py-0.5 rounded-lg border border-agri-200 dark:border-agri-800">
          {isBangla ? "১-ক্লিকে পরীক্ষা" : "1-Click Test"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {SAMPLE_LEAVES.map((leaf) => {
          const isSelected = selectedSampleId === leaf.id;
          return (
            <button
              key={leaf.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectSample(leaf)}
              className={`group relative flex flex-col text-left overflow-hidden rounded-2xl border p-2 transition-all duration-200 ${
                isSelected
                  ? "border-agri-500 bg-agri-50/80 shadow-md ring-2 ring-agri-500/30 dark:bg-agri-950/40"
                  : leaf.isLowConfidenceDemo
                  ? "border-amber-300 bg-amber-50/50 hover:border-amber-400 dark:border-amber-900/60 dark:bg-amber-950/20"
                  : "border-slate-200 bg-white hover:border-agri-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <img
                  src={leaf.imageUrl}
                  alt={leaf.diseaseName}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-1.5 left-1.5">
                  <Badge
                    size="sm"
                    variant={
                      leaf.isLowConfidenceDemo
                        ? "warning"
                        : leaf.expectedSeverity === "Healthy"
                        ? "success"
                        : leaf.expectedSeverity === "Severe"
                        ? "danger"
                        : "warning"
                    }
                    className="text-[10px] px-1.5 py-0 shadow-sm"
                  >
                    {leaf.isLowConfidenceDemo
                      ? "কম কনফিডেন্স"
                      : leaf.expectedSeverity}
                  </Badge>
                </div>
              </div>

              <div className="mt-2 flex-1">
                <p className="text-[11px] font-semibold text-agri-700 dark:text-agri-400">
                  {leaf.banglaCrop || leaf.crop}
                </p>
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {leaf.banglaDiseaseName || leaf.diseaseName.split("(")[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
