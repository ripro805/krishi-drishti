"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Scan,
  AlertTriangle,
  ArrowRight,
  Info,
  Layers,
} from "lucide-react";

interface CropProfile {
  id: string;
  name: string;
  banglaName: string;
  scientificName: string;
  image: string;
  family: string;
  totalDiseases: number;
  diseases: {
    name: string;
    banglaName: string;
    pathogen: "Fungal" | "Bacterial" | "Viral" | "Physiological";
    severity: "Mild" | "Moderate" | "Severe";
    symptoms: string;
  }[];
  season: string;
}

const SUPPORTED_CROPS_DATA: CropProfile[] = [
  {
    id: "tomato",
    name: "Tomato",
    banglaName: "টমেটো",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae (সোলানেসি)",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 5,
    season: "শীতকালীন ও গ্রীষ্মকালীন",
    diseases: [
      {
        name: "Early Blight",
        banglaName: "টমেটোর আগাম ধসা রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "বয়স্ক পাতায় চক্রাকার বলয়যুক্ত বাদামী দাগ (টার্গেট বোর্ড)।",
      },
      {
        name: "Late Blight",
        banglaName: "টমেটোর নাবী ধসা রোগ",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "কুয়াশাচ্ছন্ন আবহাওয়ায় পাতায় কালচে ভেজা ক্ষত ও পাতার নিচে সাদা ছত্রাক।",
      },
      {
        name: "Leaf Mold",
        banglaName: "পাতার ছত্রাকজনিত ছাতা রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার ওপর হলুদ ছোপ এবং নিচে জলপাই-সবুজ ভেলভেটের মতো ছত্রাক।",
      },
      {
        name: "Bacterial Spot",
        banglaName: "টমেটোর ব্যাকটেরিয়াল দাগ রোগ",
        pathogen: "Bacterial",
        severity: "Moderate",
        symptoms: "পাতায় ছোট কালো জলছাপযুক্ত দাগ ও ফলের ত্বক খসখসে হওয়া।",
      },
      {
        name: "Healthy Leaf (Control)",
        banglaName: "সুস্থ ও স্বাভাবিক পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "কোনো ক্ষতচিহ্ন বা রোগের উপস্থিতি নেই; ক্লোরোফিল স্বাভাবিক।",
      },
    ],
  },
  {
    id: "potato",
    name: "Potato",
    banglaName: "আলু",
    scientificName: "Solanum tuberosum",
    family: "Solanaceae (সোলানেসি)",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 4,
    season: "রবি মৌসুম (শীতকাল)",
    diseases: [
      {
        name: "Late Blight",
        banglaName: "আলুর নাবী ধসা (লেট ব্লাইট)",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতার ডগায় ভেজা কালচে দাগ, সকালে পাতার নিচে সাদা ছত্রাকের গুঁড়ো, গাছ ঝলসে পচে যাওয়া।",
      },
      {
        name: "Early Blight",
        banglaName: "আলুর আগাম ধসা",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতায় কোণাকৃতি গাঢ় বাদামী বৃত্তাকার ক্ষত।",
      },
      {
        name: "Potato Virus Y (PVY)",
        banglaName: "আলুর মোজাইক ভাইরাস",
        pathogen: "Viral",
        severity: "Moderate",
        symptoms: "পাতা কুঁকড়ে যাওয়া এবং শিরা বরাবর শিরা হলুদ ও খসখসে হওয়া।",
      },
      {
        name: "Healthy Potato",
        banglaName: "সুস্থ আলুর গাছ",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "গাঢ় সবুজ সতেজ কান্ড ও পাতার ফলক।",
      },
    ],
  },
  {
    id: "rice",
    name: "Rice / Paddy",
    banglaName: "ধান",
    scientificName: "Oryza sativa",
    family: "Poaceae (ঘাস পরিবার)",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 4,
    season: "আউশ, আমন ও বোরো",
    diseases: [
      {
        name: "Rice Blast",
        banglaName: "ধানের ব্লাস্ট রোগ (পাতা ও নেক ব্লাস্ট)",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতায় চোখের মতো মাকু আকৃতির ছাই রঙের দাগ; শীষের গোড়ায় পচন ও সম্পূর্ণ চিটা।",
      },
      {
        name: "Brown Spot",
        banglaName: "ধানের বাদামী দাগ রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতাজুড়ে তিলের দানার মতো অসংখ্য গোল বা ডিম্বাকার বাদামী দাগ।",
      },
      {
        name: "Bacterial Leaf Blight (BLB)",
        banglaName: "ধানের পাতাপোড়া বা ব্যাকটেরিয়াল ব্লাইট",
        pathogen: "Bacterial",
        severity: "Severe",
        symptoms: "পাতার ডগা বা কিনারা থেকে ঢেউ খেলানো হলুদ হয়ে শুকিয়ে যাওয়া (ক্রিসেক লক্ষণ)।",
      },
      {
        name: "Sheath Blight",
        banglaName: "খোলপোড়া রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পানির উপরে গাছের খোলে সাপের খোলসের মতো অনিয়মিত ধূসর দাগ।",
      },
    ],
  },
  {
    id: "pepper",
    name: "Chili / Bell Pepper",
    banglaName: "মরিচ",
    scientificName: "Capsicum annuum",
    family: "Solanaceae (সোলানেসি)",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 3,
    season: "সারা বছর",
    diseases: [
      {
        name: "Bacterial Spot",
        banglaName: "মরিচের ব্যাকটেরিয়াল দাগ",
        pathogen: "Bacterial",
        severity: "Moderate",
        symptoms: "পাতায় ছোট ছোট জলছাপ ও ক্ষত, তীব্র আক্রমণে দ্রুত পাতা ঝরে গাছ ন্যাড়া হয়ে যায়।",
      },
      {
        name: "Anthracnose / Fruit Rot",
        banglaName: "মরিচের অ্যানথ্রাকনোজ বা ফলপচা রোগ",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "কাঁচা ও পাকা মরিচে কালো দাগ এবং ভেতরে দেবে যাওয়া কুঁচকানো ক্ষত।",
      },
      {
        name: "Healthy Pepper",
        banglaName: "সুস্থ মরিচ গাছ",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সবুজ চকচকে পাতা ও স্বাস্থ্যকর ফুল-ফল।",
      },
    ],
  },
  {
    id: "corn",
    name: "Corn / Maize",
    banglaName: "ভুট্টা",
    scientificName: "Zea mays",
    family: "Poaceae (ঘাস পরিবার)",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 3,
    season: "রবি ও খরিফ",
    diseases: [
      {
        name: "Common Rust",
        banglaName: "ভুট্টার মরিচা রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার উভয় পিঠে ইটের রঙের বা মরিচার মতো গুঁড়োযুক্ত ফোস্কা।",
      },
      {
        name: "Northern Corn Leaf Blight",
        banglaName: "ভুট্টার উত্তরাঞ্চলীয় পাতাধসা",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতায় লম্বা সিগার আকৃতির বড় ধূসর ক্ষতচিহ্ন।",
      },
      {
        name: "Healthy Corn",
        banglaName: "সুস্থ ভুট্টার চারা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সোজা খাড়া পাতা ও গাঢ় সবুজ ফলক।",
      },
    ],
  },
  {
    id: "wheat",
    name: "Wheat",
    banglaName: "গম",
    scientificName: "Triticum aestivum",
    family: "Poaceae (ঘাস পরিবার)",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 3,
    season: "শীতকাল (রবি)",
    diseases: [
      {
        name: "Leaf Rust",
        banglaName: "গমের পাতার মরিচা রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার ওপর ছোট কমলা-হলুদ রঙের পাউডারের মতো গুঁড়ো ফোসকা।",
      },
      {
        name: "Wheat Blast",
        banglaName: "গমের ব্লাস্ট রোগ",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "শীষের গোড়ায় কালো পচন এবং শীষের উপরিভাগ সম্পূর্ণ সাদা হয়ে দানা না হওয়া।",
      },
      {
        name: "Healthy Wheat",
        banglaName: "সুস্থ গম গাছ",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সতেজ পাতা ও স্বাভাবিক কুশি।",
      },
    ],
  },
];

