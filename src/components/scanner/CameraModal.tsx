"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, RefreshCw, X, AlertCircle } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { useLanguage } from "@/context/LanguageContext";

export interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const { isBangla } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(isBangla ? "ক্যামেরা ব্যবহারের অনুমতি দেওয়া হয়নি বা ক্যামেরা পাওয়া যায়নি।" : "Camera permission denied or camera not available on this device.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCapture(dataUrl);
    onClose();
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBangla ? "লাইভ ক্যামেরা দিয়ে পাতার ছবি তুলুন" : "Live Leaf Camera Diagnostic Capture"}
      description={isBangla ? "আক্রান্ত পাতাটি ফ্রেমের মাঝে রাখুন এবং স্পষ্ট ফোকাস নিশ্চিত করুন" : "Position the infected leaf blade in the center and align with good lighting"}
      maxWidth="xl"
    >
      <div className="space-y-4">
        {cameraError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-50 rounded-2xl dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 space-y-3">
            <AlertCircle className="h-8 w-8 text-rose-600" />
            <p className="text-sm font-semibold">{cameraError}</p>
            <Button size="sm" variant="outline" onClick={startCamera}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              {isBangla ? "পুনরায় চেষ্টা করুন" : "Retry Camera"}
            </Button>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-black aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-8 border-2 border-dashed border-emerald-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
              <span className="text-[11px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                {isBangla ? "পাতা এখানে রাখুন" : "Target Leaf Center"}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleFacingMode}
            disabled={!!cameraError}
          >
            <RefreshCw className="h-4 w-4 mr-1.5" />
            {isBangla ? "ক্যামেরা পরিবর্তন" : "Switch Camera"}
          </Button>

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              {isBangla ? "বাতিল" : "Cancel"}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleCapture}
              disabled={!!cameraError}
              className="shadow-lg shadow-emerald-600/30 font-bold"
            >
              <Camera className="h-4 w-4 mr-1.5" />
              {isBangla ? "ছবি তুলুন" : "Capture Photo"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
