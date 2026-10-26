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
  tier: "active_ai" | "field_roadmap";
  statusLabel: string;
  banglaStatusLabel: string;
  diseases: {
    name: string;
    banglaName: string;
    pathogen: "Fungal" | "Bacterial" | "Viral" | "Physiological" | "Pest Infestation";
    severity: "Mild" | "Moderate" | "Severe";
    symptoms: string;
  }[];
  season: string;
}

const SUPPORTED_CROPS_DATA: CropProfile[] = [
  {
    id: "rice",
    name: "Rice / Paddy",
    banglaName: "ধান",
    scientificName: "Oryza sativa",
    family: "Poaceae (ঘাস পরিবার)",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 9,
    tier: "active_ai",
    statusLabel: "Live AI Model (v1.0)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (v১.০)",
    season: "আউশ, আমন ও বোরো",
    diseases: [
      {
        name: "Rice Blast (Leaf & Neck)",
        banglaName: "ধানের ব্লাস্ট রোগ (পাতা ও নেক ব্লাস্ট)",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতায় চোখের মতো মাকু আকৃতির ছাই রঙের দাগ; শীষের গোড়ায় পচন ও সম্পূর্ণ চিটা।",
      },
      {
        name: "Bacterial Leaf Blight (BLB)",
        banglaName: "ধানের পাতাপোড়া বা ব্যাকটেরিয়াল ব্লাইট",
        pathogen: "Bacterial",
        severity: "Severe",
        symptoms: "পাতার ডগা বা কিনারা থেকে ঢেউ খেলানো হলুদ হয়ে শুকিয়ে যাওয়া (ক্রিসেক লক্ষণ)।",
      },
      {
        name: "Brown Spot",
        banglaName: "ধানের বাদামী দাগ রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতাজুড়ে তিলের দানার মতো অসংখ্য গোল বা ডিম্বাকার বাদামী দাগ।",
      },
      {
        name: "Sheath Blight",
        banglaName: "ধানের খোলপোড়া রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পানির উপরে গাছের খোলে সাপের খোলসের মতো অনিয়মিত ধূসর দাগ।",
      },
      {
        name: "Tungro Virus",
        banglaName: "ধানের টুংরো ভাইরাস রোগ",
        pathogen: "Viral",
        severity: "Severe",
        symptoms: "গাছের পাতা কমলা-হলুদ হওয়া, গাছ বেঁটে হওয়া এবং পাতা মোচড়ানো।",
      },
      {
        name: "Rice Hispa",
        banglaName: "ধানের পামরি পোকার ক্ষতি",
        pathogen: "Pest Infestation",
        severity: "Moderate",
        symptoms: "পাতার সবুজ অংশ কুরে কুরে খাওয়া, পাতায় সমান্তরাল সাদা দাগ ও পাতা খড়ের মতো শুকিয়ে যাওয়া।",
      },
      {
        name: "Leaf Scald",
        banglaName: "ধানের পাতা ঝলসানো (লিফ স্কাল্ড)",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার ডগা থেকে শুরু হয়ে বড় বড় জোড়াতালি দেওয়া কালচে জলপাই রঙের দাগ।",
      },
      {
        name: "Narrow Brown Spot",
        banglaName: "ধানের সরু বাদামী দাগ",
        pathogen: "Fungal",
        severity: "Mild",
        symptoms: "পাতার শিরা বরাবর সরু সরু ছোট বাদামী রেখা।",
      },
      {
        name: "Healthy Rice Leaf",
        banglaName: "সুস্থ ও স্বাভাবিক ধানের পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "কোনো ক্ষতচিহ্ন বা রোগের উপস্থিতি নেই; ক্লোরোফিল স্বাভাবিক ও স্বাস্থ্যকর।",
      },
    ],
  },
  {
    id: "tomato",
    name: "Tomato",
    banglaName: "টমেটো",
    scientificName: "Solanum lycopersicum",
    family: "Solanaceae (সোলানেসি)",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 10,
    tier: "active_ai",
    statusLabel: "Live AI Model (v1.0)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (v১.০)",
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
        name: "Bacterial Spot",
        banglaName: "টমেটোর ব্যাকটেরিয়াল দাগ রোগ",
        pathogen: "Bacterial",
        severity: "Moderate",
        symptoms: "পাতায় ছোট কালো জলছাপযুক্ত দাগ ও ফলের ত্বক খসখসে হওয়া।",
      },
      {
        name: "Leaf Mold",
        banglaName: "পাতার ছত্রাকজনিত ছাতা রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার ওপর হলুদ ছোপ এবং নিচে জলপাই-সবুজ ভেলভেটের মতো ছত্রাক।",
      },
      {
        name: "Septoria Leaf Spot",
        banglaName: "সেপটেরিয়া পাতার দাগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতাজুড়ে ছোট ছোট অসংখ্য বৃত্তাকার ছাই রঙের দাগ যার চারপাশে গাঢ় সীমানা থাকে।",
      },
      {
        name: "Two-spotted Spider Mite",
        banglaName: "লাল মাকড়সার আক্রমণ (স্পাইডার মাইট)",
        pathogen: "Pest Infestation",
        severity: "Moderate",
        symptoms: "পাতার নিচে সূক্ষ্ম জালের সৃষ্টি এবং পাতার ওপর হলদে সূক্ষ্ম ফুটকি দাগ।",
      },
      {
        name: "Target Spot",
        banglaName: "টমেটোর টার্গেট স্পট",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতায় গাঢ় বাদামী কেন্দ্রীভূত বলয়যুক্ত গোল গোল দাগ।",
      },
      {
        name: "Yellow Leaf Curl Virus (TYLCV)",
        banglaName: "হলুদ পাতা কুঁকড়ানো ভাইরাস",
        pathogen: "Viral",
        severity: "Severe",
        symptoms: "পাতা কুঁকড়ে চামচের মতো ওপরের দিকে বাঁকা হওয়া ও শিরা হলুদ হওয়া।",
      },
      {
        name: "Tomato Mosaic Virus (ToMV)",
        banglaName: "টমেটোর মোজাইক ভাইরাস",
        pathogen: "Viral",
        severity: "Moderate",
        symptoms: "পাতায় গাঢ় সবুজ ও হালকা হলুদের মিশ্রিত মোজাইক ছোপ ও বিকৃত পাতা।",
      },
      {
        name: "Healthy Tomato Leaf",
        banglaName: "সুস্থ ও স্বাভাবিক পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "কোনো ক্ষতচিহ্ন বা রোগলক্ষণ নেই; পত্রফলক স্বাস্থ্যকর।",
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
    totalDiseases: 3,
    tier: "active_ai",
    statusLabel: "Live AI Model (v1.0)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (v১.০)",
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
        symptoms: "পাতায় কোণাকৃতি গাঢ় বাদামী বৃত্তাকার ক্ষত ও পাতা শুকিয়ে ঝরে যাওয়া।",
      },
      {
        name: "Healthy Potato Leaf",
        banglaName: "সুস্থ আলুর গাছ",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "গাঢ় সবুজ সতেজ কান্ড ও স্বাভাবিক পাতার ফলক।",
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
    totalDiseases: 2,
    tier: "active_ai",
    statusLabel: "Live AI Model (v1.0)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (v১.০)",
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
        name: "Healthy Pepper Leaf",
        banglaName: "সুস্থ মরিচ গাছ",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সবুজ চকচকে পাতা ও স্বাস্থ্যকর গাছ।",
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
    totalDiseases: 4,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "রবি ও খরিফ",
    diseases: [
      {
        name: "Common Rust",
        banglaName: "ভুট্টার সাধারণ মরিচা রোগ",
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
        name: "Gray Leaf Spot",
        banglaName: "ভুট্টার ধূসর পাতার দাগ রোগ",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতার শিরার সমান্তরালে আয়তাকার ধূসর বাদামী ব্লক দাগ।",
      },
      {
        name: "Healthy Corn",
        banglaName: "সুস্থ ভুট্টার চারা ও গাছ",
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
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "শীতকাল (রবি)",
    diseases: [
      {
        name: "Stripe Rust (Yellow Rust)",
        banglaName: "গমের হলুদ মরিচা রোগ (স্ট্রাইপ রাস্ট)",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতার শিরা বরাবর সমান্তরাল লাইনে উজ্জ্বল হলুদ গুঁড়োর মতো মরিচার ফোস্কা।",
      },
      {
        name: "Septoria Leaf Blight",
        banglaName: "গমের সেপটেরিয়া পাতার দাগ",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতায় অনিয়মিত বাদামী দাগ যার মধ্যে অসংখ্য ছোট ছোট কালো বিন্দু (পিকনিডিয়া) থাকে।",
      },
      {
        name: "Healthy Wheat",
        banglaName: "সুস্থ গম গাছ",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সতেজ সোজা সবুজ পাতা ও স্বাভাবিক কুশি।",
      },
    ],
  },
  {
    id: "apple",
    name: "Apple",
    banglaName: "আপেল",
    scientificName: "Malus domestica",
    family: "Rosaceae (গোলাপ পরিবার)",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 4,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "শীতকালীন ও বসন্তকাল",
    diseases: [
      {
        name: "Apple Scab",
        banglaName: "আপেলের স্ক্যাব রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার ওপর জলপাই-সবুজ বা কালচে মখমলের মতো দাগ ও ফলের ত্বক ফেটে যাওয়া।",
      },
      {
        name: "Black Rot",
        banglaName: "আপেলের ব্ল্যাক রট (কালো পচন)",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতায় ব্যাঙের চোখের মতো গোল দাগ ও ফল কালো শক্ত মমিতে রূপ নেওয়া।",
      },
      {
        name: "Cedar Apple Rust",
        banglaName: "আপেলের সিডার মরিচা রোগ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতায় উজ্জ্বল হলুদ-কমলা রঙের গোল দাগ ও পাতার নিচে টিউব আকৃতির স্পোর টিউব।",
      },
      {
        name: "Healthy Apple Leaf",
        banglaName: "সুস্থ আপেল পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সতেজ উজ্জ্বল সবুজ পাতা ও সুস্থ কান্ড।",
      },
    ],
  },
  {
    id: "grape",
    name: "Grape",
    banglaName: "আঙ্গুর",
    scientificName: "Vitis vinifera",
    family: "Vitaceae (আঙ্গুর পরিবার)",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 4,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "বসন্ত ও গ্রীষ্মকাল",
    diseases: [
      {
        name: "Black Rot",
        banglaName: "আঙ্গুরের ব্ল্যাক রট বা কালো পচন",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "আঙ্গুরের ফল শুকিয়ে শক্ত কালো মমিতে পরিণত হওয়া ও পাতায় লালচে-বাদামী গোল দাগ।",
      },
      {
        name: "Esca (Black Measles)",
        banglaName: "আঙ্গুরের এসকা বা ব্ল্যাক মিজলস",
        pathogen: "Fungal",
        severity: "Severe",
        symptoms: "পাতায় বাঘের ডোরাকাটা দাগ (টাইগার স্ট্রাইপ) ও ফলে হামের মতো কালচে ফুটকি দাগ।",
      },
      {
        name: "Leaf Blight",
        banglaName: "আঙ্গুরের পাতা ঝলসানো (লিফ ব্লাইট)",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতায় কোণাকৃতি লালচে বাদামী দাগ ও পাতা শুকিয়ে ঝরে যাওয়া।",
      },
      {
        name: "Healthy Grape Leaf",
        banglaName: "সুস্থ আঙ্গুর লতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "উজ্জ্বল সবুজ সুন্দর খাঁজকাটা পাতা ও সতেজ লতা।",
      },
    ],
  },
  {
    id: "citrus",
    name: "Citrus / Orange",
    banglaName: "লেবু ও কমলা",
    scientificName: "Citrus sinensis",
    family: "Rutaceae (লেবু পরিবার)",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 1,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "সারা বছর",
    diseases: [
      {
        name: "Huanglongbing (Citrus Greening)",
        banglaName: "লেবুর গ্রিনিং বা হলুদ রোগ (এইচএলবি)",
        pathogen: "Bacterial",
        severity: "Severe",
        symptoms: "পাতায় অপ্রতিসম হলুদ ছোপ (ব্লচি মটল), ডগা শুকিয়ে যাওয়া ও ফল বিকৃত-তিতা হওয়া।",
      },
    ],
  },
  {
    id: "strawberry",
    name: "Strawberry",
    banglaName: "স্ট্রবেরি",
    scientificName: "Fragaria × ananassa",
    family: "Rosaceae (গোলাপ পরিবার)",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 2,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "শীতকাল (রবি)",
    diseases: [
      {
        name: "Leaf Scorch",
        banglaName: "স্ট্রবেরির পাতা ঝলসানো রোগ (লিফ স্কর্চ)",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতায় অসংখ্য ছোট ছোট বেগুনি দাগ একত্র হয়ে পাতা আগুনে পোড়ার মতো ঝলসে যাওয়া।",
      },
      {
        name: "Healthy Strawberry Leaf",
        banglaName: "সুস্থ স্ট্রবেরি পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "গাঢ় উজ্জ্বল সবুজ ত্রিপত্রিক পাতা ও স্বাভাবিক কান্ড।",
      },
    ],
  },
  {
    id: "peach",
    name: "Peach",
    banglaName: "পিচ",
    scientificName: "Prunus persica",
    family: "Rosaceae (গোলাপ পরিবার)",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 2,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "বসন্ত ও গ্রীষ্মকাল",
    diseases: [
      {
        name: "Bacterial Spot",
        banglaName: "পিচ ফলের ব্যাকটেরিয়াল দাগ রোগ",
        pathogen: "Bacterial",
        severity: "Moderate",
        symptoms: "পাতায় কোণাকৃতি দাগ শুকিয়ে খসে পড়া (শট-হোল ছিদ্র) ও ফলের গায়ে আঠা বের হওয়া।",
      },
      {
        name: "Healthy Peach Leaf",
        banglaName: "সুস্থ পিচ পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "বর্শার ফলার মতো লম্বাটে সতেজ সবুজ পাতা।",
      },
    ],
  },
  {
    id: "cherry",
    name: "Cherry",
    banglaName: "চেরি",
    scientificName: "Prunus avium",
    family: "Rosaceae (গোলাপ পরিবার)",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 2,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "বসন্ত ও গ্রীষ্মকাল",
    diseases: [
      {
        name: "Powdery Mildew",
        banglaName: "চেরির পাউডারি মিলডিউ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "কচি পাতা ও ফলের ওপর সাদা পাউডার বা ময়দার মতো ছত্রাকের আস্তরণ।",
      },
      {
        name: "Healthy Cherry Leaf",
        banglaName: "সুস্থ চেরি পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "সতেজ গাঢ় সবুজ পাতা ও সুস্থ শাখা।",
      },
    ],
  },
  {
    id: "squash",
    name: "Squash / Pumpkin",
    banglaName: "মিষ্টি কুমড়া ও স্কোয়াশ",
    scientificName: "Cucurbita pepo",
    family: "Cucurbitaceae (লাউ পরিবার)",
    image: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 1,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "সারা বছর",
    diseases: [
      {
        name: "Powdery Mildew",
        banglaName: "মিষ্টি কুমড়ার পাউডারি মিলডিউ",
        pathogen: "Fungal",
        severity: "Moderate",
        symptoms: "পাতার ওপর ও নিচে সাদা পাউডারের মতো গোল গোল দাগ ও পাতা কাগজের মতো শুকিয়ে যাওয়া।",
      },
    ],
  },
  {
    id: "soybean",
    name: "Soybean",
    banglaName: "সয়াবিন",
    scientificName: "Glycine max",
    family: "Fabaceae (শিম পরিবার)",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 1,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "রবি ও খরিফ",
    diseases: [
      {
        name: "Healthy Soybean Leaf",
        banglaName: "সুস্থ সয়াবিন পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "গাঢ় সবুজ ত্রিপত্রিক পাতা ও সক্রিয় নাইট্রোজেন সংবন্ধন।",
      },
    ],
  },
  {
    id: "blueberry",
    name: "Blueberry",
    banglaName: "ব্লুবেরি",
    scientificName: "Vaccinium corymbosum",
    family: "Ericaceae (হিদার পরিবার)",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 1,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "গ্রীষ্মকাল",
    diseases: [
      {
        name: "Healthy Blueberry Leaf",
        banglaName: "সুস্থ ব্লুবেরি পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "মসৃণ চকচকে চামড়ার মতো শক্ত সবুজ পাতা।",
      },
    ],
  },
  {
    id: "raspberry",
    name: "Raspberry",
    banglaName: "রাস্পবেরি",
    scientificName: "Rubus idaeus",
    family: "Rosaceae (গোলাপ পরিবার)",
    image: "https://images.unsplash.com/photo-1577069808021-5085e510842e?w=500&auto=format&fit=crop&q=80",
    totalDiseases: 1,
    tier: "active_ai",
    statusLabel: "Live AI Model (ConvNeXt)",
    banglaStatusLabel: "সক্রিয় এআই মডেল (কনভনেক্সট)",
    season: "গ্রীষ্মকাল",
    diseases: [
      {
        name: "Healthy Raspberry Leaf",
        banglaName: "সুস্থ রাস্পবেরি পাতা",
        pathogen: "Physiological",
        severity: "Mild",
        symptoms: "রুপালী লোমশ নিচের পিঠযুক্ত সতেজ যৌগিক পাতা।",
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

        {/* AI Model Scope & Agricultural Transparency Notice */}
        <div className="mb-10 rounded-3xl border-2 border-emerald-500/40 bg-emerald-50/80 p-5 sm:p-7 dark:border-emerald-800/60 dark:bg-emerald-950/40 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-emerald-200/90 dark:bg-emerald-900 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                  {isBangla ? "স্বচ্ছতা ও মডেল পরিসীমা (Model Scope)" : "Model Scope & Transparency"}
                </span>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {isBangla ? "সক্রিয় ডিপ লার্নিং ভিশন মডেল: ৫০টি ক্লাস (ConvNeXt)" : "Active Deep Vision Model: 50 Classes (ConvNeXt)"}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-emerald-950 dark:text-emerald-100">
                {isBangla
                  ? "কৃষি-দৃষ্টির কৃত্রিম বুদ্ধিমত্তা মডেল কীভাবে কাজ করে?"
                  : "How KrishiDrishti's Neural Vision Model Operates"}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
                {isBangla
                  ? "কৃষি-দৃষ্টির লাইভ ভিশন মডেলটি সম্প্রসারিত ConvNeXt ডিপ লার্নিং আর্কিটেকচারের মাধ্যমে ৫০টি প্যাথলজি ও সুস্থ পাতার ক্লাসে সরাসরি প্রশিক্ষিত। এর মধ্যে ধান, টমেটো, আলু, মরিচ, ভুট্টা ও গমসহ প্রধান প্রধান ফসল অন্তর্ভুক্ত রয়েছে। অনির্দিষ্ট বা অস্পষ্ট পাতার ছবি আপলোড করা হলে মডেলটি সতর্কতাস্বরূপ কম কনফিডেন্স ডায়াগনসিস প্রদর্শন করবে এবং স্থানীয় কৃষি কর্মকর্তা বা উপসহকারী কৃষি কর্মকর্তার (SAAO) সরাসরি পরামর্শ নিতে উৎসাহিত করবে।"
                  : "The live vision classifier utilizes an expanded ConvNeXt architecture trained across 50 targeted pathology and healthy leaf classes including Rice, Tomato, Potato, Pepper, Corn, and Wheat. Non-leaf or blurry images safely trigger low-confidence advisories directing users to certified agricultural extension officers."}
              </p>
            </div>
          </div>
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
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCrop === crop.id
                  ? "bg-agri-600 text-white shadow-md shadow-agri-600/30"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${crop.tier === "active_ai" ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span>{isBangla ? crop.banglaName : crop.name}</span>
            </button>
          ))}
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className={`flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition-all dark:bg-slate-900 ${
                crop.tier === "active_ai"
                  ? "border-emerald-500/30 hover:border-emerald-500/60"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <div>
                {/* Crop Image & Title */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                    <span className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                      crop.tier === "active_ai"
                        ? "bg-emerald-600/90 text-white shadow-md shadow-emerald-600/30"
                        : "bg-amber-600/90 text-white shadow-md shadow-amber-600/30"
                    }`}>
                      {isBangla ? crop.banglaStatusLabel : crop.statusLabel}
                    </span>
                    <span className="rounded-lg bg-black/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white">
                      {crop.diseases.length} {isBangla ? "টি রোগ ক্লাস" : "Disease Classes"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {crop.banglaName} ({crop.name})
                  </h3>
                  <Badge variant={crop.tier === "active_ai" ? "success" : "outline"} size="sm">
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
                                : d.pathogen === "Pest Infestation"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"
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
                {crop.tier === "active_ai" ? (
                  <Link href={`/scan?crop=${encodeURIComponent(crop.name)}`}>
                    <Button variant="primary" size="sm" className="w-full justify-center">
                      <Scan className="h-4 w-4 mr-1.5" />
                      {isBangla ? `${crop.banglaName} পাতার স্ক্যান শুরু করুন` : `Scan ${crop.name} Leaf`}
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/chat?prompt=${encodeURIComponent(`আমাকে ${crop.banglaName} ফসলের রোগ ও প্রতিকার সম্পর্কে বিস্তারিত জানান`)}`}>
                    <Button variant="outline" size="sm" className="w-full justify-center border-amber-300 text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-200">
                      <Info className="h-4 w-4 mr-1.5" />
                      {isBangla ? `${crop.banglaName} রোগ নির্দেশিকা দেখুন (v2.0)` : `${crop.name} Field Guide (v2.0)`}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
