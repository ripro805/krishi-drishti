export type FeedbackRating = "accurate" | "inaccurate" | "unsure";

export interface PredictionFeedback {
  id: string;
  scanId: string;
  crop: string;
  disease: string;
  banglaDisease?: string;
  confidence: number;
  rating: FeedbackRating;
  comment?: string;
  userId?: string;
  userName?: string;
  createdAt: string;
  status: "new" | "reviewed" | "flagged";
}

export interface FeedbackStats {
  total: number;
  accurateCount: number;
  inaccurateCount: number;
  unsureCount: number;
  accuracyRate: number; // percentage
}
