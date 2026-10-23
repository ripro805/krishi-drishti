"use client";

import React from "react";
import { useScanner } from "@/hooks/useScanner";
import { Dropzone } from "@/components/scanner/Dropzone";
import { CameraModal } from "@/components/scanner/CameraModal";
import { SampleLeafSelector } from "@/components/scanner/SampleLeafSelector";
import { ScanningAnimation } from "@/components/scanner/ScanningAnimation";
import { DiagnosticResultCard } from "@/components/scanner/DiagnosticResultCard";
import { Button } from "@/components/common/Button";
import { Sparkles, Scan, RotateCcw, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const LiveScannerDemo: React.FC = () => {
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
    <section id="scanner-section" className="scroll-mt-24 py-12 sm:py-16 relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent dark:via-emerald-950/10 pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Pill Title */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 shadow-xs">
            <Cpu className="h-4 w-4 text-emerald-600" />
            <span>{isBangla ? "লাইভ ডেমো • ১-ক্লিকে রোগ নির্ণয়" : "Live Optical Screening Sandbox"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? "সরাসরি পাতা স্ক্যান করে পরীক্ষা করুন" : "Interactive AI Disease Scanner"}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {isBangla
              ? "আপনার আক্রান্ত ফসলের পাতার ছবি আপলোড করুন অথবা নিচের যেকোনো মাঠপর্যায়ের নমুনা পাতা নির্বাচন করুন।"
              : "Upload your leaf photo, use your camera, or click any sample leaf below for instant diagnosis."}
          </p>
        </div>

        {/* Scanner Card */}
        <div className="rounded-3xl border border-emerald-500/25 bg-white/95 p-6 sm:p-10 xl:p-12 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-600/25">
                <Scan className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {isBangla ? "পাতার অপটিক্যাল এআই স্ক্যানার" : "Optical Vision Pathology Engine"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isBangla ? "কনভনেক্সট নিউরাল মডেল • ৯৮.২% নির্ভুলতা" : "ConvNeXt-Tiny Neural Model • 98.2% Accuracy"}
                </p>
              </div>
            </div>

            {/* Auto-Detect Badge */}
            <div className="flex items-center gap-2 self-start sm:self-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1.5 border border-emerald-200/80 dark:border-emerald-800">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {isBangla ? "অটো-ডিটেক্ট ফসল ও রোগ" : "Auto-Detect Crop & Disease"}
              </span>
            </div>
          </div>

          {/* Scanner View */}
          <div className="relative">
            {/* Dropzone / Image Preview Area */}
            <div className="relative">
              <Dropzone
                onImageSelected={selectImage}
                onOpenCamera={() => setIsCameraOpen(true)}
                selectedImage={selectedImage}
                onClearImage={clearImage}
                isScanning={isScanning}
              />

              {/* Scanning Laser Animation Overlay */}
              {isScanning && <ScanningAnimation />}
            </div>

            {/* Scan Action Bar */}
            {selectedImage && !isCompleted && !isScanning && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 text-white shadow-xl animate-fadeIn border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {isBangla ? "পাতার ছবি সফলভাবে লোড হয়েছে" : "Leaf Image Loaded & Preprocessed"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isBangla ? "এআই নিউরাল মডেল দিয়ে রোগ নির্ণয় করতে বাটনে চাপুন" : "Ready to initiate multi-layer pathology inference"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearImage}
                    className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    {isBangla ? "বাতিল" : "Reset"}
                  </button>
                  <button
                    type="button"
                    onClick={runScan}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <Scan className="h-4 w-4" />
                    <span>{isBangla ? "এআই দিয়ে রোগ নির্ণয় করুন" : "Analyze Leaf with AI"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sample Leaves Picker (when no image is scanned or completed) */}
            {!isCompleted && !isScanning && (
              <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                <SampleLeafSelector
                  onSelectSample={selectSample}
                  selectedSampleId={selectedSample?.id || null}
                  disabled={isScanning}
                />
              </div>
            )}

            {/* Diagnosis Result Card */}
            {isCompleted && scanResult && (
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {isBangla ? "রোগ নির্ণয় রিপোর্ট প্রস্তুত" : "Diagnostic Report Completed"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{isBangla ? "অন্য পাতা স্ক্যান করুন" : "Scan Another Leaf"}</span>
                  </button>
                </div>

                <DiagnosticResultCard scanResult={scanResult} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => selectImage(dataUrl, "camera_capture.jpg")}
      />
    </section>
  );
};
