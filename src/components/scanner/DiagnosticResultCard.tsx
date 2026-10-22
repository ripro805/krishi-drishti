"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScanResult } from "@/types/scanner";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { TreatmentPlanTabs } from "./TreatmentPlanTabs";
import { PDFReportModal } from "./PDFReportModal";
import { BanglaVoiceAssistant } from "./BanglaVoiceAssistant";
import { LowConfidenceWarning } from "./LowConfidenceWarning";
import { PredictionFeedbackCard } from "./PredictionFeedbackCard";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Bot,
  Activity,
  Droplets,
  BookmarkCheck,
  Thermometer,
  Eye,
  Info,
  ShieldCheck,
  Sprout,
  Bug,
  Wind,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { saveScanToHistory } from "@/lib/storage";

export interface DiagnosticResultCardProps {
  scanResult: ScanResult;
  onSaveToHistory?: (result: ScanResult) => void;
  onRetake?: () => void;
}

export const DiagnosticResultCard: React.FC<DiagnosticResultCardProps> = ({
  scanResult,
  onSaveToHistory,
  onRetake,
}) => {
  const { isBangla } = useLanguage();
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { diagnosis } = scanResult;
  const isHealthy = diagnosis.severity === "Healthy";
  const isLowConfidence = scanResult.isLowConfidence || diagnosis.confidence < 75;

  const handleSave = () => {
    saveScanToHistory(scanResult);
    if (onSaveToHistory) {
      onSaveToHistory(scanResult);
    }
    setIsSaved(true);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* 1. Low Confidence Warning Banner (Feature 8) */}
      {isLowConfidence && (
        <LowConfidenceWarning
          confidence={diagnosis.confidence}
          onRetake={onRetake}
        />
      )}

      {/* 2. Bangla Voice Assistant (Feature 1.4) */}
      <BanglaVoiceAssistant
        disease={diagnosis}
        cropName={scanResult.cropDetected}
        confidence={diagnosis.confidence}
      />

      {/* 3. Primary Pathology Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <Badge
                variant={
                  isHealthy
                    ? "success"
                    : diagnosis.severity === "Severe"
                    ? "danger"
                    : isLowConfidence
                    ? "warning"
                    : "warning"
                }
                size="md"
              >
                {diagnosis.severity === "Healthy" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5" />
                )}
                {isBangla
                  ? diagnosis.severity === "Healthy"
                    ? "সুস্থ ফসল"
                    : `${diagnosis.severity} তীব্রতা`
                  : `${diagnosis.severity} Severity`}
              </Badge>

              <Badge variant="outline" size="md">
                {isBangla ? `প্যাথোজেন: ${diagnosis.pathogenType}` : `Pathogen: ${diagnosis.pathogenType}`}
              </Badge>

              <Badge variant="info" size="md">
                {isBangla
                  ? `ফসল: ${diagnosis.banglaCrop || scanResult.cropDetected}`
                  : `Crop: ${scanResult.cropDetected}`}
              </Badge>

              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {scanResult.scanId}
              </span>
            </div>

            {/* Disease Names: Bangla & English (Feature 1.2) */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {diagnosis.banglaName || diagnosis.commonName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                English: {diagnosis.commonName}
              </span>
              <span>•</span>
              <span className="italic font-mono text-xs">
                Scientific: {diagnosis.scientificName}
              </span>
            </div>
          </div>

          {/* Confidence Meter Badge */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-inner ${
                isLowConfidence
                  ? "bg-amber-100 dark:bg-amber-950/80 border-amber-500 text-amber-900 dark:text-amber-200"
                  : "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200"
              }`}
            >
              <span className="text-sm font-extrabold">{diagnosis.confidence.toFixed(0)}%</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                {isBangla ? "শনাক্তকরণের নিশ্চয়তা" : "Diagnostic Confidence"}
              </p>
              <p
                className={`text-sm font-semibold ${
                  isLowConfidence
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-emerald-700 dark:text-emerald-300"
                }`}
              >
                {isLowConfidence ? "অনিশ্চিত (Low Match)" : "উচ্চ সামঞ্জস্য (High Match)"}
              </p>
              <p className="text-[11px] text-slate-400">
                {isBangla ? "তথ্যসূত্র: BARI / PlantVillage" : "Reference: BARI / PlantVillage"}
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Overview Paragraph: Bangla & English */}
        <div className="mt-6 rounded-2xl bg-slate-50/80 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
            {diagnosis.banglaSummary || diagnosis.summary}
          </p>
          {diagnosis.banglaCropInfo && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-2 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-agri-600 flex-shrink-0" />
              <span>{diagnosis.banglaCropInfo}</span>
            </p>
          )}
        </div>

        {/* Authentic Clinical & Crop Parameters Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 1. Identified Crop */}
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Sprout className="h-4 w-4 text-emerald-600" />
              <span>{isBangla ? "শনাক্তকৃত ফসল" : "Identified Crop"}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {isBangla ? scanResult.banglaCropDetected : scanResult.cropDetected}
            </p>
            <p className="text-[11px] text-slate-400">{isBangla ? "স্বয়ংক্রিয় এআই" : "AI Auto-detected"}</p>
          </div>

          {/* 2. Pathogen Type */}
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Bug className="h-4 w-4 text-amber-500" />
              <span>{isBangla ? "জীবাণুর ধরন" : "Pathogen Type"}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {diagnosis.pathogenType === "Fungal"
                ? (isBangla ? "ছত্রাকজনিত" : "Fungal")
                : diagnosis.pathogenType === "Bacterial"
                ? (isBangla ? "ব্যাকটেরিয়াজনিত" : "Bacterial")
                : diagnosis.pathogenType === "Viral"
                ? (isBangla ? "ভাইরাসজনিত" : "Viral")
                : diagnosis.pathogenType === "None"
                ? (isBangla ? "জীবাণুমুক্ত" : "None")
                : diagnosis.pathogenType}
            </p>
            <p className="text-[11px] text-slate-400">{isBangla ? "প্যাথলজি বিভাগ" : "Etiology group"}</p>
          </div>

          {/* 3. Severity Level */}
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Activity className="h-4 w-4 text-rose-500" />
              <span>{isBangla ? "আক্রমণের তীব্রতা" : "Clinical Severity"}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {diagnosis.severity === "Healthy"
                ? (isBangla ? "সুস্থ ফসল" : "Healthy")
                : diagnosis.severity === "Severe"
                ? (isBangla ? "তীব্র আক্রমণ" : "Severe")
                : diagnosis.severity === "Moderate"
                ? (isBangla ? "মাঝারি আক্রমণ" : "Moderate")
                : (isBangla ? "হালকা আক্রমণ" : "Mild")}
            </p>
            <p className="text-[11px] text-slate-400">{isBangla ? "স্ক্রিনিং পর্যায়" : "Assessment"}</p>
          </div>

          {/* 4. Transmission Risk */}
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Wind className="h-4 w-4 text-blue-500" />
              <span>{isBangla ? "সংক্রমণ ঝুঁকি" : "Transmission Risk"}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {diagnosis.transmissionRisk === "High"
                ? (isBangla ? "উচ্চ ঝুঁকি" : "High")
                : diagnosis.transmissionRisk === "Moderate"
                ? (isBangla ? "মাঝারি ঝুঁকি" : "Moderate")
                : (isBangla ? "কম ঝুঁকি" : "Low")}
            </p>
            <p className="text-[11px] text-slate-400">{isBangla ? "বাতাস / সেচের পানি" : "Airborne / Splash"}</p>
          </div>
        </div>

        {/* Detailed Disease Breakdown Grid (Bangla & English) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Symptoms */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-agri-500" />
              {isBangla ? "রোগের সাধারণ লক্ষণসমূহ" : "Observable Symptoms"}
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {(diagnosis.banglaSymptoms || diagnosis.symptoms).map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-agri-600 font-bold">&bull;</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {isBangla ? "রোগের সম্ভাব্য কারণ ও অনুকূল পরিবেশ" : "Pathogen Causes & Climate"}
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {(diagnosis.banglaCauses || diagnosis.favorableConditions).map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">&bull;</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Affected Parts */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {isBangla ? "গাছের কোন অংশে আক্রমণ দেখা যায়" : "Affected Plant Parts"}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(diagnosis.banglaAffectedParts || diagnosis.affectedParts).map((part, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                >
                  {part}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              {isBangla
                ? "গাছের এই অংশগুলো নিয়মিত পর্যবেক্ষণ করে প্রাথমিক অবস্থায় রোগ নিয়ন্ত্রণ করুন।"
                : "Regularly scout these zones to arrest early stage development."}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Treatment Plan Section Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {isBangla
            ? "ব্যবস্থাপনা ও রোগ প্রতিরোধের সমন্বিত নির্দেশনা (Treatment & Recovery)"
            : "Integrated Treatment & Recovery Protocol"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          {isBangla
            ? "নিচে বাংলা পরামর্শ, জৈব নিয়ন্ত্রণ এবং প্রতিরোধমূলক নির্দেশিকাগুলো নির্বাচন করে পড়ুন:"
            : "Select treatment categories below to review organic bio-controls, chemical fungicides, and priority actions:"}
        </p>

        <TreatmentPlanTabs
          treatmentPlan={diagnosis.treatmentPlan}
          banglaTreatment={diagnosis.banglaTreatment}
        />
      </div>

      {/* 5. User Feedback System Widget (Feature 12) */}
      <PredictionFeedbackCard
        scanId={scanResult.scanId}
        crop={scanResult.cropDetected}
        disease={diagnosis.commonName}
        banglaDisease={diagnosis.banglaName}
        confidence={diagnosis.confidence}
      />

      {/* 6. Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 text-white shadow-xl">
        <div className="flex items-center flex-wrap gap-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setShowPdfModal(true)}
            className="shadow-md"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            {isBangla ? "পিডিএফ রিপোর্ট ডাউনলোড (PDF Dossier)" : "Generate PDF Pathology Dossier"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSaved}
            className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            <BookmarkCheck className="h-4 w-4 mr-1.5 text-emerald-400" />
            {isSaved
              ? isBangla
                ? "হিস্ট্রিতে সংরক্ষিত হয়েছে"
                : "Saved to Field History"
              : isBangla
              ? "ফলাফল সংরক্ষণ করুন"
              : "Save Scan"}
          </Button>
        </div>

        <Link
          href={`/crop-doctor?prompt=${encodeURIComponent(
            `আমার ফসলে ${diagnosis.banglaName || diagnosis.commonName} শনাক্ত হয়েছে। এই রোগের প্রতিকারে সহজ বাংলায় আরও কিছু পরামর্শ দিন।`
          )}`}
        >
          <Button
            type="button"
            variant="soft"
            size="sm"
            className="bg-agri-950/80 text-agri-300 border-agri-800 hover:bg-agri-900"
          >
            <Bot className="h-4 w-4 mr-1.5" />
            {isBangla ? "বাংলা ক্রপ ডক্টরের সাথে কথা বলুন" : "Ask Crop Doctor AI About This"}
          </Button>
        </Link>
      </div>

      {/* PDF Report Modal */}
      {showPdfModal && (
        <PDFReportModal
          isOpen={showPdfModal}
          onClose={() => setShowPdfModal(false)}
          scanResult={scanResult}
        />
      )}
    </div>
  );
};
