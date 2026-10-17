"use client";

import { useState, useCallback } from "react";
import { ScanResult, ScanStatus } from "@/types/scanner";
import { SampleLeaf } from "@/data/sampleLeaves";
import { detectCropDisease } from "@/lib/diseaseDetector";
import { saveScanToHistory } from "@/lib/storage";

export function useScanner() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("leaf_image.jpg");
  const [selectedSample, setSelectedSample] = useState<SampleLeaf | null>(null);
  const [cropHint, setCropHint] = useState<string>("Tomato");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectImage = useCallback((dataUrl: string, name: string) => {
    setSelectedImage(dataUrl);
    setImageName(name);
    setSelectedSample(null);
    setScanResult(null);
    setError(null);
    setStatus("idle");
  }, []);

  const selectSample = useCallback((sample: SampleLeaf) => {
    setSelectedSample(sample);
    setSelectedImage(sample.imageUrl);
    setImageName(`${sample.id}.jpg`);
    setCropHint(sample.crop);
    setScanResult(null);
    setError(null);
    setStatus("idle");
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setSelectedSample(null);
    setScanResult(null);
    setError(null);
    setStatus("idle");
  }, []);

  const runScan = useCallback(async () => {
    if (!selectedImage) return;

    try {
      setStatus("scanning");
      setError(null);

      const result = await detectCropDisease({
        imageUrl: selectedImage,
        imageName,
        matchedDiseaseId: selectedSample?.matchedDiseaseId,
        cropHint,
      });

      setScanResult(result);
      saveScanToHistory(result);
      setStatus("completed");
    } catch (err: any) {
      console.error("Scan error:", err);
      setError(err?.message || "Failed to analyze crop leaf. Please try again.");
      setStatus("error");
    }
  }, [selectedImage, imageName, selectedSample, cropHint]);

  return {
    status,
    isScanning: status === "scanning",
    isCompleted: status === "completed",
    selectedImage,
    imageName,
    selectedSample,
    cropHint,
    setCropHint,
    scanResult,
    isCameraOpen,
    setIsCameraOpen,
    error,
    selectImage,
    selectSample,
    clearImage,
    runScan,
  };
}
