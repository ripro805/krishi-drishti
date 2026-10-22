import { z } from "zod";

export const createScanSchema = z.object({
  imageUrl: z.string().min(1, "Leaf image URL or data URI is required"),
  imageName: z.string().optional().default("leaf_scan.jpg"),
  cropHint: z.string().optional(),
  matchedDiseaseId: z.string().optional(),
});

export const updateScanStatusSchema = z.object({
  status: z.enum(["Active", "Treated", "Monitoring"]),
});

export type CreateScanInput = z.infer<typeof createScanSchema>;
export type UpdateScanStatusInput = z.infer<typeof updateScanStatusSchema>;
