export type SoilFertilityLevel = "Low" | "Medium" | "High";
export type AreaUnit = "Acres" | "Hectares" | "Bigha" | "Decimals";

export interface FertilizerInput {
  crop: string;
  fieldArea: number;
  areaUnit: AreaUnit;
  soilNitrogen: SoilFertilityLevel;
  soilPhosphorus: SoilFertilityLevel;
  soilPotassium: SoilFertilityLevel;
  targetYieldTonsPerHa: number;
}

export interface SplitSchedule {
  stage: string;
  daysAfterSowing: string;
  ureaKg: number;
  dapKg: number;
  mopKg: number;
  foliarSpray?: string;
  notes: string;
}

export interface FertilizerCalculationResult {
  totalUreaKg: number;
  totalDapKg: number;
  totalMopKg: number;
  totalGypsumKg: number;
  totalZincSulphateKg: number;
  estimatedCostUSD: number;
  co2SavingsKg: number;
  efficiencyRating: string;
  schedule: SplitSchedule[];
  guidelines: string[];
}
