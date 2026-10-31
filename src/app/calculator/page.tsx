"use client";

import React from "react";
import { useFertilizerCalc } from "@/hooks/useFertilizerCalc";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { AreaUnit, SoilFertilityLevel } from "@/types/calculator";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calculator,
  Leaf,
  Calendar,
  Sparkles,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function FertilizerCalculatorPage() {
  const { isBangla } = useLanguage();
  const {
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
    result,
  } = useFertilizerCalc();

  const cropOptions = [
    { id: "Tomato", en: "Tomato (High N-K demand)", bn: "টমেটো (উচ্চ নাইট্রোজেন ও পটাশ চাহিদা)" },
    { id: "Potato", en: "Potato (Heavy feeder)", bn: "আলু (ভারী পুষ্টিগ্রাহী ফসল)" },
    { id: "Corn (Maize)", en: "Corn / Maize (Cereal)", bn: "ভুট্টা / খরিফ ভুট্টা" },
    { id: "Bell Pepper", en: "Bell Pepper", bn: "মরিচ / ক্যাপসিকাম" },
    { id: "Rice", en: "Rice (Paddy)", bn: "ধান (বোরো / আমন ধান)" },
    { id: "Wheat", en: "Wheat", bn: "গম" },
    { id: "Apple", en: "Apple Orchard", bn: "আপেল বাগান" },
    { id: "Grape", en: "Grape Vineyard", bn: "আঙ্গুর বাগান" },
    { id: "Strawberry", en: "Strawberry", bn: "স্ট্রবেরি" },
    { id: "Peach", en: "Peach", bn: "পীচ" },
    { id: "Cherry", en: "Cherry", bn: "চেরি" },
    { id: "Soybean", en: "Soybean (Legume N-fixer)", bn: "সয়াবিন (ডাল জাতীয়)" },
    { id: "Squash", en: "Squash / Cucurbits", bn: "মিষ্টি কুমড়া / স্কোয়াশ" },
    { id: "Cassava", en: "Cassava (Root tuber)", bn: "কাসাভা" },
    { id: "Mango", en: "Mango", bn: "আম বাগান" },
  ];

  const unitOptions: { id: AreaUnit; en: string; bn: string }[] = [
    { id: "Acres", en: "Acres", bn: "একর" },
    { id: "Hectares", en: "Hectares (ha)", bn: "হেক্টর (ha)" },
    { id: "Bigha", en: "Bigha (Standard)", bn: "বিঘা (স্ট্যান্ডার্ড)" },
    { id: "Decimals", en: "Decimals / শতক", bn: "শতাংশ / শতক" },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <Badge variant="success" size="md">
          <Calculator className="h-3.5 w-3.5" />
          {isBangla ? "কৃষি ইনপুট প্রিসিশন" : "Agronomic Input Precision"}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isBangla ? "ইউরিয়া ও এন-পি-কে সার মাত্রা ক্যালকুলেটর" : "Urea & N-P-K Fertilizer Dosage Calculator"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {isBangla
            ? "সঠিক মাত্রায় সুষম সার প্রয়োগ করে মাটির স্বাস্থ্য রক্ষা করুন ও সর্বোচ্চ ফলন নিশ্চিত করুন।"
            : "Optimize crop nutrition, prevent nitrogen leaching, and maximize harvest yield with scientific split-dosage scheduling."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Parameters Form (5 columns) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isBangla ? "জমি ও মাটির তথ্য" : "Field & Soil Parameters"}
            </h2>
            <p className="text-xs text-slate-500">
              {isBangla
                ? "জমির আয়তন এবং মাটির উর্বরতার মাত্রা নির্বাচন করুন:"
                : "Enter your field dimensions and laboratory soil test levels:"}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Crop Selection */}
            <div>
              <label htmlFor="calcCrop" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {isBangla ? "উদ্দিষ্ট ফসল:" : "Target Crop:"}
              </label>
              <select
                id="calcCrop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {cropOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isBangla ? c.bn : c.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Field Size & Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="fieldSize" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isBangla ? "জমির আয়তন:" : "Field Area:"}
                </label>
                <input
                  id="fieldSize"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={fieldArea}
                  onChange={(e) => setFieldArea(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="areaUnit" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isBangla ? "একক:" : "Unit:"}
                </label>
                <select
                  id="areaUnit"
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-agri-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {unitOptions.map((u) => (
                    <option key={u.id} value={u.id}>
                      {isBangla ? u.bn : u.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Soil Test N-P-K Levels */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                {isBangla ? "মাটির উর্বরতা মাত্রা (ল্যাব টেস্ট):" : "Soil Test Levels (Available Nutrients):"}
              </span>

              {/* Nitrogen */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {isBangla ? "মাটির নাইট্রোজেন (N):" : "Soil Nitrogen (N):"}
                  </span>
                  <span className="font-bold text-agri-600">
                    {isBangla ? (soilNitrogen === "Low" ? "কম" : soilNitrogen === "High" ? "বেশি" : "মাঝারি") : soilNitrogen}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["Low", "Medium", "High"] as SoilFertilityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSoilNitrogen(lvl)}
                      className={`rounded-xl py-1.5 text-xs font-semibold border transition-all ${
                        soilNitrogen === lvl
                          ? "border-agri-500 bg-agri-50 text-agri-700 dark:bg-agri-950 dark:text-agri-300"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {isBangla ? (lvl === "Low" ? "কম" : lvl === "High" ? "বেশি" : "মাঝারি") : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phosphorus */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {isBangla ? "মাটির ফসফরাস (P):" : "Soil Phosphorus (P):"}
                  </span>
                  <span className="font-bold text-agri-600">
                    {isBangla ? (soilPhosphorus === "Low" ? "কম" : soilPhosphorus === "High" ? "বেশি" : "মাঝারি") : soilPhosphorus}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["Low", "Medium", "High"] as SoilFertilityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSoilPhosphorus(lvl)}
                      className={`rounded-xl py-1.5 text-xs font-semibold border transition-all ${
                        soilPhosphorus === lvl
                          ? "border-agri-500 bg-agri-50 text-agri-700 dark:bg-agri-950 dark:text-agri-300"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {isBangla ? (lvl === "Low" ? "কম" : lvl === "High" ? "বেশি" : "মাঝারি") : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Potassium */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {isBangla ? "মাটির পটাশিয়াম (K):" : "Soil Potassium (K):"}
                  </span>
                  <span className="font-bold text-agri-600">
                    {isBangla ? (soilPotassium === "Low" ? "কম" : soilPotassium === "High" ? "বেশি" : "মাঝারি") : soilPotassium}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["Low", "Medium", "High"] as SoilFertilityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSoilPotassium(lvl)}
                      className={`rounded-xl py-1.5 text-xs font-semibold border transition-all ${
                        soilPotassium === lvl
                          ? "border-agri-500 bg-agri-50 text-agri-700 dark:bg-agri-950 dark:text-agri-300"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {isBangla ? (lvl === "Low" ? "কম" : lvl === "High" ? "বেশি" : "মাঝারি") : lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Output Schedule (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Totals Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-agri-200 bg-agri-50/60 p-4 dark:border-agri-900/40 dark:bg-agri-950/20 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-agri-800 dark:text-agri-300">
                {isBangla ? "মোট ইউরিয়া (৪৬% N)" : "Total Urea (46% N)"}
              </span>
              <p className="text-2xl font-extrabold text-agri-700 dark:text-agri-400 mt-1 font-mono">
                {result.totalUreaKg} <span className="text-xs font-medium">{isBangla ? "কেজি" : "kg"}</span>
              </p>
              <p className="text-[10px] text-agri-600/80 mt-0.5">
                {isBangla ? "৩টি কিস্তিতে প্রয়োগ করুন" : "Applied in 3 split doses"}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                {isBangla ? "মোট ডিএপি (১৮-৪৬-০)" : "Total DAP (18-46-0)"}
              </span>
              <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mt-1 font-mono">
                {result.totalDapKg} <span className="text-xs font-medium">{isBangla ? "কেজি" : "kg"}</span>
              </p>
              <p className="text-[10px] text-blue-600/80 mt-0.5">
                {isBangla ? "১০০% জমি তৈরির সময়" : "100% Basal at planting"}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {isBangla ? "মোট এমওপি (৬০% K2O)" : "Total MOP (60% K2O)"}
              </span>
              <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 mt-1 font-mono">
                {result.totalMopKg} <span className="text-xs font-medium">{isBangla ? "কেজি" : "kg"}</span>
              </p>
              <p className="text-[10px] text-amber-600/80 mt-0.5">
                {isBangla ? "বেসাল ও ফুল আসার সময় বিভক্ত" : "Split Basal & Flowering"}
              </p>
            </div>
          </div>

          {/* 3-Stage Application Timeline Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-agri-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isBangla ? "৩-ধাপের শস্য পুষ্টি প্রয়োগ সূচি (স্প্লিট শিডিউল)" : "3-Stage Crop Split Application Schedule"}
                </h3>
              </div>
              <Badge variant="success" size="sm">
                {isBangla ? "বারি প্রোটোকল" : result.efficiencyRating}
              </Badge>
            </div>

            <div className="space-y-4">
              {result.schedule.map((st, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {isBangla ? `ধাপ ${i + 1}: ${st.stage}` : `Stage ${i + 1}: ${st.stage}`}
                    </h4>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Clock className="h-3 w-3 text-agri-600" />
                      {st.daysAfterSowing}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs py-2 border-y border-slate-200/60 dark:border-slate-700/60 my-2">
                    <div>
                      <span className="text-slate-500">{isBangla ? "ইউরিয়া: " : "Urea: "}</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">{st.ureaKg} {isBangla ? "কেজি" : "kg"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">{isBangla ? "ডিএপি: " : "DAP: "}</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">{st.dapKg} {isBangla ? "কেজি" : "kg"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">{isBangla ? "এমওপি: " : "MOP: "}</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">{st.mopKg} {isBangla ? "কেজি" : "kg"}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {st.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Eco and Guidelines Banner */}
          <div className="rounded-2xl bg-emerald-900 p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
                {isBangla ? "পরিবেশ ও খরচ সাশ্রয়" : "Environmental & Cost Savings"}
              </p>
              <p className="text-sm text-emerald-100">
                {isBangla
                  ? <>আনুমানিক সারের খরচ: <span className="font-bold text-white font-mono">${result.estimatedCostUSD} USD</span> &bull; কার্বন নিঃসরণ হ্রাস: <span className="font-bold text-white font-mono">{result.co2SavingsKg} কেজি</span></>
                  : <>Estimated Fertilizer Budget: <span className="font-bold text-white font-mono">${result.estimatedCostUSD} USD</span> &bull; CO2 Reduced: <span className="font-bold text-white font-mono">{result.co2SavingsKg} kg</span></>}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-emerald-300" />
              <span className="text-xs font-bold text-emerald-200">
                {isBangla ? "জিরো রানঅফ টার্গেট" : "Zero Runoff Target"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
