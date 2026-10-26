import { DiseaseInfo } from "./disease";

export type ScanStatus = "idle" | "uploading" | "scanning" | "completed" | "error";

export interface ScanStage {
  id: number;
  label: string;
  status: "pending" | "active" | "done";
}

export interface ScanResult {
  scanId: string;
  timestamp: string;
  imageUrl: string;
  imageName: string;
  cropDetected: string;
  banglaCropDetected?: string;
  diagnosis: DiseaseInfo;
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
