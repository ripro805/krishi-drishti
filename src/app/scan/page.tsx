"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScanner } from "@/hooks/useScanner";
import { Dropzone } from "@/components/scanner/Dropzone";
import { CameraModal } from "@/components/scanner/CameraModal";
import { SampleLeafSelector } from "@/components/scanner/SampleLeafSelector";
import { ScanningAnimation } from "@/components/scanner/ScanningAnimation";
import { DiagnosticResultCard } from "@/components/scanner/DiagnosticResultCard";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Scan, Sparkles, RotateCcw, ShieldCheck, Info, AlertTriangle, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ALL_CROPS_LIST = [
  { id: "auto", name: "Auto-Detect", bnName: "স্বয়ংক্রিয় (সব ফসল)", icon: "🌟" },
  { id: "Rice", name: "Rice", bnName: "ধান", icon: "🌾" },
  { id: "Tomato", name: "Tomato", bnName: "টমেটো", icon: "🍅" },
  { id: "Potato", name: "Potato", bnName: "আলু", icon: "🥔" },
  { id: "Bell Pepper", name: "Pepper", bnName: "মরিচ", icon: "🌶️" },
  { id: "Corn (Maize)", name: "Corn", bnName: "ভুট্টা", icon: "🌽" },
  { id: "Wheat", name: "Wheat", bnName: "গম", icon: "🌾" },
  { id: "Apple", name: "Apple", bnName: "আপেল", icon: "🍎" },
  { id: "Grape", name: "Grape", bnName: "আঙ্গুর", icon: "🍇" },
  { id: "Strawberry", name: "Strawberry", bnName: "স্ট্রবেরি", icon: "🍓" },
  { id: "Orange (Citrus)", name: "Citrus", bnName: "লেবু/কমলা", icon: "🍋" },
  { id: "Peach", name: "Peach", bnName: "পিচ", icon: "🍑" },
  { id: "Cherry", name: "Cherry", bnName: "চেরি", icon: "🍒" },
  { id: "Blueberry", name: "Blueberry", bnName: "ব্লুবেরি", icon: "🫐" },
  { id: "Raspberry", name: "Raspberry", bnName: "রাস্পবেরি", icon: "🍇" },
  { id: "Soybean", name: "Soybean", bnName: "সয়াবিন", icon: "🌱" },
  { id: "Squash", name: "Squash", bnName: "মিষ্টি কুমড়া", icon: "🎃" },
];

function ScannerStudioContent() {
  const { isBangla } = useLanguage();
  const searchParams = useSearchParams();
  const urlCrop = searchParams.get("crop");

  const {
    isScanning,
    isCompleted,
    selectedImage,
    selectedSample,
    cropHint,
    setCropHint,
    scanResult,
    isCameraOpen,
    setIsCameraOpen,
    selectImage,
    selectSample,
    clearImage,
    runScan,
  } = useScanner();

  useEffect(() => {
    if (urlCrop) {
      const found = ALL_CROPS_LIST.find(
        (c) =>
          c.id !== "auto" &&
          (urlCrop.toLowerCase().includes(c.name.toLowerCase()) ||
            urlCrop.toLowerCase().includes(c.id.toLowerCase()) ||
            urlCrop.toLowerCase().includes(c.bnName.toLowerCase()))
      );
      if (found) {
        setCropHint(found.id);
      }
    }
  }, [urlCrop, setCropHint]);

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
          {/* Target Crop Selection Bar */}
          <div className="mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-agri-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {isBangla ? "কোন ফসলের পাতা স্ক্যান করছেন?" : "Which crop are you scanning?"}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {cropHint === "auto"
                  ? isBangla
                    ? "🌟 স্বয়ংক্রিয় সনাক্তকরণ সক্রিয় (১৬টি ফসল)"
                    : "🌟 Auto-detect active across all 16 crops"
                  : isBangla
                  ? `🎯 ফোকাস ফসল: ${ALL_CROPS_LIST.find((c) => c.id === cropHint)?.bnName || cropHint}`
                  : `🎯 Focused on: ${ALL_CROPS_LIST.find((c) => c.id === cropHint)?.name || cropHint}`}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {ALL_CROPS_LIST.map((c) => {
                const isActive =
                  (cropHint === "auto" && c.id === "auto") ||
                  cropHint.toLowerCase() === c.id.toLowerCase() ||
                  cropHint.toLowerCase().includes(c.name.toLowerCase());
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCropHint(c.id);
                      if (selectedImage) {
                        runScan(c.id);
                      }
                    }}
                    className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-agri-600 text-white shadow-md ring-2 ring-agri-500/30 scale-105"
                        : "bg-white text-slate-700 hover:bg-slate-100 hover:border-agri-300 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{isBangla ? c.bnName : c.name}</span>
                  </button>
                );
              })}
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
                <Button variant="primary" size="md" onClick={() => runScan()} className="shadow-lg">
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
                onSelectCrop={(crop) => {
                  runScan(crop);
                }}
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
