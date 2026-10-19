"use client";

import React, { useState } from "react";
import { TreatmentPlan, BanglaTreatmentGuide } from "@/types/disease";
import { Badge } from "@/components/common/Badge";
import {
  AlertTriangle,
  Leaf,
  FlaskConical,
  ShieldCheck,
  Clock,
  Percent,
  CheckSquare,
  Square,
  HelpCircle,
  Stethoscope,
  Info,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface TreatmentPlanTabsProps {
  treatmentPlan: TreatmentPlan;
  banglaTreatment?: BanglaTreatmentGuide;
}

export const TreatmentPlanTabs: React.FC<TreatmentPlanTabsProps> = ({
  treatmentPlan,
  banglaTreatment,
}) => {
  const { isBangla } = useLanguage();
  const [activeTab, setActiveTab] = useState<"banglaGuide" | "immediate" | "organic" | "chemical" | "preventive">(
    banglaTreatment ? "banglaGuide" : "immediate"
  );
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const toggleAction = (title: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="w-full">
      {/* Prominent Mandatory Agricultural Safety Disclaimer */}
      <div className="mb-5 rounded-2xl border border-rose-300 bg-rose-50/90 p-4 dark:border-rose-900/60 dark:bg-rose-950/40 text-xs">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-extrabold text-rose-900 dark:text-rose-200">
              {isBangla
                ? "সংবিধিবদ্ধ সতর্কতা ও কীটনাশক ব্যবহারের আইনি নির্দেশিকা"
                : "Mandatory Agricultural Safety & Pesticide Dosage Notice"}
            </p>
            <p className="text-rose-800/90 dark:text-rose-300 leading-relaxed">
              {banglaTreatment?.safetyNote ||
                "রাসায়নিক বা কীটনাশকের নির্দিষ্ট বাণিজ্যিক ডোজ অনুমান করে প্রয়োগ করা আইনত দণ্ডনীয় ও ফসলের জন্য ক্ষতিকর। সর্বদা প্রস্তুতকারকের অনুমোদিত লেবেলে উল্লেখিত সঠিক মাত্রা মেনে চলুন এবং উপজেলা কৃষি কর্মকর্তা বা কৃষি সম্প্রসারণ অধিদপ্তরের (DAE) প্রেসক্রিপশন অনুযায়ী প্রয়োগ করুন।"}
            </p>
            {banglaTreatment?.verifiedSource && (
              <p className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 pt-1">
                তথ্যভান্ডার: {banglaTreatment.verifiedSource}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-2">
        {banglaTreatment && (
          <button
            type="button"
            onClick={() => setActiveTab("banglaGuide")}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === "banglaGuide"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            বাংলা নির্দেশিকা (Bangla Guide)
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab("immediate")}
          className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "immediate"
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          {isBangla ? "জরুরি পদক্ষেপ" : "Immediate Actions"} ({treatmentPlan.immediateActions.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("organic")}
          className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "organic"
              ? "border-agri-600 text-agri-700 dark:text-agri-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Leaf className="h-4 w-4" />
          {isBangla ? "জৈব বালাই ব্যবস্থাপনা" : "Organic & Bio"} ({treatmentPlan.organicTreatments.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("chemical")}
          className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "chemical"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <FlaskConical className="h-4 w-4" />
          {isBangla ? "ছত্রাকনাশক তথ্য" : "Chemical Agchem"} ({treatmentPlan.chemicalTreatments.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preventive")}
          className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "preventive"
              ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          {isBangla ? "দীর্ঘমেয়াদী প্রতিরোধ" : "Prevention"}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-5">
        {/* Full Dedicated Bangla Guidance Tab */}
        {activeTab === "banglaGuide" && banglaTreatment && (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. রোগ ব্যবস্থাপনার পরামর্শ */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-800/50">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white text-xs font-bold">১</span>
                রোগ ব্যবস্থাপনার পরামর্শ (Disease Management Advice)
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {banglaTreatment.managementAdvice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">&bull;</span>
                    <span className="leading-relaxed">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. রোগ প্রতিরোধের উপায় */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-800/50">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">২</span>
                রোগ প্রতিরোধের উপায় (Prevention Methods)
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {banglaTreatment.preventionMethods.map((prev, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-bold">&bull;</span>
                    <span className="leading-relaxed">{prev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. জমি ও ফসলের যত্নের নির্দেশনা */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-800/50">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-600 text-white text-xs font-bold">৩</span>
                জমি ও ফসলের যত্নের নির্দেশনা (Field & Crop Care)
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {banglaTreatment.fieldCareGuidance.map((care, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold">&bull;</span>
                    <span className="leading-relaxed">{care}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. কখন কৃষি কর্মকর্তা বা বিশেষজ্ঞের সাহায্য নিতে হবে */}
            <div className="rounded-2xl border border-slate-200 bg-rose-50/40 p-4 sm:p-5 dark:border-rose-950/20 dark:bg-rose-950/10">
              <h4 className="text-sm font-bold text-rose-950 dark:text-rose-200 flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-600 text-white text-xs font-bold">৪</span>
                কখন কৃষি কর্মকর্তা বা বিশেষজ্ঞের সাহায্য নিতে হবে
              </h4>
              <ul className="space-y-2 text-xs text-rose-900/90 dark:text-rose-300">
                {banglaTreatment.whenToConsultExpert.map((consult, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <HelpCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{consult}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Immediate Actions */}
        {activeTab === "immediate" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Critical containment measures to arrest active fungal mycelium or bacterial progression:
            </p>
            {treatmentPlan.immediateActions.map((action) => {
              const isChecked = !!completedActions[action.title];
              return (
                <div
                  key={action.title}
                  onClick={() => toggleAction(action.title)}
                  className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                    isChecked
                      ? "border-slate-200 bg-slate-50/60 opacity-60 dark:border-slate-800 dark:bg-slate-900/40"
                      : "border-rose-200/80 bg-rose-50/30 hover:border-rose-300 dark:border-rose-950/60 dark:bg-rose-950/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className="mt-0.5 text-slate-400 group-hover:text-agri-600 transition-colors"
                    >
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 text-agri-600" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4
                          className={`text-sm font-bold ${
                            isChecked ? "line-through text-slate-500" : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {action.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            size="sm"
                            variant={
                              action.priority === "High"
                                ? "danger"
                                : action.priority === "Medium"
                                ? "warning"
                                : "info"
                            }
                          >
                            {action.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {action.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          Timeframe: {action.timeframe}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                          <Percent className="h-3.5 w-3.5" />
                          Expected Control: {action.effectiveness}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Organic & Biological Treatments */}
        {activeTab === "organic" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Safe, biological, and zero-residue treatment recipes suitable for organic certification:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatmentPlan.organicTreatments.map((org) => (
                <div
                  key={org.name}
                  className="rounded-2xl border border-agri-200 bg-agri-50/40 p-4 dark:border-agri-900/50 dark:bg-agri-950/20 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-agri-900 dark:text-agri-200">
                      {org.name}
                    </h4>
                    <span className="rounded-md bg-agri-200/80 px-2 py-0.5 text-[10px] font-semibold text-agri-800 dark:bg-agri-800 dark:text-agri-200">
                      Bio-Safe
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Preparation: </span>
                      <span className="text-slate-600 dark:text-slate-400">{org.preparation}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Application: </span>
                      <span className="text-slate-600 dark:text-slate-400">{org.application}</span>
                    </div>
                    <div className="pt-1 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                      Standard: {org.certifications}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chemical Treatments */}
        {activeTab === "chemical" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-blue-50/80 p-3 text-xs text-blue-800 dark:bg-blue-950/40 dark:text-blue-200 border border-blue-200 dark:border-blue-900 flex items-start gap-2">
              <FlaskConical className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>
                Always wear PPE (gloves, mask, goggles). Strictly consult authorized agricultural officers before applying any chemical spray.
              </span>
            </div>

            {treatmentPlan.chemicalTreatments.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                No conventional chemical intervention required for this diagnosis.
              </p>
            ) : (
              <div className="space-y-3">
                {treatmentPlan.chemicalTreatments.map((chem) => (
                  <div
                    key={chem.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {chem.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          Active Ingredient: {chem.activeIngredient}
                        </p>
                      </div>
                      <Badge variant="outline" size="sm">
                        Standard Agchem
                      </Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Registered Guidelines: </span>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5">{chem.dosage}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Safety Interval (PHI): </span>
                        <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-amber-700 dark:text-amber-400 font-medium">
                          {chem.safetyInterval}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 rounded-lg bg-amber-50/60 p-2 text-[11px] text-amber-900 dark:bg-amber-950/30 dark:text-amber-200 border border-amber-200/60 dark:border-amber-900/40">
                      <strong>Caution & Rotation: </strong> {chem.cautions}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Preventative Agronomy */}
        {activeTab === "preventive" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Field Sanitation & Cultural Management
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {treatmentPlan.preventiveMeasures.map((measure, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            {treatmentPlan.culturalPractices.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Agronomic Water & Soil Guidelines
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {treatmentPlan.culturalPractices.map((practice, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
