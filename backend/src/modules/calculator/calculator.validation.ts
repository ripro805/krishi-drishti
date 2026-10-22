import { z } from "zod";

export const fertilizerCalculationSchema = z.object({
  crop: z.string().min(1, "Crop is required"),
  fieldArea: z.number().positive("Field area must be a positive number"),
  areaUnit: z.enum(["Acres", "Hectares", "Bigha", "Decimals"]).default("Acres"),
  soilNitrogen: z.enum(["Low", "Medium", "High"]).default("Medium"),
  soilPhosphorus: z.enum(["Low", "Medium", "High"]).default("Medium"),
  soilPotassium: z.enum(["Low", "Medium", "High"]).default("Medium"),
});

export type FertilizerCalculationInput = z.infer<typeof fertilizerCalculationSchema>;
