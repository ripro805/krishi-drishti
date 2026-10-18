"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useScanner } from "@/hooks/useScanner";
import { Dropzone } from "@/components/scanner/Dropzone";
import { CameraModal } from "@/components/scanner/CameraModal";
import { SampleLeafSelector } from "@/components/scanner/SampleLeafSelector";
import { ScanningAnimation } from "@/components/scanner/ScanningAnimation";
import { DiagnosticResultCard } from "@/components/scanner/DiagnosticResultCard";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Scan, Sparkles, RotateCcw, ShieldCheck, Info } from "lucide-react";

function ScannerStudioContent() {
  const searchParams = useSearchParams();
  const initialCrop = searchParams.get("crop") || "Tomato";

  const {
    isScanning,
    isCompleted,
    selectedImage,
    selectedSample,
    scanResult,
    isCameraOpen,
    cropHint,
    setCropHint,
    setIsCameraOpen,
    selectImage,
    selectSample,
    clearImage,
    runScan,
  } = useScanner();

  React.useEffect(() => {
    if (initialCrop) {
      setCropHint(initialCrop);
    }
  }, [initialCrop, setCropHint]);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Studio Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="success" size="md">
            <ShieldCheck className="h-3.5 w-3.5" />
            Active Clinical Pathology Model
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI Crop Leaf Disease Scanner
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload an image of an infected leaf or choose a pre-loaded sample to run deep neural vision diagnostic analysis with 98% accuracy.
          </p>
        </div>

        {/* Main Scanner Container */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <label htmlFor="cropFocus" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Selected Crop:
              </label>
              <select
                id="cropFocus"
                value={cropHint}
                onChange={(e) => setCropHint(e.target.value)}
                disabled={isScanning}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Tomato">Tomato (Solanum lycopersicum)</option>
                <option value="Potato">Potato (Solanum tuberosum)</option>
                <option value="Corn (Maize)">Corn / Maize (Zea mays)</option>
                <option value="Bell Pepper">Bell Pepper (Capsicum annuum)</option>
                <option value="Rice">Rice (Oryza sativa)</option>
                <option value="Wheat">Wheat (Triticum)</option>
                <option value="Apple">Apple (Malus domestica)</option>
                <option value="Grape">Grape (Vitis vinifera)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="h-4 w-4 text-agri-600 flex-shrink-0" />
              <span>Ensure adequate daylight and leaf focus for maximum confidence</span>
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
                  <p className="text-xs font-bold text-white">Specimen Ready for Neural Processing</p>
                  <p className="text-[11px] text-slate-400">Estimated processing time &lt; 2.0s</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearImage} className="text-slate-300 hover:text-white">
                  Clear
                </Button>
                <Button variant="primary" size="md" onClick={runScan} className="shadow-lg">
                  <Scan className="h-4 w-4 mr-1.5" />
                  Run AI Disease Analysis
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
                    Pathology Analysis Complete
                  </h3>
                </div>
                <Button variant="outline" size="sm" onClick={clearImage}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  Scan New Specimen
                </Button>
              </div>

              <DiagnosticResultCard scanResult={scanResult} />
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