export default function SupportedCropsPage() {
  const { isBangla } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>("all");

  const filteredCrops =
    selectedCrop === "all"
      ? SUPPORTED_CROPS_DATA
      : SUPPORTED_CROPS_DATA.filter((c) => c.id === selectedCrop);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="success" size="md">
            <Layers className="h-3.5 w-3.5" />
            {isBangla ? "সমর্থিত ফসল ও রোগ তালিকা" : "Supported Crop & Disease Database"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isBangla
              ? "কৃষি দৃষ্টি যেসব ফসল ও রোগ শনাক্ত করতে সক্ষম"
              : "Crops & Diseases Covered by KrishiDrishti"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isBangla
              ? "আমাদের কৃত্রিম বুদ্ধিমত্তা মডেলটি বাংলাদেশের প্রধান কৃষি ফসল এবং তাদের সাধারণ ধ্বংসাত্মক রোগগুলোর ক্লিনিক্যাল লক্ষণের ওপর বিশেষভাবে প্রশিক্ষিত।"
              : "Our deep neural networks are trained on multi-spectral leaf pathology datasets to identify key fungal, bacterial, viral, and physiological conditions."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedCrop("all")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              selectedCrop === "all"
                ? "bg-agri-600 text-white shadow-md shadow-agri-600/30"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {isBangla ? "সকল ফসল (All Crops)" : "All Crops"}
          </button>
          {SUPPORTED_CROPS_DATA.map((crop) => (
            <button
              key={crop.id}
              type="button"
              onClick={() => setSelectedCrop(crop.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedCrop === crop.id
                  ? "bg-agri-600 text-white shadow-md shadow-agri-600/30"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBangla ? crop.banglaName : crop.name}
            </button>
          ))}
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                {/* Crop Image & Title */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white">
                      {crop.diseases.length} {isBangla ? "টি রোগ ক্লাস" : "Disease Classes"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {crop.banglaName} ({crop.name})
                  </h3>
                  <Badge variant="outline" size="sm">
                    {crop.season}
                  </Badge>
                </div>
                <p className="text-xs italic font-mono text-slate-500 mb-4">
                  {crop.scientificName} • {crop.family}
                </p>

                {/* Disease Classes Sub-list */}
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {isBangla ? "শনাক্তযোগ্য রোগসমূহ:" : "Recognized Pathogens:"}
                  </p>
                  <ul className="space-y-2 text-xs">
                    {crop.diseases.map((d, i) => (
                      <li
                        key={i}
                        className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {d.banglaName}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              d.pathogen === "Fungal"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : d.pathogen === "Bacterial"
                                ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                : d.pathogen === "Viral"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            }`}
                          >
                            {d.pathogen}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                          {d.symptoms}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link href={`/scan?crop=${encodeURIComponent(crop.name)}`}>
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    <Scan className="h-4 w-4 mr-1.5" />
                    {isBangla ? `${crop.banglaName} পাতার স্ক্যান শুরু করুন` : `Scan ${crop.name} Leaf`}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
