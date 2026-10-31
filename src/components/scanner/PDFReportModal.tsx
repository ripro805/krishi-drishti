"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { ScanResult } from "@/types/scanner";
import { Printer, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export interface PDFReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scanResult: ScanResult;
}

export const PDFReportModal: React.FC<PDFReportModalProps> = ({
  isOpen,
  onClose,
  scanResult,
}) => {
  const { isBangla } = useLanguage();
  const { diagnosis } = scanResult;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBangla ? "কৃষি প্যাথলজি ক্লিনিক্যাল ডসিয়ার (পিডিএফ রিপোর্ট)" : "Agricultural Pathology Diagnostic Dossier"}
      description={`Reference ID: ${scanResult.scanId}`}
      maxWidth="2xl"
    >
      <div className="printable-report space-y-6 text-slate-800 dark:text-slate-200">
        {/* Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isBangla ? "কৃষি দৃষ্টি • ক্রপ ডিজিজ ডায়াগনস্টিক রিপোর্ট" : "Crop Disease Detection • KrishiDrishti"}
            </h2>
            <p className="text-xs text-slate-500">Autonomous Agricultural Pathology Division</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-semibold text-slate-900 dark:text-white">{isBangla ? "স্ক্যানের তারিখ:" : "Date of Scan:"}</p>
            <p className="text-slate-500">{formatDate(scanResult.timestamp)}</p>
          </div>
        </div>

        {/* Diagnosis Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              {isBangla ? "ফসলের নমুনা" : "Crop Specimen"}
            </span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {isBangla ? (diagnosis.banglaCrop || scanResult.cropDetected) : scanResult.cropDetected}
            </p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              {isBangla ? "প্রধান রোগ নির্ণয়" : "Primary Diagnosis"}
            </span>
            <p className="text-base font-bold text-rose-600 dark:text-rose-400 mt-0.5">
              {isBangla ? (diagnosis.banglaName || diagnosis.commonName) : diagnosis.commonName}
            </p>
            <p className="text-xs italic text-slate-500">{diagnosis.scientificName}</p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              {isBangla ? "শনাক্তকরণ নিশ্চয়তা" : "Match Confidence"}
            </span>
            <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {diagnosis.confidence.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Symptoms & Pathogen Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isBangla ? "লক্ষণ ও রোগতাত্ত্বিক মূল্যায়ন" : "Pathological Manifestation & Clinical Findings"}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {isBangla ? (diagnosis.banglaSummary || diagnosis.summary) : diagnosis.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            {isBangla ? "বার্ক ও বাংলাদেশ কৃষি গবেষণা কাউন্সিল মানদণ্ড অনুযায়ী প্রস্তুত" : "Validated under BARI & Global Agricultural Benchmarks"}
          </span>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              {isBangla ? "বন্ধ করুন" : "Close"}
            </Button>
            <Button variant="primary" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1.5" />
              {isBangla ? "প্রিন্ট / সেভ করুন" : "Print / Save PDF"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
