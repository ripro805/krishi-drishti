"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { apiClient } from "@/lib/apiClient";
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  Database,
  Calculator,
  Search,
  Filter,
  Eye,
  Sparkles,
  ShieldAlert,
  FileText,
  BadgeCheck,
  ChevronRight,
  RefreshCw,
  Droplet,
  Layers,
  ArrowLeft,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

interface EscalatedScan {
  id: string;
  scanCode: string;
  crop: string;
  banglaCrop: string;
  disease: string;
  banglaName: string;
  confidence: number;
  severity: "Healthy" | "Mild" | "Moderate" | "Severe";
  imageUrl: string;
  status: "Active" | "Treated" | "Monitoring";
  isLowConfidence: boolean;
  createdAt: string;
  metadata?: {
    expertConsultation?: {
      expertName: string;
      notes: string;
      prescription?: string;
      verifiedDisease?: string;
      reviewedAt: string;
    };
  };
}

interface FeedbackItem {
  id: string;
  scanId: string;
  crop: string;
  disease: string;
  banglaDisease?: string;
  confidence: number;
  rating: "accurate" | "inaccurate" | "unsure";
  comment?: string;
  userName?: string;
  status: "new" | "reviewed" | "flagged";
  createdAt: string;
}

interface DiseaseItem {
  id: string;
  crop: string;
  banglaCrop?: string;
  commonName: string;
  banglaName?: string;
  pathogenType: string;
  severity: string;
  summary: string;
  banglaSummary?: string;
  symptoms: string[];
  banglaSymptoms?: string[];
  organicTreatment?: string[];
  chemicalTreatment?: string[];
}

