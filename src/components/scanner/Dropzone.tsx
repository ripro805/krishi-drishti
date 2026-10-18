"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Camera, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/common/Button";

export interface DropzoneProps {
  onImageSelected: (dataUrl: string, fileName: string) => void;
  onOpenCamera: () => void;
  selectedImage: string | null;
  onClearImage: () => void;
  isScanning: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onImageSelected,
  onOpenCamera,
  selectedImage,
  onClearImage,
  isScanning,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 15MB. Please upload a smaller photo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        onImageSelected(e.target.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="relative group overflow-hidden rounded-3xl border-2 border-agri-400 bg-slate-950 shadow-xl">
          {/* Selected Leaf Image Preview */}
          <div className="relative h-80 sm:h-96 w-full flex items-center justify-center bg-slate-900 overflow-hidden">
            <img
              src={selectedImage}
              alt="Leaf crop sample for disease scanning"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {/* Top action overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                type="button"
                onClick={onClearImage}
                disabled={isScanning}
                className="flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 transition-colors shadow-lg disabled:opacity-40"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Change Leaf
              </button>
            </div>

            <div className="absolute bottom-3 left-3 rounded-xl bg-slate-900/85 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/30">
              Leaf Ready for Optical Pathology
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 ${
            isDragOver
              ? "border-agri-500 bg-agri-50/70 dark:bg-agri-950/30 scale-[1.01]"
              : "border-slate-300 hover:border-agri-400 bg-slate-50/60 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800/40"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-agri-100 to-agri-50 text-agri-600 dark:from-agri-950 dark:to-agri-900 shadow-sm border border-agri-200 dark:border-agri-800">
            <UploadCloud className="h-8 w-8 text-agri-600 dark:text-agri-400" />
          </div>

          <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Upload Leaf Photo or Drag & Drop
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            High-resolution close-up of tomato, potato, corn, or pepper leaf with visible symptoms
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <ImageIcon className="h-4 w-4" />
              Browse Device
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCamera();
              }}
            >
              <Camera className="h-4 w-4 text-agri-600" />
              Use Live Camera
            </Button>
          </div>

          <p className="mt-4 text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 15MB</p>
        </div>
      )}

      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
