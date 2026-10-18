export type SeverityLevel = "Healthy" | "Mild" | "Moderate" | "Severe";
export type PathogenType = "Fungal" | "Bacterial" | "Viral" | "Nutrient Deficiency" | "Pest Infestation" | "None";

export interface TreatmentAction {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  timeframe: string;
  effectiveness: string; // e.g. "90-95%"
}

export interface ChemicalTreatment {
  name: string;
  activeIngredient: string;
  dosage: string;
  safetyInterval: string; // Pre-harvest interval (PHI)
  cautions: string;
}

export interface OrganicTreatment {
  name: string;
  preparation: string;
  application: string;
  certifications: string; // e.g. "OMRI Listed, EcoCert"
}

export interface TreatmentPlan {
  immediateActions: TreatmentAction[];
  organicTreatments: OrganicTreatment[];
  chemicalTreatments: ChemicalTreatment[];
  preventiveMeasures: string[];
  culturalPractices: string[];
}

export interface DiseaseInfo {
  id: string;
  crop: string;
  commonName: string;
  scientificName: string;
  pathogenType: PathogenType;
  severity: SeverityLevel;
  confidence: number; // 0 to 100
  summary: string;
  symptoms: string[];
  favorableConditions: string[];
  affectedParts: string[];
  transmissionRisk: "High" | "Moderate" | "Low" | "None";
  treatmentPlan: TreatmentPlan;
  sampleImageUrl?: string;
}
