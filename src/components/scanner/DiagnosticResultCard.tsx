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
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { saveScanToHistory } from "@/lib/storage";

export interface DiagnosticResultCardProps {
  scanResult: ScanResult;
  onSaveToHistory?: (result: ScanResult) => void;
  onRetake?: () => void;
  onSelectCrop?: (crop: string) => void;
}

export const DiagnosticResultCard: React.FC<DiagnosticResultCardProps> = ({
  scanResult,
  onSaveToHistory,
  onRetake,
  onSelectCrop,
}) => {
  const { isBangla } = useLanguage();
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { diagnosis } = scanResult;
  const isHealthy = diagnosis.severity === "Healthy";
  const isMismatch = scanResult.status === "crop_mismatch";
  const isRejected =
    scanResult.status === "unknown_crop" ||
    scanResult.status === "unsupported_image" ||
    scanResult.status === "invalid_image" ||
    scanResult.status === "model_error" ||
    scanResult.status === "low_confidence" ||
    diagnosis.id === "uncertain-low-confidence-sample" ||
    !scanResult.canProvideTreatment && scanResult.status !== "success";
  const isLowConfidence = scanResult.isLowConfidence || diagnosis.confidence < 35 || scanResult.status === "low_confidence";

  const handleSave = () => {
    saveScanToHistory(scanResult);
    if (onSaveToHistory) {
      onSaveToHistory(scanResult);
    }
    setIsSaved(true);
  };

  // ── A. Specialized Crop Mismatch View ──────────────────────────────
  if (isMismatch) {
    const selCrop = scanResult.mismatchDetails?.selectedCrop || scanResult.selectedCrop || "Selected Crop";
    const detCrop = scanResult.mismatchDetails?.detectedCrop || scanResult.cropDetected || "Detected Crop";
    const bnSelCrop = scanResult.mismatchDetails?.banglaSelectedCrop || scanResult.banglaSelectedCrop || selCrop;
    const bnDetCrop = scanResult.mismatchDetails?.banglaDetectedCrop || scanResult.banglaCropDetected || detCrop;

    return (
      <div className="w-full space-y-6 animate-fadeIn">
        <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/90 via-white to-amber-50/50 p-6 sm:p-8 shadow-md dark:border-rose-900/60 dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rose-200/80 dark:border-rose-900/60">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <span className="rounded-md bg-rose-100 dark:bg-rose-950 px-2.5 py-0.5 text-xs font-bold text-rose-800 dark:text-rose-300">
                  {isBangla ? "⚠️ ফসলের অমিল সনাক্তকরণ" : "⚠️ Crop Mismatch Detected"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {isBangla
                    ? `নির্বাচিত '${bnSelCrop}' কিন্তু পাতাটি '${bnDetCrop}'-এর`
                    : `Selected '${selCrop}' but Specimen resembles '${detCrop}'`}
                </h2>
              </div>
            </div>

            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {scanResult.scanId}
            </span>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                {isBangla ? "আপনি যা নির্বাচন করেছেন" : "You Selected"}
              </span>
              <p className="text-lg font-extrabold text-slate-700 dark:text-slate-300 mt-1">
                {isBangla ? bnSelCrop : selCrop}
              </p>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1">
                {isBangla ? "✗ পাতার চিত্রে এই ফসলের লক্ষণ নেই" : "✗ Image does not match this crop"}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/60 p-4 dark:border-emerald-600 dark:bg-emerald-950/40 shadow-sm">
              <span className="text-xs uppercase font-bold text-emerald-800 dark:text-emerald-300 tracking-wider">
                {isBangla ? "এআই যা সনাক্ত করেছে (প্রমাণিত)" : "AI Detected Foliar Identity"}
              </span>
              <p className="text-lg font-black text-emerald-900 dark:text-emerald-100 mt-1">
                {isBangla ? bnDetCrop : detCrop}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                {isBangla
                  ? `✓ ${scanResult.mismatchDetails?.confidence.toFixed(1) || 95}% নিশ্চয়তায় সনাক্ত`
                  : `✓ Verified with ${scanResult.mismatchDetails?.confidence.toFixed(1) || 95}% confidence`}
              </p>
            </div>
          </div>

          {/* Clinical Safety Notice */}
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-4 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed mb-6">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">
                  {isBangla ? "রাসায়নিক নিরাপত্তা নিশ্চিতকরণ:" : "Agricultural Agrochemical Safeguard:"}
                </strong>{" "}
                {isBangla
                  ? scanResult.banglaStatusMessage ||
                    `ভুল ফসলে ভুল কীটনাশক বা ছত্রাকনাশক প্রয়োগে ফসল ক্ষতিগ্রস্ত হতে পারে। তাই '${bnSelCrop}'-এর কোনো চিকিৎসা পরামর্শ প্রদর্শন করা হয়নি। অনুগ্রহ করে '${bnDetCrop}' নির্বাচন করে সঠিক রোগ নির্ণয় দেখুন।`
                  : scanResult.statusMessage ||
                    `Treatment recommendations for ${selCrop} are withheld to prevent applying inappropriate agrochemicals to your field. Please switch to ${detCrop} to review verified pathology.`}
              </div>
            </div>
          </div>

          {/* Resolution Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {onSelectCrop && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onSelectCrop(detCrop)}
                  className="shadow-md"
                >
                  <Sprout className="h-4 w-4 mr-1.5" />
                  {isBangla
                    ? `১-ক্লিকে '${bnDetCrop}' নির্বাচন করে রোগ দেখুন`
                    : `Switch to '${detCrop}' & View Diagnosis`}
                </Button>
              )}
              {onRetake && (
                <Button variant="outline" size="md" onClick={onRetake}>
                  <RotateCcw className="h-4 w-4 mr-1.5" />
                  {isBangla ? "নতুন ছবি তুলুন" : "Retake Photo"}
                </Button>
              )}
            </div>

            <span className="text-xs text-slate-500">
              {isBangla ? "কৃষি সুরক্ষা নিয়ম ৩.১ সক্রিয়" : "Validation Policy 3.1 Active"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── B. Specialized Unsupported / Unknown Specimen View ─────────────
  if (isRejected) {
    return (
      <div className="w-full space-y-6 animate-fadeIn">
        <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 via-white to-slate-100/60 p-6 sm:p-8 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700 text-white shadow-md">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <span className="rounded-md bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                  {scanResult.status === "unknown_crop"
                    ? isBangla
                      ? "অনির্ণীত ফসল / অচেনা নমুনা"
                      : "Unknown Crop Specimen"
                    : scanResult.status === "low_confidence"
                    ? isBangla
                      ? "কম কনফিডেন্স / অনির্ভরযোগ্য লক্ষণ"
                      : "Low Confidence / Inconclusive Pathology"
                    : isBangla
                    ? "অসমর্থিত অথবা অস্পষ্ট ছবি"
                    : "Unsupported or Non-Foliar Image"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {isBangla ? "রোগ নির্ণয় সম্ভব হয়নি" : "Unable to Determine Diagnosis Reliably"}
                </h2>
              </div>
            </div>

            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {scanResult.scanId}
            </span>
          </div>

          <div className="my-6 space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              {isBangla
                ? scanResult.banglaStatusMessage ||
                  "এআই মডেল এই ছবি থেকে নিশ্চিত কোনো ফসলের পাতা সনাক্ত করতে পারেনি। মডেলটি শুধুমাত্র ১৬টি নির্দিষ্ট ফসলের পাতার রোগ নির্ণয়ের জন্য অনুমোদিত।"
                : scanResult.statusMessage ||
                  "The neural vision system could not confidently identify a supported crop leaf. Please verify that the image contains a clear foliar specimen."}
            </p>

            {/* Quality Checklist */}
            <div className="rounded-2xl bg-white dark:bg-slate-800/80 p-4 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {isBangla ? "সঠিক ছবি তোলার নির্দেশিকা:" : "Best Practices for Leaf Scanning:"}
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                <li>{isBangla ? "পাতাটি ক্যামেরার মাঝামাঝি রাখুন এবং ফোকাস নিশ্চিত করুন।" : "Frame the leaf blade in the center and ensure sharp focus."}</li>
                <li>{isBangla ? "পর্যাপ্ত দিনের আলোতে ছবি তুলুন (অতিরিক্ত অন্ধকার বা ফ্ল্যাশ এড়িয়ে চলুন)।" : "Capture under natural daytime lighting (avoid dark shadows or glare)."}</li>
                <li>{isBangla ? "সমর্থিত ১৬টি ফসলের পাতার ছবি দিন (ধান, টমেটো, আলু, মরিচ, গম, ভুট্টা, আপেল, আঙ্গুর ইত্যাদি)।" : "Ensure the leaf belongs to one of the 16 supported crops."}</li>
                <li>{isBangla ? "ফল, কাণ্ড বা দূর থেকে তোলা পুরো গাছের ছবি এড়িয়ে চলুন।" : "Avoid photos of whole trees, bare stems, or non-foliar objects."}</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            {onRetake && (
              <Button variant="primary" size="md" onClick={onRetake}>
                <RotateCcw className="h-4 w-4 mr-1.5" />
                {isBangla ? "স্পষ্ট পাতার ছবি আপলোড করুন" : "Upload Clearer Leaf Photo"}
              </Button>
            )}
            <span className="text-xs text-slate-400">
              {isBangla ? "চিকিৎসা নির্দেশিকা স্থগিত রাখা হয়েছে" : "Treatment advice withheld for unverified inputs"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── C. Standard Diagnosis View (Success / Low-Confidence Verified) ─
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

        {/* Alternative Diagnoses / Cross-Crop Competition Notice */}
        {scanResult.alternativeDiagnoses && scanResult.alternativeDiagnoses.length > 0 && (
          <div className="mt-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 p-4 border border-amber-200/90 dark:border-amber-900/60 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-amber-600" />
                {isBangla ? "অন্য কোনো ফসলের পাতা? সঠিক ফসলে ১-ক্লিকে রি-স্ক্যান করুন:" : "Scanning a different plant? 1-Click re-scan under target crop:"}
              </span>
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                {isBangla ? "ক্লিক করে নির্ভুল রোগ নির্ণয় দেখুন" : "Click to view crop-specific diagnosis"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {scanResult.alternativeDiagnoses.map((alt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectCrop && onSelectCrop(alt.crop)}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 px-3.5 py-1.5 text-xs border border-amber-300 hover:border-agri-500 hover:bg-agri-50 dark:border-amber-800 dark:hover:bg-agri-950/50 text-slate-800 dark:text-slate-200 shadow-sm transition-all cursor-pointer"
                >
                  <span className="font-bold text-agri-700 dark:text-agri-400 group-hover:underline">
                    {alt.crop === "Grape" ? (isBangla ? "🍇 আঙ্গুর (Grape)" : "🍇 Grape")
                      : alt.crop === "Strawberry" ? (isBangla ? "🍓 স্ট্রবেরি (Strawberry)" : "🍓 Strawberry")
                      : alt.crop === "Wheat" ? (isBangla ? "🌾 গম (Wheat)" : "🌾 Wheat")
                      : alt.crop === "Apple" ? (isBangla ? "🍎 আপেল (Apple)" : "🍎 Apple")
                      : alt.crop === "Corn (Maize)" || alt.crop === "Corn" ? (isBangla ? "🌽 ভুট্টা (Corn)" : "🌽 Corn")
                      : alt.crop === "Rice" ? (isBangla ? "🌾 ধান (Rice)" : "🌾 Rice")
                      : alt.crop === "Tomato" ? (isBangla ? "🍅 টমেটো (Tomato)" : "🍅 Tomato")
                      : alt.crop === "Potato" ? (isBangla ? "🥔 আলু (Potato)" : "🥔 Potato")
                      : alt.crop === "Pepper" ? (isBangla ? "🫑 মরিচ (Pepper)" : "🫑 Pepper")
                      : alt.crop === "Peach" ? (isBangla ? "🍑 পিচ (Peach)" : "🍑 Peach")
                      : alt.crop === "Cherry" ? (isBangla ? "🍒 চেরি (Cherry)" : "🍒 Cherry")
                      : alt.crop === "Soybean" ? (isBangla ? "🌱 সয়াবিন (Soybean)" : "🌱 Soybean")
                      : alt.crop === "Squash" ? (isBangla ? "🎃 স্কোয়াশ (Squash)" : "🎃 Squash")
                      : alt.crop === "Cassava" ? (isBangla ? "🌿 কাসাভা (Cassava)" : "🌿 Cassava")
                      : alt.crop === "Mango" ? (isBangla ? "🥭 আম (Mango)" : "🥭 Mango")
                      : alt.crop}
                  </span>
                  <span className="rounded-md bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-900 dark:text-amber-200">
                    {alt.score}%
                  </span>
                  <span className="text-[11px] text-agri-600 font-bold">&rarr;</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
      {scanResult.canProvideTreatment && (
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
      )}

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
          href={`/chat?prompt=${encodeURIComponent(
            `আমার ফসলে ${diagnosis.banglaName || diagnosis.commonName} শনাক্ত হয়েছে। এই রোগের প্রতিকারে সহজ বাংলায় আরও কিছু পরামর্শ দিন।`
          )}&crop=${encodeURIComponent(
            scanResult.banglaCropDetected || scanResult.cropDetected
          )}&disease=${encodeURIComponent(
            diagnosis.banglaName || diagnosis.commonName
          )}&confidence=${diagnosis.confidence.toFixed(0)}`}
        >
          <Button
            type="button"
            variant="soft"
            size="sm"
            className="bg-agri-950/80 text-agri-300 border-agri-800 hover:bg-agri-900"
          >
            <Bot className="h-4 w-4 mr-1.5" />
            {isBangla ? "কৃষি সহকারীর সাথে কথা বলুন" : "Ask AI About This Disease"}
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
