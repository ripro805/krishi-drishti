"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Camera, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useLanguage } from "@/context/LanguageContext";

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
  const { isBangla } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith("image/")) {
      setErrorMsg(isBangla ? "দয়া করে একটি সঠিক ছবি ফাইল (JPG, PNG, WebP) আপলোড করুন।" : "Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg(isBangla ? "ছবির সাইজ ১৫ মেগাবাইটের বেশি। তুলনামূলক ছোট ছবি আপলোড করুন।" : "Image size exceeds 15MB. Please upload a smaller photo.");
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
        <div className="relative group overflow-hidden rounded-3xl border-2 border-emerald-500/60 bg-slate-950 shadow-2xl">
          {/* Selected Leaf Image Preview */}
          <div className="relative h-80 sm:h-96 w-full flex items-center justify-center bg-slate-950 overflow-hidden">
            <img
              src={selectedImage}
              alt="Leaf crop sample for disease scanning"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-102"
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
                <span>{isBangla ? "পাতা পরিবর্তন" : "Change Leaf"}</span>
              </button>
            </div>

            <div className="absolute bottom-3 left-3 rounded-xl bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isBangla ? "পাতা বিশ্লেষণের জন্য প্রস্তুত" : "Leaf Ready for Optical Pathology"}</span>
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
              ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 scale-[1.01]"
              : "border-slate-300/90 hover:border-emerald-400 bg-slate-50/70 hover:bg-emerald-50/30 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800/40"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 text-emerald-700 dark:from-emerald-950 dark:to-emerald-900 shadow-sm border border-emerald-200 dark:border-emerald-800">
            <UploadCloud className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {isBangla ? "পাতার ছবি আপলোড করুন বা এখানে টেনে এনে ছেড়ে দিন" : "Upload Leaf Photo or Drag & Drop"}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {isBangla
              ? "টমেটো, আলু, মরিচ, ধান বা ভুট্টার রোগাক্রান্ত পাতার সুস্পষ্ট ও পরিষ্কার ক্লোজ-আপ ছবি দিন"
              : "High-resolution close-up of tomato, potato, corn, or pepper leaf with visible symptoms"}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              <ImageIcon className="h-4 w-4" />
              <span>{isBangla ? "ডিভাইস থেকে ছবি বাছুন" : "Browse Device"}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCamera();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-emerald-400 hover:text-emerald-700 shadow-xs transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Camera className="h-4 w-4 text-emerald-600" />
              <span>{isBangla ? "ক্যামেরা চালু করুন" : "Use Live Camera"}</span>
            </button>
          </div>

          <p className="mt-4 text-[11px] text-slate-400 font-medium">
            {isBangla ? "JPG, PNG, WEBP সমর্থিত • সর্বোচ্চ ১৫ মেগাবাইট" : "Supports JPG, PNG, WEBP up to 15MB"}
          </p>
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
