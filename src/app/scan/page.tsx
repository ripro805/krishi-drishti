"use client";

import React, { Suspense } from "react";
import { useScanner } from "@/hooks/useScanner";
import { Dropzone } from "@/components/scanner/Dropzone";
import { CameraModal } from "@/components/scanner/CameraModal";
import { SampleLeafSelector } from "@/components/scanner/SampleLeafSelector";
import { ScanningAnimation } from "@/components/scanner/ScanningAnimation";
import { DiagnosticResultCard } from "@/components/scanner/DiagnosticResultCard";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Scan, Sparkles, RotateCcw, ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function ScannerStudioContent() {
  const { isBangla } = useLanguage();

  const {
    isScanning,
    isCompleted,
    selectedImage,
    selectedSample,
    scanResult,
    isCameraOpen,
    setIsCameraOpen,
    selectImage,
    selectSample,
    clearImage,
    runScan,
  } = useScanner();


  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Studio Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <Badge variant="success" size="md">
            <ShieldCheck className="h-3.5 w-3.5" />
            {isBangla ? "৯৮% ল্যাবরেটরি নির্ভুল এআই মডেল" : "Active Clinical Pathology Model"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? "ফসলের পাতার রোগ নির্ণয় স্ক্যানার" : "AI Crop Leaf Disease Scanner"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isBangla
              ? "আক্রান্ত গাছের পাতার ছবি আপলোড করুন অথবা ক্যামেরা দিয়ে সরাসরি ছবি তুলুন। এআই স্বয়ংক্রিয়ভাবে রোগ শনাক্ত করবে এবং বাংলায় তাৎক্ষণিক পরামর্শ প্রদান করবে।"
              : "Upload an image of an infected leaf or choose a pre-loaded sample to run deep neural vision diagnostic analysis with 98% accuracy."}
          </p>

          {/* Important Product Disclaimer Banner */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-1.5 text-xs text-amber-900 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <span>
              {isBangla
                ? "বিজ্ঞপ্তি: এআই ফলাফলটি কেবল প্রাথমিক স্ক্রিনিং। নিশ্চিত ডায়াগনোসিসের জন্য বিশেষজ্ঞের পরামর্শ নিন।"
                : "Product Note: AI output is for preliminary screening only, not a final laboratory diagnosis."}
            </span>
          </div>
        </div>

        {/* Main Scanner Container */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {/* Auto-detect Info Bar */}
          <div className="flex items-center gap-2.5 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 rounded-xl bg-agri-50 dark:bg-agri-950/40 px-3 py-1.5 border border-agri-200 dark:border-agri-800">
              <Sparkles className="h-3.5 w-3.5 text-agri-600" />
              <span className="text-xs font-semibold text-agri-800 dark:text-agri-300">
                {isBangla ? "ফসল ও রোগ স্বয়ংক্রিয় শনাক্তকরণ" : "Auto-Detect Crop & Disease"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Info className="h-3.5 w-3.5 text-agri-600 flex-shrink-0" />
              <span>
                {isBangla
                  ? "পাতার ছবি আপলোড করুন — এআই স্বয়ংক্রিয়ভাবে ফসল ও রোগ শনাক্ত করবে"
                  : "Upload a leaf image — AI auto-detects crop type and disease"}
              </span>
            </div>
          </div>

          {/* Scanner Body */}
          <div className="relative">
            <Dropzone
              onImageSelected={selectImage}
              onOpenCamera={() => setIsCameraOpen(true)}
              selectedImage={selectedImage}
              onClearImage={clearImage}
              isScanning={isScanning}
            />

            {isScanning && <ScanningAnimation />}
          </div>

          {/* Trigger Scan Bar */}
          {selectedImage && !isCompleted && !isScanning && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 text-white shadow-xl animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-agri-500/20 text-agri-400 border border-agri-500/30">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {isBangla ? "পাতাটি এআই বিশ্লেষণের জন্য প্রস্তুত" : "Specimen Ready for Neural Processing"}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {isBangla ? "আনুমানিক সময় < ২.০ সেকেন্ড" : "Estimated processing time < 2.0s"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearImage} className="text-slate-300 hover:text-white">
                  {isBangla ? "বাতিল" : "Clear"}
                </Button>
                <Button variant="primary" size="md" onClick={runScan} className="shadow-lg">
                  <Scan className="h-4 w-4 mr-1.5" />
                  {isBangla ? "এআই দিয়ে রোগ নির্ণয় করুন" : "Run AI Disease Analysis"}
                </Button>
              </div>
            </div>
          )}

          {/* Sample Selector */}
          {!isCompleted && !isScanning && (
            <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
              <SampleLeafSelector
                onSelectSample={selectSample}
                selectedSampleId={selectedSample?.id || null}
                disabled={isScanning}
              />
            </div>
          )}

          {/* Diagnostic Result */}
          {isCompleted && scanResult && (
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isBangla ? "রোগ নির্ণয় ও প্রাথমিক স্ক্রিনিং ফলাফল" : "Pathology Analysis Complete"}
                  </h3>
                </div>
                <Button variant="outline" size="sm" onClick={clearImage}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  {isBangla ? "নতুন পাতা স্ক্যান করুন" : "Scan New Specimen"}
                </Button>
              </div>

              <DiagnosticResultCard
                scanResult={scanResult}
                onRetake={clearImage}
              />
            </div>
          )}
        </div>
      </div>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => selectImage(dataUrl, "camera_leaf.jpg")}
      />
    </div>
  );
}

export default function ScannerStudioPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Leaf Scanner Studio...</div>}>
      <ScannerStudioContent />
    </Suspense>
  );
}
