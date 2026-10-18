"use client";

import React from "react";
import { useScanner } from "@/hooks/useScanner";
import { Dropzone } from "@/components/scanner/Dropzone";
import { CameraModal } from "@/components/scanner/CameraModal";
import { SampleLeafSelector } from "@/components/scanner/SampleLeafSelector";
import { ScanningAnimation } from "@/components/scanner/ScanningAnimation";
import { DiagnosticResultCard } from "@/components/scanner/DiagnosticResultCard";
import { Button } from "@/components/common/Button";
import { Sparkles, Scan, RotateCcw } from "lucide-react";

export const LiveScannerDemo: React.FC = () => {
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

  return (
    <section id="scanner-section" className="scroll-mt-24 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-agri-100 text-agri-700 dark:bg-agri-950 dark:text-agri-400">
                  <Scan className="h-4 w-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Interactive AI Disease Scanner
                </h2>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Upload your leaf photo, use your webcam, or click any sample leaf below for instant diagnosis:
              </p>
            </div>

            {/* Crop Category Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <label htmlFor="cropSelect" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Crop Focus:
              </label>
              <select
                id="cropSelect"
                value={cropHint}
                onChange={(e) => setCropHint(e.target.value)}
                disabled={isScanning}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Corn (Maize)">Corn (Maize)</option>
                <option value="Bell Pepper">Bell Pepper</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Apple">Apple</option>
                <option value="Grape">Grape</option>
              </select>
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
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-4 text-white shadow-xl animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-agri-500/20 text-agri-400 border border-agri-500/30">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Leaf Image Loaded & Preprocessed</p>
                    <p className="text-[11px] text-slate-400">Ready to initiate multi-layer pathology inference</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearImage} className="text-slate-300 hover:text-white">
                    Reset
                  </Button>
                  <Button variant="primary" size="md" onClick={runScan} className="shadow-lg">
                    <Scan className="h-4 w-4 mr-1.5" />
                    Analyze Leaf with AI
                  </Button>
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
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Diagnostic Report Completed
                    </h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={clearImage}>
                    <RotateCcw className="h-3.5 w-3.5 mr-1" />
                    Scan Another Leaf
                  </Button>
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
