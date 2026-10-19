"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { HistoryItem } from "@/types/scanner";
import { getScanHistory, updateHistoryStatus } from "@/lib/storage";
import {
  Activity,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Calendar,
  X,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function PredictionMonitoringPage() {
  const [scans, setScans] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cropFilter, setCropFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState<"all" | "high" | "low">("all");
  const [selectedScan, setSelectedScan] = useState<HistoryItem | null>(null);

  const loadScans = () => {
    setScans(getScanHistory());
  };

  useEffect(() => {
    loadScans();
  }, []);

  const handleStatusChange = (id: string, status: "Active" | "Treated" | "Monitoring") => {
    updateHistoryStatus(id, status);
    loadScans();
  };

  const filteredScans = scans.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.banglaName && s.banglaName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.crop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCrop = cropFilter === "all" || s.crop.toLowerCase() === cropFilter.toLowerCase();

    const isLow = s.isLowConfidence || s.confidence < 75;
    const matchesConfidence =
      confidenceFilter === "all"
        ? true
        : confidenceFilter === "low"
        ? isLow
        : !isLow;

    return matchesSearch && matchesCrop && matchesConfidence;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              প্রেডিকশন মনিটরিং (AI Prediction Activity Monitoring)
            </h2>
            <p className="text-xs text-slate-500">
              মাঠের সকল পাতার রোগ শনাক্তকরণ ফলাফল ও কম কনফিডেন্স সতর্কতা পর্যবেক্ষণ করুন
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              মোট স্ক্যান: {scans.length} টি
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="স্ক্যান আইডি বা রোগের নাম..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Confidence Filter */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setConfidenceFilter("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                  confidenceFilter === "all" ? "bg-white dark:bg-slate-700 text-purple-700 shadow-sm" : "text-slate-600"
                }`}
              >
                সকল
              </button>
              <button
                type="button"
                onClick={() => setConfidenceFilter("high")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                  confidenceFilter === "high" ? "bg-white dark:bg-slate-700 text-emerald-700 shadow-sm" : "text-slate-600"
                }`}
              >
                উচ্চ কনফিডেন্স (&ge;৭৫%)
              </button>
              <button
                type="button"
                onClick={() => setConfidenceFilter("low")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                  confidenceFilter === "low" ? "bg-amber-500 text-white shadow-sm" : "text-amber-700"
                }`}
              >
                কম কনফিডেন্স সতর্কতা (&lt;৭৫%)
              </button>
            </div>

            {/* Crop Filter */}
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">সকল ফসল</option>
              <option value="Tomato">টমেটো</option>
              <option value="Potato">আলু</option>
              <option value="Rice">ধান</option>
              <option value="Corn (Maize)">ভুট্টা</option>
              <option value="Bell Pepper">মরিচ</option>
            </select>
          </div>
        </div>

        {/* Prediction Scans Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">নমুনা পাতা (Image)</th>
                <th className="px-6 py-4">শনাক্তকৃত রোগ (Disease)</th>
                <th className="px-6 py-4">ফসল (Crop)</th>
                <th className="px-6 py-4">কনফিডেন্স (Match)</th>
                <th className="px-6 py-4">মাঠের অবস্থা (Status)</th>
                <th className="px-6 py-4">তারিখ (Date)</th>
                <th className="px-6 py-4 text-right">বিস্তারিত</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredScans.map((scan) => {
                const isLow = scan.isLowConfidence || scan.confidence < 75;
                return (
                  <tr
                    key={scan.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={scan.imageUrl}
                          alt={scan.crop}
                          className="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <span className="font-mono text-[10px] text-slate-400">
                          {scan.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {scan.banglaName || scan.disease}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {scan.disease}
                      </p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {scan.banglaCrop || scan.crop}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant={
                            isLow
                              ? "warning"
                              : scan.severity === "Healthy"
                              ? "success"
                              : "info"
                          }
                          size="sm"
                        >
                          {isLow ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                          {scan.confidence.toFixed(1)}%
                        </Badge>
                        {isLow && (
                          <span className="text-[10px] font-bold text-amber-600">
                            সতর্কতা
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <select
                        value={scan.status}
                        onChange={(e: any) => handleStatusChange(scan.id, e.target.value)}
                        className={`rounded-lg px-2 py-1 text-[11px] font-bold border ${
                          scan.status === "Active"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : scan.status === "Treated"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}
                      >
                        <option value="Active">সক্রিয় (Active)</option>
                        <option value="Treated">চিকিৎসাধীন (Treated)</option>
                        <option value="Monitoring">পর্যবেক্ষণে (Monitoring)</option>
                      </select>
                    </td>
                    <td className="px-6 py-3.5 text-[11px] text-slate-400">
                      {new Date(scan.date).toLocaleDateString("bn-BD")}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedScan(scan)}
                        className="text-xs text-purple-600"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        দেখুন
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Scan Details Modal */}
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  স্ক্যান বিস্তারিত ({selectedScan.id})
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedScan(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={selectedScan.imageUrl}
                    alt={selectedScan.crop}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl">
                  <div>
                    <span className="text-slate-400">রোগের নাম:</span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {selectedScan.banglaName || selectedScan.disease}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">শনাক্তকরণের নিশ্চয়তা:</span>
                    <p className="font-bold text-emerald-600 text-sm">
                      {selectedScan.confidence}%
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">ফসল:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedScan.banglaCrop || selectedScan.crop}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">তীব্রতা:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedScan.severity}
                    </p>
                  </div>
                </div>

                {selectedScan.feedbackRating && (
                  <div className="rounded-xl bg-purple-50 p-2.5 text-purple-900 dark:bg-purple-950/40 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                    <strong>কৃষকের ফিডব্যাক: </strong>
                    {selectedScan.feedbackRating === "accurate"
                      ? "হ্যাঁ, সঠিক (Accurate)"
                      : selectedScan.feedbackRating === "inaccurate"
                      ? "না, ভুল (Inaccurate)"
                      : "অনিশ্চিত (Unsure)"}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedScan(null)}
                  >
                    বন্ধ করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
