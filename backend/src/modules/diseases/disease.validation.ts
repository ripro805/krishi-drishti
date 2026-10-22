import { z } from "zod";

export const createDiseaseSchema = z.object({
  id: z.string().min(2, "Disease ID slug is required"),
  crop: z.string().min(1, "Crop name is required"),
  banglaCrop: z.string().optional(),
  commonName: z.string().min(1, "Common name is required"),
  banglaName: z.string().optional(),
  scientificName: z.string().min(1, "Scientific name is required"),
  pathogenType: z.string().default("Fungal"),
  severity: z.string().default("Moderate"),
  confidence: z.number().min(0).max(100).default(95.0),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  banglaSummary: z.string().optional(),
  symptoms: z.array(z.string()).default([]),
  banglaSymptoms: z.array(z.string()).default([]),
  favorableConditions: z.array(z.string()).default([]),
  banglaCauses: z.array(z.string()).default([]),
  affectedParts: z.array(z.string()).default([]),
  banglaAffectedParts: z.array(z.string()).default([]),
  banglaCropInfo: z.string().optional(),
  transmissionRisk: z.string().default("Moderate"),
  treatmentPlan: z.record(z.unknown()).default({}),
  banglaTreatment: z.record(z.unknown()).optional(),
  sampleImageUrl: z.string().url().optional(),
  isLowConfidenceWarning: z.boolean().default(false),
});

export const updateDiseaseSchema = createDiseaseSchema.partial().omit({ id: true });

export type CreateDiseaseInput = z.infer<typeof createDiseaseSchema>;
export type UpdateDiseaseInput = z.infer<typeof updateDiseaseSchema>;
