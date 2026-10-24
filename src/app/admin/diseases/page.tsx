"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DiseaseInfo } from "@/types/disease";
import { getStoredDiseases, saveStoredDisease, deleteStoredDisease } from "@/lib/storage";
import { apiClient } from "@/lib/apiClient";
import {
  Database,
  Plus,
  Edit,
  Trash2,
  Search,
  Check,
  X,
  Stethoscope,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function DiseaseKnowledgeBasePage() {
  const [diseases, setDiseases] = useState<DiseaseInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDisease, setEditingDisease] = useState<DiseaseInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadDiseases = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.diseases.getAll();
      if (res?.diseases && res.diseases.length > 0) {
        setDiseases(res.diseases);
      } else {
        setDiseases(getStoredDiseases());
      }
    } catch (err) {
      console.warn("[admin/diseases] Failed to fetch from API, using fallback:", err);
      setDiseases(getStoredDiseases());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDiseases();
  }, []);

  const handleEdit = (disease: DiseaseInfo) => {
    setEditingDisease(JSON.parse(JSON.stringify(disease)));
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    const blank: DiseaseInfo = {
      id: `disease-${Date.now().toString(36)}`,
      crop: "Tomato",
      banglaCrop: "টমেটো",
      commonName: "New Disease",
      banglaName: "নতুন রোগের নাম",
      scientificName: "Pathogen sp.",
      pathogenType: "Fungal",
      severity: "Moderate",
      confidence: 95.0,
      summary: "Clinical summary in English",
      banglaSummary: "রোগের সংক্ষিপ্ত পরিচিতি বাংলায় লিখুন...",
      symptoms: ["Initial symptoms"],
      banglaSymptoms: ["প্রাথমিক লক্ষণ ১", "লক্ষণ ২"],
      favorableConditions: ["Warm humid conditions"],
      banglaCauses: ["উচ্চ আর্দ্রতা ও তাপমাত্রা"],
      affectedParts: ["Leaves"],
      banglaAffectedParts: ["পাতা"],
      banglaCropInfo: "আক্রান্ত ফসলের বিবরণ",
      transmissionRisk: "Moderate",
      banglaTreatment: {
        managementAdvice: ["আক্রান্ত পাতা অপসারণ করুন।", "গাছের গোড়ায় সেচ দিন।"],
        preventionMethods: ["রোগমুক্ত বীজ ব্যবহার করুন।", "শস্যপর্যায় মেনে চলুন।"],
        fieldCareGuidance: ["জমির আগাছা পরিষ্কার রাখুন।"],
        whenToConsultExpert: ["রোগ দ্রুত বৃদ্ধি পেলে কৃষি অফিসে যোগাযোগ করুন।"],
        safetyNote:
          "রাসায়নিক কীটনাশকের ডোজ অনুমান করে প্রয়োগ করবেন না। অনুমোদিত কৃষি কর্মকর্তার নির্দেশ অনুযায়ী প্রয়োগ করুন।",
        verifiedSource: "কৃষি তথ্য সার্ভিস (AIS)",
      },
      treatmentPlan: {
        immediateActions: [
          {
            title: "Isolate foliage",
            description: "Remove infected leaves promptly",
            priority: "High",
            timeframe: "24h",
            effectiveness: "90%",
          },
        ],
        organicTreatments: [],
        chemicalTreatments: [],
        preventiveMeasures: ["Crop rotation"],
        culturalPractices: ["Drip irrigation"],
      },
    };
    setEditingDisease(blank);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDisease || isSaving) return;

    setIsSaving(true);
    try {
      await apiClient.diseases.save(editingDisease);
      saveStoredDisease(editingDisease);
      await loadDiseases();
      setIsModalOpen(false);
      setEditingDisease(null);
    } catch (err: any) {
      alert(err.message || "রোগের তথ্য সংরক্ষণ করা সম্ভব হয়নি।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই রোগটি তথ্যভান্ডার থেকে মুছে ফেলতে চান?")) {
      try {
        await apiClient.diseases.delete(id);
        deleteStoredDisease(id);
        await loadDiseases();
      } catch (err: any) {
        alert(err.message || "রোগটি মুছে ফেলা সম্ভব হয়নি।");
      }
    }
  };

  const filteredDiseases = diseases.filter((d) => {
    const term = searchTerm.toLowerCase();
    return (
      d.commonName.toLowerCase().includes(term) ||
      (d.banglaName && d.banglaName.toLowerCase().includes(term)) ||
      d.crop.toLowerCase().includes(term) ||
      (d.banglaCrop && d.banglaCrop.toLowerCase().includes(term))
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              রোগ তথ্যভান্ডার ব্যবস্থাপনা (Disease Knowledge Base)
            </h2>
            <p className="text-xs text-slate-500">
              রোগের বিবরণ, বাংলা লক্ষণ, ব্যবস্থাপনা পরামর্শ ও সংবিধিবদ্ধ নিরাপত্তা সতর্কতা সম্পাদনা করুন
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleAddNew}
            className="shadow-md"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            নতুন রোগ ও পরামর্শ যোগ করুন
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="রোগ বা ফসলের নাম দিয়ে খুঁজুন..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {d.banglaCrop || d.crop}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                      {d.banglaName || d.commonName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      English: {d.commonName} • <span className="italic">{d.scientificName}</span>
                    </p>
                  </div>

                  <Badge
                    variant={
                      d.severity === "Healthy"
                        ? "success"
                        : d.severity === "Severe"
                        ? "danger"
                        : "warning"
                    }
                    size="sm"
                  >
                    {d.severity}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                  {d.banglaSummary || d.summary}
                </p>

                {/* Bangla symptoms preview */}
                {d.banglaSymptoms && d.banglaSymptoms.length > 0 && (
                  <div className="mt-3 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="font-bold text-slate-700 dark:text-slate-300">মূল লক্ষণ: </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {d.banglaSymptoms.slice(0, 2).join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">ID: {d.id}</span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(d)}
                    className="text-xs"
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    সম্পাদনা (Edit)
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(d.id)}
                    className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 p-1.5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isModalOpen && editingDisease && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
            <div className="my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white dark:bg-slate-900 z-10">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-purple-600" />
                  রোগ তথ্য সম্পাদনা / আপডেট
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      রোগের নাম (বাংলা)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingDisease.banglaName || ""}
                      onChange={(e) =>
                        setEditingDisease({ ...editingDisease, banglaName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      রোগের নাম (ইংরেজি)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingDisease.commonName}
                      onChange={(e) =>
                        setEditingDisease({ ...editingDisease, commonName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ফসলের নাম (বাংলা)
                    </label>
                    <input
                      type="text"
                      value={editingDisease.banglaCrop || ""}
                      onChange={(e) =>
                        setEditingDisease({ ...editingDisease, banglaCrop: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Crop (English)
                    </label>
                    <input
                      type="text"
                      value={editingDisease.crop}
                      onChange={(e) =>
                        setEditingDisease({ ...editingDisease, crop: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      তীব্রতা (Severity)
                    </label>
                    <select
                      value={editingDisease.severity}
                      onChange={(e: any) =>
                        setEditingDisease({ ...editingDisease, severity: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Healthy">Healthy (সুস্থ)</option>
                      <option value="Mild">Mild (মৃদু)</option>
                      <option value="Moderate">Moderate (মাঝারি)</option>
                      <option value="Severe">Severe (তীব্র)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সংক্ষিপ্ত বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={editingDisease.banglaSummary || ""}
                    onChange={(e) =>
                      setEditingDisease({ ...editingDisease, banglaSummary: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বাংলা লক্ষণসমূহ (কমা দিয়ে আলাদা করুন)
                  </label>
                  <textarea
                    rows={2}
                    value={(editingDisease.banglaSymptoms || []).join(", ")}
                    onChange={(e) =>
                      setEditingDisease({
                        ...editingDisease,
                        banglaSymptoms: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    রোগ ব্যবস্থাপনার জরুরি পরামর্শ (কমা দিয়ে আলাদা করুন)
                  </label>
                  <textarea
                    rows={2}
                    value={(editingDisease.banglaTreatment?.managementAdvice || []).join(", ")}
                    onChange={(e) =>
                      setEditingDisease({
                        ...editingDisease,
                        banglaTreatment: {
                          ...editingDisease.banglaTreatment!,
                          managementAdvice: e.target.value.split(",").map((s) => s.trim()),
                          preventionMethods: editingDisease.banglaTreatment?.preventionMethods || [],
                          fieldCareGuidance: editingDisease.banglaTreatment?.fieldCareGuidance || [],
                          whenToConsultExpert: editingDisease.banglaTreatment?.whenToConsultExpert || [],
                          safetyNote: editingDisease.banglaTreatment?.safetyNote || "",
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    কীটনাশক ও রাসায়নিক সংবিধিবদ্ধ সতর্কতা (Safety Note)
                  </label>
                  <input
                    type="text"
                    value={editingDisease.banglaTreatment?.safetyNote || ""}
                    onChange={(e) =>
                      setEditingDisease({
                        ...editingDisease,
                        banglaTreatment: {
                          ...editingDisease.banglaTreatment!,
                          managementAdvice: editingDisease.banglaTreatment?.managementAdvice || [],
                          preventionMethods: editingDisease.banglaTreatment?.preventionMethods || [],
                          fieldCareGuidance: editingDisease.banglaTreatment?.fieldCareGuidance || [],
                          whenToConsultExpert: editingDisease.banglaTreatment?.whenToConsultExpert || [],
                          safetyNote: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    সংরক্ষণ করুন (Save Changes)
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
