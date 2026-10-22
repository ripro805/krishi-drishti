import { prisma } from "../../config/db.js";
import { FertilizerCalculationInput } from "./calculator.validation.js";
import { Prisma } from "@prisma/client";

export interface SplitSchedule {
  stage: string;
  daysAfterSowing: string;
  ureaKg: number;
  dapKg: number;
  mopKg: number;
  notes: string;
}

export interface FertilizerCalculationResult {
  crop: string;
  fieldArea: number;
  areaUnit: string;
  totalUreaKg: number;
  totalDapKg: number;
  totalMopKg: number;
  totalGypsumKg: number;
  totalZincSulphateKg: number;
  bagsUrea50kg: number;
  bagsDap50kg: number;
  bagsMop50kg: number;
  splitSchedule: SplitSchedule[];
  guidelines: string[];
}

export class CalculatorService {
  static async calculateFertilizer(
    input: FertilizerCalculationInput,
    userId?: string
  ): Promise<FertilizerCalculationResult> {
    const { crop, fieldArea, areaUnit, soilNitrogen, soilPhosphorus, soilPotassium } = input;

    // Convert area to Hectares for base agronomic formulas
    // 1 Hectare = 2.471 Acres = 7.47 Bigha = 247.1 Decimals
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
    };

    const cropRate = baseRates[crop] || { n: 110, p: 60, k: 70 };

    // Fertility level adjustments: Low (+25%), Medium (0%), High (-25%)
    const factor = (level: "Low" | "Medium" | "High") =>
      level === "Low" ? 1.25 : level === "High" ? 0.75 : 1.0;

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
    const mopKg = reqK / 0.6;
    const gypsumKg = 25 * areaInHa;
    const zincSulphateKg = 8 * areaInHa;

    const splitSchedule: SplitSchedule[] = [
      {
        stage: "Basal Application (Land Preparation)",
        daysAfterSowing: "At final land ploughing / transplanting",
        ureaKg: Math.round(ureaKg * 0.33),
        dapKg: Math.round(dapKg),
        mopKg: Math.round(mopKg * 0.5),
        notes: "Mix thoroughly into the top 4-6 inches of soil. Ensures initial root development.",
      },
      {
        stage: "Vegetative Growth (First Top-Dress)",
        daysAfterSowing: "20-25 days after transplanting (DAT)",
        ureaKg: Math.round(ureaKg * 0.33),
        dapKg: 0,
        mopKg: 0,
        notes: "Apply during morning soil moisture. Side-dress 2 inches away from plant stems.",
      },
      {
        stage: "Flowering & Fruit Setting (Second Top-Dress)",
        daysAfterSowing: "45-50 days after transplanting (DAT)",
        ureaKg: Math.round(ureaKg * 0.34),
        dapKg: 0,
        mopKg: Math.round(mopKg * 0.5),
        notes: "Crucial for fruit sizing and sugar translocation. Irrigate immediately after spreading.",
      },
    ];

    const result: FertilizerCalculationResult = {
      crop,
      fieldArea,
      areaUnit,
      totalUreaKg: Math.round(ureaKg * 10) / 10,
      totalDapKg: Math.round(dapKg * 10) / 10,
      totalMopKg: Math.round(mopKg * 10) / 10,
      totalGypsumKg: Math.round(gypsumKg * 10) / 10,
      totalZincSulphateKg: Math.round(zincSulphateKg * 10) / 10,
      bagsUrea50kg: Math.ceil(ureaKg / 50),
      bagsDap50kg: Math.ceil(dapKg / 50),
      bagsMop50kg: Math.ceil(mopKg / 50),
      splitSchedule,
      guidelines: [
        "Never apply fertilizer on dry soil. Ensure adequate soil moisture before top-dressing.",
        "Split application of Urea prevents nitrogen volatilization and groundwater nitrate leaching.",
        "Combine chemical applications with 5-10 tons/ha well-decomposed organic manure or vermicompost.",
      ],
    };

    // Save calculation log if user or system wishes
    if (userId) {
      await prisma.fertilizerCalculation
        .create({
          data: {
            userId,
            crop,
            fieldArea,
            areaUnit,
            soilNitrogen,
            soilPhosphorus,
            soilPotassium,
            ureaKg: result.totalUreaKg,
            dapKg: result.totalDapKg,
            mopKg: result.totalMopKg,
            gypsumKg: result.totalGypsumKg,
            zincSulphateKg: result.totalZincSulphateKg,
            schedule: result.splitSchedule as unknown as Prisma.InputJsonValue,
          },
        })
        .catch(() => {
          // Non-blocking log persistence
        });
    }

    return result;
  }
}
