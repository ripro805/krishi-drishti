import { z } from "zod";

export const createFeedbackSchema = z.object({
  scanId: z.string().min(1, "Scan ID is required"),
  crop: z.string().min(1, "Crop is required"),
  disease: z.string().min(1, "Disease is required"),
  banglaDisease: z.string().optional(),
  confidence: z.number().min(0).max(100),
  rating: z.enum(["accurate", "inaccurate", "unsure"]),
  comment: z.string().optional(),
  userName: z.string().optional(),
});

export const updateFeedbackStatusSchema = z.object({
  status: z.enum(["new", "reviewed", "flagged"]),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackStatusInput = z.infer<typeof updateFeedbackStatusSchema>;
