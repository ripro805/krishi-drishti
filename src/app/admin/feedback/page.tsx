"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PredictionFeedback } from "@/types/feedback";
import { getFeedbackList, updateFeedbackStatus, getFeedbackStats } from "@/lib/storage";
import { apiClient } from "@/lib/apiClient";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  CheckCircle,
  Flag,
  Search,
  Filter,
  Check,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function FeedbackManagementPage() {
  const [feedbackList, setFeedbackList] = useState<PredictionFeedback[]>([]);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    accurateCount: 0,
    inaccurateCount: 0,
    unsureCount: 0,
    accuracyRate: 95,
  });

  const loadFeedback = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.feedback.getList({ rating: filterRating });
      if (res?.feedbackList) {
        setFeedbackList(res.feedbackList);
        if (res.stats) setStats(res.stats);
      } else {
        setFeedbackList(getFeedbackList());
        setStats(getFeedbackStats());
      }
    } catch (err: any) {
      console.warn("[admin/feedback] API retrieval error, using local data:", err);
      setFeedbackList(getFeedbackList());
      setStats(getFeedbackStats());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, [filterRating]);

  const handleStatusUpdate = async (id: string, status: "new" | "reviewed" | "flagged") => {
    setFeedbackList((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
    updateFeedbackStatus(id, status);
    try {
      await apiClient.feedback.updateStatus(id, status);
    } catch (err) {
      console.error("[admin/feedback] Status update failed on server:", err);
    }
  };

  const filtered = feedbackList.filter((item) => {
    const matchesRating = filterRating === "all" || item.rating === filterRating;
    const matchesSearch =
      item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.banglaDisease && item.banglaDisease.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.comment && item.comment.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.userName && item.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRating && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              ব্যবহারকারী ফিডব্যাক বিশ্লেষণ (Feedback Management & Analysis)
            </h2>
            <p className="text-xs text-slate-500">
              এআই মডেলের রোগ শনাক্তকরণ সম্পর্কে মাঠ পর্যায়ের কৃষক ও বিশেষজ্ঞদের মতামত
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 px-3.5 py-1.5 border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800 text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                সঠিকতার হার: {stats.accuracyRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">সঠিক (Accurate)</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{stats.accurateCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80">
              <ThumbsUp className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">ভুল প্রেডিকশন (Inaccurate)</p>
              <p className="text-2xl font-black text-rose-600 mt-1">{stats.inaccurateCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/80">
              <ThumbsDown className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">অনিশ্চিত (Unsure)</p>
              <p className="text-2xl font-black text-amber-600 mt-1">{stats.unsureCount}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/80">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="মন্তব্য বা রোগের নাম..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 mr-1">রেটিং:</span>
            {["all", "accurate", "inaccurate", "unsure"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFilterRating(r)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  filterRating === r
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {r === "all" ? "সকল" : r === "accurate" ? "সঠিক" : r === "inaccurate" ? "ভুল" : "অনিশ্চিত"}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">মূল্যায়ন (Rating)</th>
                <th className="px-6 py-4">রোগ ও ফসল</th>
                <th className="px-6 py-4">ব্যবহারকারীর মন্তব্য (Farmer Comment)</th>
                <th className="px-6 py-4">ব্যবহারকারী</th>
                <th className="px-6 py-4">তারিখ</th>
                <th className="px-6 py-4 text-right">স্ট্যাটাস ও অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.rating === "accurate"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : item.rating === "inaccurate"
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {item.rating === "accurate" && <ThumbsUp className="h-3 w-3" />}
                      {item.rating === "inaccurate" && <ThumbsDown className="h-3 w-3" />}
                      {item.rating === "unsure" && <HelpCircle className="h-3 w-3" />}
                      {item.rating === "accurate"
                        ? "সঠিক (Accurate)"
                        : item.rating === "inaccurate"
                        ? "ভুল (Inaccurate)"
                        : "অনিশ্চিত (Unsure)"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.banglaDisease || item.disease}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      ফসল: {item.crop} ({item.confidence}% কনফিডেন্স)
                    </p>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      &ldquo;{item.comment || "কোনো লিখিত মন্তব্য নেই"}&rdquo;
                    </p>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                    {item.userName || "অতিথি কৃষক"}
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={item.status}
                      onChange={(e: any) => handleStatusUpdate(item.id, e.target.value)}
                      className={`rounded-lg px-2 py-1 text-[11px] font-bold border ${
                        item.status === "reviewed"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : item.status === "flagged"
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <option value="new">নতুন (New)</option>
                      <option value="reviewed">পর্যালোচিত (Reviewed)</option>
                      <option value="flagged">মডেল রি-ট্রেনিং ফ্ল্যাগ (Flagged)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
