import { DISEASES_DATABASE } from "@/data/diseasesDatabase";
import { SAMPLE_LEAVES } from "@/data/sampleLeaves";
import { DiseaseInfo } from "@/types/disease";
import { ScanResult } from "@/types/scanner";

export interface DetectionOptions {
  imageUrl: string;
  imageName?: string;
  matchedDiseaseId?: string;
  cropHint?: string;
}

export async function detectCropDisease(options: DetectionOptions): Promise<ScanResult> {
  const { imageUrl, imageName = "leaf_scan.jpg", matchedDiseaseId, cropHint } = options;

  // Simulate network & GPU inference latency (1.8s)
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // Determine matched disease
  let diagnosis: DiseaseInfo | undefined;

  if (matchedDiseaseId) {
    diagnosis = DISEASES_DATABASE.find((d) => d.id === matchedDiseaseId);
  }

  if (!diagnosis && cropHint) {
    diagnosis = DISEASES_DATABASE.find(
      (d) => d.crop.toLowerCase().includes(cropHint.toLowerCase())
    );
  }

  // Fallback to Tomato Early Blight or random entry if not matched
  if (!diagnosis) {
    const sample = SAMPLE_LEAVES.find((s) => s.imageUrl === imageUrl);
    if (sample) {
      diagnosis = DISEASES_DATABASE.find((d) => d.id === sample.matchedDiseaseId);
    }
  }

  if (!diagnosis) {
    diagnosis = DISEASES_DATABASE[0]; // Tomato Early Blight default
  }

  // Realistic randomized metrics based on severity
  const isHealthy = diagnosis.severity === "Healthy";
  const affectedArea = isHealthy
    ? 0.5
    : diagnosis.severity === "Severe"
    ? 42.5 + Math.random() * 15
    : 18.2 + Math.random() * 12;

  const lesions = isHealthy ? 0 : diagnosis.severity === "Severe" ? 14 + Math.floor(Math.random() * 8) : 5 + Math.floor(Math.random() * 4);
  const chlorophyll = isHealthy ? "Optimal (48.2 SPAD)" : diagnosis.severity === "Severe" ? "Critical (14.6 SPAD)" : "Moderate (27.9 SPAD)";

  const scanId = `SCAN-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

  return {
    scanId,
    timestamp: new Date().toISOString(),
    imageUrl,
    imageName,
    cropDetected: diagnosis.crop,
    diagnosis,
    leafMetrics: {
      affectedAreaPercentage: parseFloat(affectedArea.toFixed(1)),
      chlorophyllIndex: chlorophyll,
      lesionCount: lesions,
      tissueNecrosis: !isHealthy,
    },
    recommendationsCount:
      diagnosis.treatmentPlan.immediateActions.length +
      diagnosis.treatmentPlan.organicTreatments.length +
      diagnosis.treatmentPlan.chemicalTreatments.length,
  };
}
