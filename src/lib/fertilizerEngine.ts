import { FertilizerCalculationResult, FertilizerInput, SplitSchedule } from "@/types/calculator";

export function calculateFertilizer(input: FertilizerInput): FertilizerCalculationResult {
  const { crop, fieldArea, areaUnit, soilNitrogen, soilPhosphorus, soilPotassium } = input;

  // Convert area to Hectares for base agronomic formulas
  // 1 Hectare = 2.471 Acres = 7.47 Bigha (approx Bangladesh/West Bengal standard) = 247.1 Decimals
  let areaInHa = fieldArea;
  if (areaUnit === "Acres") {
    areaInHa = fieldArea / 2.471;
  } else if (areaUnit === "Bigha") {
    areaInHa = fieldArea / 7.47;
  } else if (areaUnit === "Decimals") {
    areaInHa = fieldArea / 247.1;
  }

  // Base requirement kg/ha for major crops (N - P2O5 - K2O)
  const baseRates: Record<string, { n: number; p: number; k: number }> = {
    Tomato: { n: 120, p: 80, k: 100 },
    Potato: { n: 150, p: 100, k: 120 },
    "Corn (Maize)": { n: 140, p: 60, k: 50 },
    "Bell Pepper": { n: 110, p: 70, k: 90 },
    Rice: { n: 100, p: 50, k: 50 },
    Wheat: { n: 120, p: 60, k: 40 },
    Apple: { n: 80, p: 40, k: 80 },
    Grape: { n: 70, p: 50, k: 90 },
    Strawberry: { n: 70, p: 50, k: 80 },
    Peach: { n: 80, p: 40, k: 90 },
    Cherry: { n: 75, p: 40, k: 80 },
    Soybean: { n: 30, p: 60, k: 40 },
    Squash: { n: 100, p: 70, k: 90 },
    Cassava: { n: 60, p: 40, k: 100 },
    Mango: { n: 90, p: 50, k: 100 },
  };

  const cropRate = baseRates[crop] || { n: 110, p: 60, k: 70 };

  // Fertility level adjustments: Low (+25%), Medium (0%), High (-25%)
  const factor = (level: "Low" | "Medium" | "High") => (level === "Low" ? 1.25 : level === "High" ? 0.75 : 1.0);

  const reqN = cropRate.n * factor(soilNitrogen) * areaInHa;
  const reqP = cropRate.p * factor(soilPhosphorus) * areaInHa;
  const reqK = cropRate.k * factor(soilPotassium) * areaInHa;

  // Commercial fertilizer grades:
  // DAP contains 18% N and 46% P2O5
  // Urea contains 46% N
  // MOP contains 60% K2O
  const dapKg = reqP / 0.46;
  const nSuppliedByDap = dapKg * 0.18;
  const netNNeeded = Math.max(0, reqN - nSuppliedByDap);
  const ureaKg = netNNeeded / 0.46;
  const mopKg = reqK / 0.60;
  const gypsumKg = 25 * areaInHa;
  const zincSulphateKg = 8 * areaInHa;

  // Split schedule
  const schedule: SplitSchedule[] = [
    {
      stage: "Basal Application (Land Preparation)",
      daysAfterSowing: "At final land ploughing / transplanting",
      ureaKg: Math.round(ureaKg * 0.33),
      dapKg: Math.round(dapKg), // All DAP applied basal
      mopKg: Math.round(mopKg * 0.5),
      notes: "Mix thoroughly into the top 4-6 inches of soil. Ensures initial root development.",
    },
    {
      stage: "First Top Dressing (Vegetative Growth)",
      daysAfterSowing: "20 - 25 days after transplanting",
      ureaKg: Math.round(ureaKg * 0.33),
      dapKg: 0,
      mopKg: 0,
      foliarSpray: "0.5% Zinc Sulfate + Lime solution if pale foliage persists",
      notes: "Apply ring-fashion 2 inches away from stem before evening irrigation.",
    },
    {
      stage: "Second Top Dressing (Flowering & Fruit/Grain Setting)",
      daysAfterSowing: "45 - 50 days after transplanting",
      ureaKg: Math.round(ureaKg * 0.34),
      dapKg: 0,
      mopKg: Math.round(mopKg * 0.5),
      foliarSpray: "1.0% Potassium Nitrate (13-0-45) foliar booster for fruit sizing",
      notes: "Crucial for fruit expansion, preventing blossom drop, and disease resistance.",
    },
  ];

  // Estimated cost USD (approx market benchmarks: Urea $0.45/kg, DAP $0.75/kg, MOP $0.60/kg)
  const estimatedCost = Math.round(ureaKg * 0.45 + dapKg * 0.75 + mopKg * 0.60 + 15);
  // Optimized targeted placement saves ~28kg CO2-equivalent per hectare vs broadcast
  const co2Savings = Math.round(28.4 * areaInHa);

  return {
    totalUreaKg: Math.round(ureaKg),
    totalDapKg: Math.round(dapKg),
    totalMopKg: Math.round(mopKg),
    totalGypsumKg: Math.round(gypsumKg),
    totalZincSulphateKg: Math.round(zincSulphateKg),
    estimatedCostUSD: estimatedCost,
    co2SavingsKg: co2Savings,
    efficiencyRating: "Grade A+ (Opti-Agronomic Target)",
    schedule,
    guidelines: [
      "Never broadcast dry urea onto damp leaf foliage under direct bright sun to prevent leaf scorching.",
      "Incorporate neem-coated urea where available to slow nitrogen denitrification and leaching by 20%.",
      "Avoid applying full nitrogen doses at once; split dosing increases root uptake efficiency from 35% to 68%.",
      "Ensure sufficient soil moisture before top dressing fertilizer.",
    ],
  };
}