export default function ExpertPortalPage() {
  const { currentUser, isExpert, isAdmin, demoLogin } = useAuth();
  const { isBangla } = useLanguage();

  const [activeTab, setActiveTab] = useState<"escalated" | "feedback" | "diseases" | "dosage">("escalated");

  // Escalated Scans state
  const [escalatedScans, setEscalatedScans] = useState<EscalatedScan[]>([]);
  const [loadingScans, setLoadingScans] = useState(false);
  const [selectedScan, setSelectedScan] = useState<EscalatedScan | null>(null);
  const [advisoryNote, setAdvisoryNote] = useState("");
  const [prescriptionNote, setPrescriptionNote] = useState("");
  const [verifiedDiseaseInput, setVerifiedDiseaseInput] = useState("");
  const [consultationStatus, setConsultationStatus] = useState<"Active" | "Treated" | "Monitoring">("Active");
  const [isSubmittingAdvisory, setIsSubmittingAdvisory] = useState(false);
  const [advisorySuccess, setAdvisorySuccess] = useState<string | null>(null);

  // Feedback state
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [feedbackFilter, setFeedbackFilter] = useState<"all" | "accurate" | "inaccurate" | "unsure">("all");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // Diseases state
  const [diseases, setDiseases] = useState<DiseaseItem[]>([]);
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<DiseaseItem | null>(null);
  const [loadingDiseases, setLoadingDiseases] = useState(false);

  // Dosage calculator state
  const [calcChemical, setCalcChemical] = useState("mancozeb");
  const [calcArea, setCalcArea] = useState(33); // 33 decimals = 1 bigha
  const [calcWater, setCalcWater] = useState(10); // liters

  // Load data
  useEffect(() => {
    loadEscalatedScans();
    loadFeedback();
    loadDiseases();
  }, []);

  const loadEscalatedScans = async () => {
    setLoadingScans(true);
    try {
      const res = await apiClient.expert.getEscalatedScans();
      if (res && res.scans) {
        setEscalatedScans(res.scans);
      }
    } catch (err) {
      console.warn("Failed to load escalated scans:", err);
    } finally {
      setLoadingScans(false);
    }
  };

  const loadFeedback = async () => {
    setLoadingFeedback(true);
    try {
      const res = await apiClient.feedback.getList();
      if (res && res.feedbackList) {
        setFeedbackList(res.feedbackList);
      }
    } catch (err) {
      console.warn("Failed to load feedback:", err);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const loadDiseases = async () => {
    setLoadingDiseases(true);
    try {
      const res = await apiClient.diseases.getAll();
      if (res && res.diseases) {
        setDiseases(res.diseases);
      }
    } catch (err) {
      console.warn("Failed to load diseases:", err);
    } finally {
      setLoadingDiseases(false);
    }
  };

  const handleOpenAdvisoryModal = (scan: EscalatedScan) => {
    setSelectedScan(scan);
    setAdvisoryNote(scan.metadata?.expertConsultation?.notes || "");
    setPrescriptionNote(scan.metadata?.expertConsultation?.prescription || "");
    setVerifiedDiseaseInput(scan.metadata?.expertConsultation?.verifiedDisease || scan.banglaName || scan.disease);
    setConsultationStatus(scan.status);
    setAdvisorySuccess(null);
  };

  const handleSubmitAdvisory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScan) return;

    setIsSubmittingAdvisory(true);
    try {
      const res = await apiClient.expert.submitConsultation(selectedScan.id, {
        expertName: currentUser?.name || "Nasrin Akhter (কৃষি কর্মকর্তা)",
        notes: advisoryNote,
        prescription: prescriptionNote,
        verifiedDisease: verifiedDiseaseInput,
        status: consultationStatus,
      });

      if (res && res.scan) {
        setAdvisorySuccess(isBangla ? "পরামর্শ ও প্রেসক্রিপশন সফলভাবে সংরক্ষিত হয়েছে!" : "Advisory saved successfully!");
        setEscalatedScans((prev) =>
          prev.map((s) => (s.id === selectedScan.id ? { ...s, ...res.scan } : s))
        );
        setTimeout(() => {
          setSelectedScan(null);
          setAdvisorySuccess(null);
        }, 1200);
      }
    } catch (err: any) {
      alert("Failed to submit advisory: " + err.message);
    } finally {
      setIsSubmittingAdvisory(false);
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, newStatus: "new" | "reviewed" | "flagged") => {
    try {
      const res = await apiClient.feedback.updateStatus(id, newStatus);
      if (res && res.feedback) {
        setFeedbackList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const filteredFeedback = feedbackList.filter((item) => {
    if (feedbackFilter === "all") return true;
    return item.rating === feedbackFilter;
  });

  const filteredDiseases = diseases.filter((d) => {
    if (!diseaseSearch) return true;
    const term = diseaseSearch.toLowerCase();
    return (
      d.commonName.toLowerCase().includes(term) ||
      (d.banglaName && d.banglaName.toLowerCase().includes(term)) ||
      d.crop.toLowerCase().includes(term) ||
      (d.banglaCrop && d.banglaCrop.toLowerCase().includes(term))
    );
  });

  // Chemical calculation formulas
  const chemicalDosageTable: Record<string, { name: string; type: string; ratePerLiter: string; doseGramsPerLiter: number; safetyIntervalDays: number }> = {
    mancozeb: { name: "ম্যানকোজেব ৮০% WP (Mancozeb)", type: "স্পর্শক ছত্রাকনাশক", ratePerLiter: "২ গ্রাম / লিটার", doseGramsPerLiter: 2, safetyIntervalDays: 14 },
    carbendazim: { name: "কার্বেনডাজিম ৫০% WP (Carbendazim)", type: "অন্তর্বাহী ছত্রাকনাশক", ratePerLiter: "১ গ্রাম / লিটার", doseGramsPerLiter: 1, safetyIntervalDays: 10 },
    azoxystrobin: { name: "অ্যামিস্টার টপ (Azoxystrobin + Difenoconazole)", type: "কম্বাইন্ড ছত্রাকনাশক", ratePerLiter: "১ মিলি / লিটার", doseGramsPerLiter: 1, safetyIntervalDays: 14 },
    imidacloprid: { name: "ইমিডাক্লোপ্রিড ২০ SL (Imidacloprid)", type: "শোষক পোকা দমন", ratePerLiter: "০.৫ মিলি / লিটার", doseGramsPerLiter: 0.5, safetyIntervalDays: 7 },
    trichoderma: { name: "ট্রাইকোডার্মা বায়ো-ফাংগিসাইড (Trichoderma)", type: "জৈব ছত্রাকনাশক", ratePerLiter: "৫ গ্রাম / লিটার", doseGramsPerLiter: 5, safetyIntervalDays: 0 },
    neem_oil: { name: "নিম তৈল + ডিটারজেন্ট (Neem Oil Emulsion)", type: "জৈব বালাইনাশক", ratePerLiter: "৫ মিলি / লিটার", doseGramsPerLiter: 5, safetyIntervalDays: 0 },
  };

  const selectedChemicalInfo = chemicalDosageTable[calcChemical] || chemicalDosageTable.mancozeb;
  const calculatedDose = (calcWater * selectedChemicalInfo.doseGramsPerLiter).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                <Stethoscope className="h-8 w-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold tracking-tight">
                    {isBangla ? "কৃষি বিশেষজ্ঞ পোর্টাল (Expert Tele-Agronomy Portal)" : "Agricultural Expert Advisory Portal"}
                  </h1>
                  <span className="rounded-full bg-emerald-400/20 border border-emerald-400/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                    DAE OFFICIAL PARTNER
                  </span>
                </div>
                <p className="mt-1 text-sm text-emerald-100/80 max-w-2xl">
                  {isBangla
                    ? "মাঠপর্যায়ের কৃষক প্রেডিকশন নিরীক্ষা, জটিল রোগ কেসে প্রেসক্রিপশন প্রদান এবং প্যাথোলজি ডেটাবেজ ম্যানেজমেন্ট।"
                    : "Review escalated field scans, provide agronomic prescriptions, and moderate pathology intelligence."}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-emerald-200/90 font-medium">
                  <span>কর্মকর্তা: <strong>{currentUser?.name || "Nasrin Akhter"}</strong></span>
                  <span>•</span>
                  <span>এলাকা: <strong>{currentUser?.district || "গাজীপুর"} (উপজেলা কৃষি অফিস)</strong></span>
                  <span>•</span>
                  <span>পদবি: <strong>উদ্ভিদ রোগতত্ত্ববিদ (Agronomist)</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {!isExpert && !isAdmin && (
                <button
                  type="button"
                  onClick={() => demoLogin("expert")}
                  className="rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  সুইচ টু বিশেষজ্ঞ (Switch to Demo Expert)
                </button>
              )}

              <Link
                href="/scan"
                className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-950/40 px-4 py-2.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/50 backdrop-blur-md transition-all"
              >
                <Eye className="h-4 w-4" />
                {isBangla ? "লাইভ স্ক্যানার" : "Live Scanner"}
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                জরুরি পরামর্শ অপেক্ষমাণ
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {escalatedScans.filter((s) => !s.metadata?.expertConsultation).length}
              </span>
              <span className="text-xs text-rose-600 font-semibold">আক্রান্ত কেস</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">তীব্র বা অস্পষ্ট সংক্রমণের কেস</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                প্রদত্ত প্রেসক্রিপশন
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {escalatedScans.filter((s) => s.metadata?.expertConsultation).length}
              </span>
              <span className="text-xs text-emerald-600 font-semibold">পরামর্শ সম্পন্ন</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">কৃষকদের পাঠানো সমাধান</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                কৃষক ফিডব্যাক নিরীক্ষা
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {feedbackList.length}
              </span>
              <span className="text-xs text-blue-600 font-semibold">মোট প্রতিক্রিয়া</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">মডেল কারেকশন ও ভ্যালিডেশন</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                প্যাথোলজি তথ্যভাণ্ডার
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300">
                <Database className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {diseases.length || 24}
              </span>
              <span className="text-xs text-amber-600 font-semibold">রোগ প্রজাতি</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">যাচাইকৃত বৈজ্ঞানিক গাইডলাইন</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 rounded-2xl shadow-sm overflow-x-auto scrollbar-none gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("escalated")}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-4 px-4 text-xs sm:text-sm font-bold transition-colors ${
              activeTab === "escalated"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <AlertTriangle className={`h-4 w-4 ${activeTab === "escalated" ? "text-emerald-600" : "text-slate-400"}`} />
            {isBangla ? "জরুরি কেস ও টেলি-পরামর্শ" : "Escalated Scans Queue"}
            {escalatedScans.filter((s) => !s.metadata?.expertConsultation).length > 0 && (
              <span className="ml-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-extrabold text-white">
                {escalatedScans.filter((s) => !s.metadata?.expertConsultation).length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-4 px-4 text-xs sm:text-sm font-bold transition-colors ${
              activeTab === "feedback"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <MessageSquare className={`h-4 w-4 ${activeTab === "feedback" ? "text-emerald-600" : "text-slate-400"}`} />
            {isBangla ? "কৃষক ফিডব্যাক ও মডেল কারেকশন" : "Farmer Feedback Review"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("diseases")}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-4 px-4 text-xs sm:text-sm font-bold transition-colors ${
              activeTab === "diseases"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Database className={`h-4 w-4 ${activeTab === "diseases" ? "text-emerald-600" : "text-slate-400"}`} />
            {isBangla ? "রোগ তথ্যভাণ্ডার পরিচালনা (CMS)" : "Pathology Catalog CMS"}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dosage")}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-4 px-4 text-xs sm:text-sm font-bold transition-colors ${
              activeTab === "dosage"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Calculator className={`h-4 w-4 ${activeTab === "dosage" ? "text-emerald-600" : "text-slate-400"}`} />
            {isBangla ? "বালাইনাশক ডোজ গাইড" : "Dosage Reference"}
          </button>
        </div>

        {/* -------------------------------------------------------------------
            TAB 1: ESCALATED SCANS & CONSULTATION QUEUE
           ------------------------------------------------------------------- */}
        {activeTab === "escalated" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {isBangla ? "জরুরি কেস ও বিশেষজ্ঞ মতামত কিউ" : "Escalated Cases for Consultation"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isBangla
                    ? "যেসব স্ক্যানে তীব্র সংক্রমণ (Severe) বা কম কনফিডেন্স সনাক্ত হয়েছে, সেগুলোতে বিশেষজ্ঞ পরামর্শ প্রদান করুন।"
                    : "Review high severity or low confidence scans flagged for direct agricultural officer intervention."}
                </p>
              </div>

              <button
                type="button"
                onClick={loadEscalatedScans}
                disabled={loadingScans}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingScans ? "animate-spin" : ""}`} />
                {isBangla ? "রিফ্রেশ করুন" : "Refresh"}
              </button>
            </div>

            {loadingScans ? (
              <div className="py-16 text-center">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-emerald-600" />
                <p className="mt-2 text-xs font-semibold text-slate-500">স্ক্যান তথ্য লোড হচ্ছে...</p>
              </div>
            ) : escalatedScans.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  কোনো জরুরি কেস অপেক্ষমাণ নেই
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  সবগুলো তীব্র বা সন্দেহজনক স্ক্যান সফলভাবে নিরীক্ষিত হয়েছে।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {escalatedScans.map((scan) => {
                  const hasConsultation = !!scan.metadata?.expertConsultation;
                  return (
                    <div
                      key={scan.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="space-y-4">
                        {/* Leaf image with badges */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                          <img
                            src={scan.imageUrl}
                            alt={scan.disease}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                            <span className="rounded-lg bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white">
                              {scan.banglaCrop || scan.crop}
                            </span>
                            {scan.severity === "Severe" && (
                              <span className="rounded-lg bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                তীব্র সংক্রমণ
                              </span>
                            )}
                            {scan.isLowConfidence && (
                              <span className="rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                লো কনফিডেন্স
                              </span>
                            )}
                          </div>

                          <div className="absolute bottom-2.5 right-2.5">
                            {hasConsultation ? (
                              <span className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1 shadow">
                                <CheckCircle2 className="h-3 w-3" />
                                পরামর্শ প্রদত্ত
                              </span>
                            ) : (
                              <span className="rounded-lg bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1 shadow animate-pulse">
                                <Clock className="h-3 w-3" />
                                অপেক্ষমাণ
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title and stats */}
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>কোড: {scan.scanCode}</span>
                            <span>{new Date(scan.createdAt).toLocaleDateString("bn-BD")}</span>
                          </div>
                          <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                            {scan.banglaName || scan.disease}
                          </h3>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-slate-500">AI কনফিডেন্স:</span>
                            <span className="font-bold text-emerald-600">{scan.confidence.toFixed(1)}%</span>
                          </div>
                        </div>

                        {/* Official consultation card if already submitted */}
                        {hasConsultation && (
                          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-3.5 text-xs dark:bg-emerald-950/30">
                            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold mb-1">
                              <BadgeCheck className="h-4 w-4" />
                              <span>কর্মকর্তার প্রেসক্রিপশন:</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                              {scan.metadata?.expertConsultation?.prescription || scan.metadata?.expertConsultation?.notes}
                            </p>
                            <span className="mt-1.5 block text-[10px] text-emerald-700 dark:text-emerald-400">
                              দ্বারা: {scan.metadata?.expertConsultation?.expertName}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => handleOpenAdvisoryModal(scan)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 px-3 text-xs font-bold text-white hover:bg-emerald-600 transition-colors dark:bg-slate-800 dark:hover:bg-emerald-600"
                        >
                          <Stethoscope className="h-4 w-4" />
                          {hasConsultation ? "প্রেসক্রিপশন সম্পাদনা করুন" : "পরামর্শ ও প্রেসক্রিপশন দিন"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            TAB 2: FARMER FEEDBACK REVIEW & MODEL CORRECTION
           ------------------------------------------------------------------- */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {isBangla ? "কৃষক ফিডব্যাক নিরীক্ষা ও মডেল কারেকশন" : "Farmer Feedback Review"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isBangla
                    ? "মাঠপর্যায়ের কৃষকদের মতামত যাচাই করে সঠিক বা ভুল প্রেডিকশন চিহ্নিত করুন।"
                    : "Evaluate farmer validation ratings to curate dataset quality for fine-tuning."}
                </p>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1.5 rounded-2xl bg-white p-1 border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                {(["all", "accurate", "inaccurate", "unsure"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFeedbackFilter(mode)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      feedbackFilter === mode
                        ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {mode === "all"
                      ? "সকল"
                      : mode === "accurate"
                      ? "সঠিক"
                      : mode === "inaccurate"
                      ? "ভুল"
                      : "অনিশ্চিত"}
                  </button>
                ))}
              </div>
            </div>

            {loadingFeedback ? (
              <div className="py-16 text-center">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-emerald-600" />
                <p className="mt-2 text-xs font-semibold text-slate-500">ফিডব্যাক লোড হচ্ছে...</p>
              </div>
            ) : filteredFeedback.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
                <MessageSquare className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-2 text-xs text-slate-500">কোনো ফিডব্যাক পাওয়া যায়নি।</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFeedback.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-bold ${
                          item.rating === "accurate"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : item.rating === "inaccurate"
                            ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                        }`}
                      >
                        {item.rating === "accurate" ? "✓" : item.rating === "inaccurate" ? "✕" : "?"}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {item.banglaDisease || item.disease}
                          </h4>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {item.crop}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({item.confidence?.toFixed(1) || 95}% কনফিডেন্স)
                          </span>
                        </div>

                        {item.comment && (
                          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 italic">
                            &ldquo;{item.comment}&rdquo;
                          </p>
                        )}

                        <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                          <span>প্রেরক: <strong>{item.userName || "কৃষক"}</strong></span>
                          <span>•</span>
                          <span>{new Date(item.createdAt).toLocaleDateString("bn-BD")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          item.status === "reviewed"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : item.status === "flagged"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                        }`}
                      >
                        {item.status === "reviewed" ? "পর্যালোচিত" : item.status === "flagged" ? "চিহ্নিত" : "নতুন"}
                      </span>

                      {item.status !== "reviewed" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(item.id, "reviewed")}
                          className="rounded-xl border border-emerald-500/30 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300"
                        >
                          অনুমোদন দিন
                        </button>
                      )}

                      {item.status !== "flagged" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(item.id, "flagged")}
                          className="rounded-xl border border-rose-500/30 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
                        >
                          ফ্ল্যাগ করুন
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            TAB 3: PATHOLOGY CATALOG CMS
           ------------------------------------------------------------------- */}
        {activeTab === "diseases" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {isBangla ? "উদ্ভিদ রোগতত্ত্ব জ্ঞানভাণ্ডার (Pathology CMS)" : "Crop Pathology Knowledge Base"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isBangla
                    ? "২৪টি সমর্থিত রোগ ক্লাসের লক্ষণ, বালাইনাশক স্প্রে মাত্রা ও বিশেষজ্ঞ সতর্কতা যাচাই করুন।"
                    : "Curate symptoms, chemical/organic treatment protocols, and consultation escalation criteria."}
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={diseaseSearch}
                  onChange={(e) => setDiseaseSearch(e.target.value)}
                  placeholder="রোগ বা ফসল খুঁজুন..."
                  className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDiseases.map((d) => (
                <div
                  key={d.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-500/40 transition-all dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {d.banglaCrop || d.crop}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {d.pathogenType}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {d.banglaName || d.commonName}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono italic mb-3">
                    {d.commonName}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
                    {d.banglaSummary || d.summary}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" />
                      {d.banglaSymptoms?.length || d.symptoms?.length || 3} লক্ষণ
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      DAE ভেরিফায়েড
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            TAB 4: QUICK CHEMICAL DOSAGE GUIDE & CALCULATOR
           ------------------------------------------------------------------- */}
        {activeTab === "dosage" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {isBangla ? "বালাইনাশক ও ছত্রাকনাশক ডোজ ক্যালকুলেটর" : "Agronomist Dosage Guide"}
              </h2>
              <p className="text-xs text-slate-500">
                {isBangla
                  ? "মাঠপর্যায়ে কৃষকদের সঠিক মাত্রা ও স্প্রে দ্রবণ হিসাব করে পরামর্শ দেওয়ার টুল।"
                  : "Calculate precise chemical dosages, water requirements, and pre-harvest intervals for farmers."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calculator Box */}
              <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-emerald-600" />
                  ডোজ নির্ণয়
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    বালাইনাশক নির্বাচন করুন:
                  </label>
                  <select
                    value={calcChemical}
                    onChange={(e) => setCalcChemical(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="mancozeb">ম্যানকোজেব ৮০% WP (Mancozeb)</option>
                    <option value="carbendazim">কার্বেনডাজিম ৫০% WP (Carbendazim)</option>
                    <option value="azoxystrobin">অ্যামিস্টার টপ (Azoxystrobin)</option>
                    <option value="imidacloprid">ইমিডাক্লোপ্রিড ২০ SL (Imidacloprid)</option>
                    <option value="trichoderma">ট্রাইকোডার্মা জৈব ছত্রাকনাশক</option>
                    <option value="neem_oil">নিম তৈল মিশ্রণ (Neem Oil)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    স্প্রে পানির পরিমাণ (লিটার):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={calcWater}
                    onChange={(e) => setCalcWater(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-4 dark:bg-emerald-950/40 space-y-2">
                  <div className="text-xs text-slate-500">প্রয়োজনীয় বালাইনাশকের পরিমাণ:</div>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                    {calculatedDose} {selectedChemicalInfo.doseGramsPerLiter >= 1 ? "গ্রাম / মিলি" : "মিলি"}
                  </div>
                  <div className="text-[11px] text-emerald-800/80 dark:text-emerald-400">
                    প্রস্তাবিত মাত্রা: {selectedChemicalInfo.ratePerLiter}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    নিরাপত্তা বিরতিকাল (PHI): {selectedChemicalInfo.safetyIntervalDays} দিন
                  </div>
                </div>
              </div>

              {/* Chemical reference table */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-emerald-600" />
                  অনুমোদিত বালাইনাশক তালিকা ও প্রয়োগবিধি
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                        <th className="pb-2.5 font-bold">বালাইনাশকের নাম</th>
                        <th className="pb-2.5 font-bold">শ্রেণি</th>
                        <th className="pb-2.5 font-bold">প্রয়োগ মাত্রা</th>
                        <th className="pb-2.5 font-bold">PHI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {Object.values(chemicalDosageTable).map((chem, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3 font-bold text-slate-900 dark:text-white">{chem.name}</td>
                          <td className="py-3 text-slate-500">{chem.type}</td>
                          <td className="py-3 font-semibold text-emerald-600 dark:text-emerald-400">{chem.ratePerLiter}</td>
                          <td className="py-3 text-slate-500">{chem.safetyIntervalDays} দিন</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODAL: PROVIDE ADVISORY & PRESCRIPTION FORM
           ------------------------------------------------------------------- */}
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      কৃষি কর্মকর্তার প্রেসক্রিপশন ও পরামর্শ
                    </h3>
                    <p className="text-xs text-slate-400">
                      আইডি: {selectedScan.scanCode} • {selectedScan.banglaCrop || selectedScan.crop}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedScan(null)}
                  className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {advisorySuccess && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {advisorySuccess}
                </div>
              )}

              <form onSubmit={handleSubmitAdvisory} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      AI সনাক্তকৃত রোগ:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={selectedScan.banglaName || selectedScan.disease}
                      className="w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিশেষজ্ঞ অনুমোদিত রোগ (Verified Diagnosis):
                    </label>
                    <input
                      type="text"
                      value={verifiedDiseaseInput}
                      onChange={(e) => setVerifiedDiseaseInput(e.target.value)}
                      placeholder="রোগের সঠিক নাম নিশ্চিত করুন..."
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বালাইনাশক প্রেসক্রিপশন ও প্রয়োগের মাত্রা (Prescription):
                  </label>
                  <textarea
                    rows={2}
                    value={prescriptionNote}
                    onChange={(e) => setPrescriptionNote(e.target.value)}
                    placeholder="উদাঃ ম্যানকোজেব ২ গ্রাম প্রতি লিটার পানিতে মিশিয়ে ৭ দিন পর পর ২ বার স্প্রে করুন..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    মাঠ পরিচর্যা ও পরামর্শ নোট (Agronomic Field Advisory):
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={advisoryNote}
                    onChange={(e) => setAdvisoryNote(e.target.value)}
                    placeholder="আক্রান্ত পাতা পুড়িয়ে ফেলুন, অতিরিক্ত ইউরিয়া সার বন্ধ রাখুন এবং জমিতে সঠিক নিষ্কাশন বজায় রাখুন..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    কেস স্ট্যাটাস:
                  </label>
                  <select
                    value={consultationStatus}
                    onChange={(e) => setConsultationStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Active">Active (সক্রিয় চিকিৎসা চলছে)</option>
                    <option value="Treated">Treated (চিকিৎসা সম্পন্ন ও রোগ নিয়ন্ত্রণে)</option>
                    <option value="Monitoring">Monitoring (নজরদারিতে রয়েছে)</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedScan(null)}
                    className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    বাতিল
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingAdvisory}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-md transition-all disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {isSubmittingAdvisory ? "সংরক্ষণ হচ্ছে..." : "প্রেসক্রিপশন পাঠান"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
