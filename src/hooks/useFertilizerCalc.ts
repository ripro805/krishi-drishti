"use client";

import { useState, useMemo } from "react";
import { FertilizerInput, AreaUnit, SoilFertilityLevel, FertilizerCalculationResult } from "@/types/calculator";
import { calculateFertilizer } from "@/lib/fertilizerEngine";

export function useFertilizerCalc() {
  const [crop, setCrop] = useState<string>("Tomato");
  const [fieldArea, setFieldArea] = useState<number>(1.5);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("Acres");
  const [soilNitrogen, setSoilNitrogen] = useState<SoilFertilityLevel>("Medium");
  const [soilPhosphorus, setSoilPhosphorus] = useState<SoilFertilityLevel>("Medium");
  const [soilPotassium, setSoilPotassium] = useState<SoilFertilityLevel>("Medium");
  const [targetYieldTonsPerHa, setTargetYieldTonsPerHa] = useState<number>(45);

  const result: FertilizerCalculationResult = useMemo(() => {
    return calculateFertilizer({
      crop,
      fieldArea: Math.max(0.1, Number(fieldArea) || 1),
      areaUnit,
      soilNitrogen,
      soilPhosphorus,
      soilPotassium,
      targetYieldTonsPerHa,
    });
  }, [crop, fieldArea, areaUnit, soilNitrogen, soilPhosphorus, soilPotassium, targetYieldTonsPerHa]);

  return {
    crop,
    setCrop,
    fieldArea,
    setFieldArea,
    areaUnit,
    setAreaUnit,
    soilNitrogen,
    setSoilNitrogen,
    soilPhosphorus,
    setSoilPhosphorus,
    soilPotassium,
    setSoilPotassium,
    targetYieldTonsPerHa,
    setTargetYieldTonsPerHa,
    result,
  };
}
