import { DiseaseInfo } from "./disease";

export type ScanStatus = "idle" | "uploading" | "scanning" | "completed" | "error";

export type PredictionStatus =
  | "success"
  | "crop_mismatch"
  | "unknown_crop"
  | "unsupported_image"
  | "low_confidence"
  | "invalid_image"
  | "model_error";

export interface ScanStage {
  id: number;
  label: string;
  status: "pending" | "active" | "done";
}

export interface MismatchDetails {
  selectedCrop: string;
  detectedCrop: string;
  banglaSelectedCrop?: string;
  banglaDetectedCrop?: string;
  confidence: number;
}

export interface ScanResult {
  scanId: string;
  timestamp: string;
  imageUrl: string;
  imageName: string;
  status: PredictionStatus;
  canProvideTreatment: boolean;
  selectedCrop?: string;
  banglaSelectedCrop?: string;
  cropDetected: string;
  banglaCropDetected?: string;
  diagnosis: DiseaseInfo;
  statusMessage?: string;
  banglaStatusMessage?: string;
  mismatchDetails?: MismatchDetails;
  isLowConfidence?: boolean;
  isCrossCropAmbiguous?: boolean;
  alternativeDiagnoses?: Array<{ label: string; score: number; crop: string }>;
  leafMetrics: {
    affectedAreaPercentage: number;
    chlorophyllIndex: string;
    lesionCount: number;
    tissueNecrosis: boolean;
  };
  recommendationsCount: number;
}

export interface HistoryItem {
  id: string;
  date: string;
  crop: string;
  banglaCrop?: string;
  disease: string;
  banglaName?: string;
  confidence: number;
  severity: "Healthy" | "Mild" | "Moderate" | "Severe";
  imageUrl: string;
  status: "Active" | "Treated" | "Monitoring";
  isLowConfidence?: boolean;
  feedbackRating?: "accurate" | "inaccurate" | "unsure";
}
