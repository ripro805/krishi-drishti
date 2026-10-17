"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScanResult } from "@/types/scanner";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { TreatmentPlanTabs } from "./TreatmentPlanTabs";
import { PDFReportModal } from "./PDFReportModal";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Bot,
  Activity,
  Droplets,
  Share2,
  BookmarkCheck,
  Thermometer,
  Eye,
} from "lucide-react";

export interface DiagnosticResultCardProps {
  scanResult: ScanResult;
  onSaveToHistory?: (result: ScanResult) => void;
}

export const DiagnosticResultCard: React.FC<DiagnosticResultCardProps> = ({
  scanResult,
  onSaveToHistory,
}) => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { diagnosis, leafMetrics } = scanResult;
  const isHealthy = diagnosis.severity === "Healthy";

  const handleSave = () => {
    if (onSaveToHistory) {
      onSaveToHistory(scanResult);
    }
    setIsSaved(true);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Primary Header Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <Badge
                variant={
                  isHealthy
                    ? "success"
                    : diagnosis.severity === "Severe"
                    ? "danger"
                    : "warning"
                }
                size="md"
              >
                {diagnosis.severity === "Healthy" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5" />
                )}
                {diagnosis.severity} Severity
              </Badge>

              <Badge variant="outline" size="md">
                Pathogen: {diagnosis.pathogenType}
              </Badge>

              <Badge variant="info" size="md">
                Crop: {scanResult.cropDetected}
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {diagnosis.commonName}
            </h2>
            <p className="text-sm italic font-mono text-slate-500 dark:text-slate-400 mt-1">
              Scientific Name: {diagnosis.scientificName}
            </p>
          </div>

          {/* Confidence Meter Badge */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-4 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-inner">
              <span className="text-sm font-extrabold">{diagnosis.confidence.toFixed(0)}%</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                Diagnostic Confidence
              </p>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Validated High Match
              </p>
              <p className="text-[11px] text-slate-400">Reference: PlantVillage</p>
            </div>
          </div>
        </div>

        {/* Clinical Overview Paragraph */}
        <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {diagnosis.summary}
        </p>

        {/* Microscopic Leaf Metrics Bar */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Activity className="h-4 w-4 text-rose-500" />
              <span>Affected Area</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {leafMetrics.affectedAreaPercentage}%
            </p>
            <p className="text-[11px] text-slate-400">Foliar necrosis ratio</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Eye className="h-4 w-4 text-amber-500" />
              <span>Lesion Count</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {leafMetrics.lesionCount} foci
            </p>
            <p className="text-[11px] text-slate-400">Spot colonies</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Droplets className="h-4 w-4 text-emerald-500" />
              <span>Chlorophyll Index</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {leafMetrics.chlorophyllIndex.split(" ")[0]}
            </p>
            <p className="text-[11px] text-slate-400">SPAD sensor scale</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Thermometer className="h-4 w-4 text-blue-500" />
              <span>Transmission Risk</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {diagnosis.transmissionRisk}
            </p>
            <p className="text-[11px] text-slate-400">Airborne / Splash</p>
          </div>
        </div>

        {/* Symptoms & Conditions Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-agri-500" />
              Observable Symptoms
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {diagnosis.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-agri-600 font-bold">&bull;</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Favorable Pathogen Conditions
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {diagnosis.favorableConditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">&bull;</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Treatment Plan Section Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Integrated Treatment & Recovery Protocol
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Select treatment categories below to review organic bio-controls, chemical fungicides, and priority actions:
        </p>

        <TreatmentPlanTabs treatmentPlan={diagnosis.treatmentPlan} />
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 text-white shadow-xl">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setShowPdfModal(true)}
            className="shadow-md"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            Generate PDF Pathology Dossier
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
            {isSaved ? "Saved to Field History" : "Save Scan"}
          </Button>
        </div>

        <Link
          href={`/crop-doctor?prompt=Tell me more about treating ${encodeURIComponent(
            diagnosis.commonName
          )} on ${encodeURIComponent(scanResult.cropDetected)}`}
        >
          <Button
            type="button"
            variant="soft"
            size="sm"
            className="bg-agri-950/80 text-agri-300 border-agri-800 hover:bg-agri-900"
          >
            <Bot className="h-4 w-4 mr-1.5" />
            Ask Crop Doctor AI About This
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
