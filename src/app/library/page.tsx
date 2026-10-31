"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DISEASES_DATABASE } from "@/data/diseasesDatabase";
import { DiseaseInfo, PathogenType, SeverityLevel } from "@/types/disease";
import { Badge } from "@/components/common/Badge";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { TreatmentPlanTabs } from "@/components/scanner/TreatmentPlanTabs";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpen,
  Search,
  Filter,
  Scan,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function DiseaseLibraryPage() {
  const { isBangla } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [activeModalDisease, setActiveModalDisease] = useState<DiseaseInfo | null>(null);

  const crops = ["All", ...Array.from(new Set(DISEASES_DATABASE.map((d) => d.crop))).sort()];
  const pathogenTypes = ["All", "Fungal", "Bacterial", "Viral", "None"];

  const filteredDiseases = DISEASES_DATABASE.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      d.commonName.toLowerCase().includes(q) ||
      (d.banglaName && d.banglaName.toLowerCase().includes(q)) ||
      d.scientificName.toLowerCase().includes(q) ||
      d.crop.toLowerCase().includes(q) ||
      (d.banglaCrop && d.banglaCrop.toLowerCase().includes(q)) ||
      (d.summary && d.summary.toLowerCase().includes(q)) ||
      (d.banglaSummary && d.banglaSummary.toLowerCase().includes(q));

    const matchesCrop = selectedCrop === "All" || d.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesType = selectedType === "All" || d.pathogenType === selectedType;

    return matchesSearch && matchesCrop && matchesType;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <Badge variant="success" size="md">
          <BookOpen className="h-3.5 w-3.5" />
          {isBangla ? "কৃষি উদ্ভিদ রোগতত্ত্ব সংগ্রহশালা" : "Agricultural Plant Pathology Archive"}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isBangla ? "উদ্ভিদের রোগ ও প্যাথোজেন এনসাইক্লোপিডিয়া" : "Plant Disease & Pathogen Encyclopedia"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {isBangla
            ? "২০০+ ফসলের রোগের বৈজ্ঞানিক জীবনচক্র, লক্ষণ ও আধুনিক প্রতিকার নির্দেশিকা খুঁজুন।"
            : "Browse verified biological profiles, microscopic infection symptoms, and treatment guidelines for 200+ crop pathogens."}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isBangla
                ? "রোগের নাম, প্যাথোজেন (যেমন Alternaria, ব্লাইট) বা ফসল দিয়ে খুঁজুন..."
                : "Search by disease name, pathogen (e.g. Alternaria, Phytophthora), or crop..."
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Crop filter chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              {isBangla ? "ফসল:" : "Crop:"}
            </span>
            {crops.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCrop(c)}
                className={`rounded-xl px-3 py-1 text-xs font-semibold transition-colors ${
                  selectedCrop === c
                    ? "bg-agri-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {c === "All" ? (isBangla ? "সকল ফসল" : "All Crops") : c}
              </button>
            ))}
          </div>

          {/* Pathogen Type filter chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1">
              {isBangla ? "ধরন:" : "Pathogen:"}
            </span>
            {pathogenTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(t)}
                className={`rounded-xl px-3 py-1 text-xs font-semibold transition-colors ${
                  selectedType === t
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {t === "All"
                  ? isBangla
                    ? "সকল ধরন"
                    : "All Types"
                  : t === "Fungal"
                  ? isBangla
                    ? "ছত্রাকজনিত"
                    : "Fungal"
                  : t === "Bacterial"
                  ? isBangla
                    ? "ব্যাকটেরিয়াজনিত"
                    : "Bacterial"
                  : t === "Viral"
                  ? isBangla
                    ? "ভাইরাসজনিত"
                    : "Viral"
                  : isBangla
                  ? "সুস্থ"
                  : "Healthy Control"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((d) => (
          <div
            key={d.id}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:border-agri-400"
          >
            <div>
              {d.sampleImageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
                  <img
                    src={d.sampleImageUrl}
                    alt={d.commonName}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      size="sm"
                      variant={
                        d.severity === "Healthy"
                          ? "success"
                          : d.severity === "Severe"
                          ? "danger"
                          : "warning"
                      }
                      className="shadow-sm"
                    >
                      {isBangla
                        ? d.severity === "Healthy"
                          ? "সুস্থ ফসল"
                          : `${d.severity} তীব্রতা`
                        : `${d.severity} Severity`}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold text-agri-700 dark:text-agri-400">
                  {isBangla ? (d.banglaCrop || d.crop) : d.crop}
                </span>
                <span className="font-mono">{d.pathogenType}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-agri-600 transition-colors">
                {isBangla ? (d.banglaName || d.commonName) : d.commonName}
              </h3>
              <p className="text-xs italic text-slate-500 font-mono mb-3">
                {d.scientificName}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {isBangla ? (d.banglaSummary || d.summary) : (d.summary || d.banglaSummary)}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setActiveModalDisease(d)}
                className="text-xs font-bold text-agri-600 hover:text-agri-700 dark:text-agri-400 inline-flex items-center gap-1"
              >
                <span>{isBangla ? "বিস্তারিত প্যাথলজি দেখুন" : "Full Pathology Details"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>

              <Link href={`/scan?crop=${encodeURIComponent(d.crop)}`}>
                <Button variant="ghost" size="sm" className="text-xs py-1">
                  <Scan className="h-3.5 w-3.5 mr-1" />
                  {isBangla ? "স্ক্যান করুন" : "Scan This"}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <Modal
          isOpen={!!activeModalDisease}
          onClose={() => setActiveModalDisease(null)}
          title={isBangla ? (activeModalDisease.banglaName || activeModalDisease.commonName) : activeModalDisease.commonName}
          description={`Scientific Classification: ${activeModalDisease.scientificName}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">
                {isBangla ? `ফসল: ${activeModalDisease.banglaCrop || activeModalDisease.crop}` : `Crop: ${activeModalDisease.crop}`}
              </Badge>
              <Badge variant="outline">
                {isBangla ? `জীবাণু: ${activeModalDisease.pathogenType}` : `Pathogen: ${activeModalDisease.pathogenType}`}
              </Badge>
              <Badge variant="danger">
                {isBangla ? `তীব্রতা: ${activeModalDisease.severity}` : `Severity: ${activeModalDisease.severity}`}
              </Badge>
              <Badge variant="info">
                {isBangla ? `ছড়ানোর ঝুঁকি: ${activeModalDisease.transmissionRisk}` : `Transmission: ${activeModalDisease.transmissionRisk}`}
              </Badge>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {isBangla ? (activeModalDisease.banglaSummary || activeModalDisease.summary) : (activeModalDisease.summary || activeModalDisease.banglaSummary)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  {isBangla ? "দৃশ্যমান লক্ষণসমূহ:" : "Observable Symptoms:"}
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {(isBangla && activeModalDisease.banglaSymptoms ? activeModalDisease.banglaSymptoms : activeModalDisease.symptoms).map((s, i) => (
                    <li key={i}>&bull; {s}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  {isBangla ? "অনুকূল পরিবেশ ও কারণ:" : "Favorable Conditions:"}
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {(isBangla && activeModalDisease.banglaCauses ? activeModalDisease.banglaCauses : activeModalDisease.favorableConditions).map((c, i) => (
                    <li key={i}>&bull; {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                {isBangla ? "চিকিৎসা ও প্রতিকার নির্দেশিকা:" : "Treatment & Remediation Guidelines:"}
              </h4>
              <TreatmentPlanTabs
                treatmentPlan={activeModalDisease.treatmentPlan}
                banglaTreatment={activeModalDisease.banglaTreatment}
              />
            </div>

            <div className="flex justify-end pt-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveModalDisease(null)}
              >
                {isBangla ? "ডসিয়ার বন্ধ করুন" : "Close Dossier"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
