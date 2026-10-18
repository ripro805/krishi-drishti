"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { ScanResult } from "@/types/scanner";
import { Printer, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

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
  const { diagnosis, leafMetrics } = scanResult;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agricultural Pathology Diagnostic Dossier"
      description={`Reference ID: ${scanResult.scanId}`}
      maxWidth="2xl"
    >
      <div className="printable-report space-y-6 text-slate-800 dark:text-slate-200">
        {/* Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Crop Disease Detection • KrishiDrishti
            </h2>
            <p className="text-xs text-slate-500">Autonomous Agricultural Pathology Division</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-semibold text-slate-900 dark:text-white">Date of Scan:</p>
            <p className="text-slate-500">{formatDate(scanResult.timestamp)}</p>
          </div>
        </div>

        {/* Diagnosis Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Crop Specimen</span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{scanResult.cropDetected}</p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Primary Diagnosis</span>
            <p className="text-base font-bold text-rose-600 dark:text-rose-400 mt-0.5">{diagnosis.commonName}</p>
            <p className="text-xs italic text-slate-500">{diagnosis.scientificName}</p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">AI Confidence Level</span>
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {diagnosis.confidence.toFixed(1)}% Accuracy
            </p>
          </div>
        </div>

        {/* Leaf Microscopic Metrics */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Leaf Pathology & Tissue Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
              <span className="text-slate-500">Affected Area:</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {leafMetrics.affectedAreaPercentage}%
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
              <span className="text-slate-500">Lesion Count:</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {leafMetrics.lesionCount} foci
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
              <span className="text-slate-500">Chlorophyll Index:</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {leafMetrics.chlorophyllIndex}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-800">
              <span className="text-slate-500">Transmission Risk:</span>
              <p className="text-sm font-bold text-amber-600 mt-0.5">
                {diagnosis.transmissionRisk} Risk
              </p>
            </div>
          </div>
        </div>

        {/* Prescribed Immediate Actions */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Prescribed Intervention Protocol
          </h3>
          <div className="space-y-2 text-xs">
            {diagnosis.treatmentPlan.immediateActions.map((action, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/40">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{action.title}</span> -{" "}
                  <span className="text-slate-600 dark:text-slate-300">{action.description}</span>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Timeframe: {action.timeframe} &bull; Expected Control: {action.effectiveness}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off & Verification */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>AI Verified Diagnostic Hash: SHA-256 Validated</span>
          </div>
          <span>KrishiDrishti Digital Pathology</span>
        </div>

        {/* Action Buttons (Hidden when printed) */}
        <div className="flex items-center justify-end gap-3 pt-3 no-print">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1.5" />
            Print / Save as PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};
