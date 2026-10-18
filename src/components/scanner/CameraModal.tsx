"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, RefreshCw, X, AlertCircle } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";

export interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
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
      setCameraError("Camera permission denied or camera not available on this device.");
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
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      onCapture(dataUrl);
      onClose();
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Capture Leaf in Real Time" maxWidth="lg">
      <div className="flex flex-col items-center">
        {cameraError ? (
          <div className="w-full rounded-2xl bg-amber-50 p-6 text-center text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="mx-auto h-8 w-8 text-amber-600 mb-2" />
            <p className="text-sm font-semibold">{cameraError}</p>
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
              You can alternatively select an image from your device or test with sample leaves.
            </p>
            <Button variant="outline" size="sm" onClick={onClose} className="mt-4">
              Close & Upload File
            </Button>
          </div>
        ) : (
          <div className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />

              {/* Viewfinder crosshairs */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-4/5 w-4/5 rounded-2xl border-2 border-dashed border-emerald-400/70 shadow-2xl">
                  <div className="absolute top-2 left-2 text-[10px] uppercase font-bold text-emerald-400 tracking-wider bg-black/50 px-2 py-0.5 rounded">
                    Align leaf inside frame
                  </div>
                </div>
              </div>

              {/* Flip camera button */}
              <button
                type="button"
                onClick={toggleFacingMode}
                className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 backdrop-blur-md transition-colors"
                title="Switch Camera"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleCapture} className="shadow-lg">
                <Camera className="h-5 w-5 mr-2" />
                Capture Leaf Photo
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
