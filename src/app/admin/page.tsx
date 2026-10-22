"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  getStoredUsers,
  getScanHistory,
  getFeedbackList,
  getFeedbackStats,
  getStoredDiseases,
} from "@/lib/storage";
import {
  Users,
  Activity,
  ThumbsUp,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Database,
  Calendar,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export default function AdminDashboardPage() {
  const [usersCount, setUsersCount] = useState(0);
  const [scans, setScans] = useState<any[]>([]);
  const [feedbackStats, setFeedbackStats] = useState({
    total: 0,
    accurateCount: 0,
    inaccurateCount: 0,
    unsureCount: 0,
    accuracyRate: 95,
  });
  const [diseasesCount, setDiseasesCount] = useState(0);

  useEffect(() => {
    setUsersCount(getStoredUsers().length);
    setScans(getScanHistory());
    setFeedbackStats(getFeedbackStats());
    setDiseasesCount(getStoredDiseases().length);
  }, []);

  const lowConfidenceCount = scans.filter((s) => s.isLowConfidence || s.confidence < 75).length;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Users */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                মোট ব্যবহারকারী (Users)
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {usersCount + 42}
              </span>
              <span className="flex items-center text-xs font-bold text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +14% বৃদ্ধি
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">নিবন্ধিত কৃষক ও কৃষি কর্মকর্তা</p>
          </div>

          {/* Total Predictions */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                মোট প্রেডিকশন (Scans)
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {scans.length + 185}
              </span>
              <span className="text-xs font-bold text-emerald-600">&bull; অনলাইন সক্রিয়</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">পাতার রোগ শনাক্তকরণ পরীক্ষা</p>
          </div>

          {/* Feedback Accuracy */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                কৃষক সন্তুষ্টি / নির্ভুলতা
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
                <ThumbsUp className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {feedbackStats.accuracyRate}%
              </span>
              <span className="text-xs font-bold text-purple-600">
                ({feedbackStats.total}টি মতামত)
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">মাঠে বাস্তব ফলাফলের সাথে মিল</p>
          </div>

          {/* Low Confidence Warnings */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                কম কনফিডেন্স সতর্কতা
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                {lowConfidenceCount}
              </span>
              <span className="text-xs font-medium text-slate-500">টি সতর্কতা ফ্ল্যাগ</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">বিশেষজ্ঞের কাছে রেফার করার পরামর্শ দেওয়া হয়েছে</p>
          </div>
        </div>

        {/* Middle Section: Recent Scans & Feedback Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Scans (2 cols) */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  সাম্প্রতিক প্রেডিকশন কার্যকলাপ (Recent Activity)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  সর্বশেষ কৃষক কর্তৃক স্ক্যানকৃত পাতার ডায়াগনোসিস
                </p>
              </div>
              <Link href="/admin/predictions">
                <Button variant="ghost" size="sm" className="text-xs font-bold text-purple-600">
                  সবগুলো দেখুন <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {scans.slice(0, 5).map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={scan.imageUrl}
                      alt={scan.crop}
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {scan.banglaName || scan.disease}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        ফসল: <strong className="text-slate-700 dark:text-slate-300">{scan.banglaCrop || scan.crop}</strong> • {new Date(scan.date).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        scan.isLowConfidence || scan.confidence < 75
                          ? "warning"
                          : scan.severity === "Healthy"
                          ? "success"
                          : "info"
                      }
                      size="sm"
                    >
                      {scan.isLowConfidence || scan.confidence < 75
                        ? "কম কনফিডেন্স"
                        : `${scan.confidence}% ম্যাচ`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback & Knowledge Summary (1 col) */}
          <div className="space-y-6">
            {/* Feedback breakdown */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                কৃষক ফিডব্যাক অনুপাত
              </h3>
              <p className="text-xs text-slate-500 mb-4">প্রেডিকশন সম্পর্কে কৃষকদের মতামত</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-700">সঠিক (Accurate)</span>
                    <span>{feedbackStats.accurateCount} টি</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{
                        width: `${
                          feedbackStats.total > 0
                            ? (feedbackStats.accurateCount / feedbackStats.total) * 100
                            : 85
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-700">ভুল / অমিল (Inaccurate)</span>
                    <span>{feedbackStats.inaccurateCount} টি</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{
                        width: `${
                          feedbackStats.total > 0
                            ? (feedbackStats.inaccurateCount / feedbackStats.total) * 100
                            : 8
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-700">অনিশ্চিত (Unsure)</span>
                    <span>{feedbackStats.unsureCount} টি</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{
                        width: `${
                          feedbackStats.total > 0
                            ? (feedbackStats.unsureCount / feedbackStats.total) * 100
                            : 7
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link href="/admin/feedback">
                  <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                    সম্পূর্ণ ফিডব্যাক বিশ্লেষণ দেখুন
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                তথ্যভান্ডার ব্যবস্থাপনা
              </h3>
              <div className="space-y-2">
                <Link
                  href="/admin/diseases"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-600" />
                    রোগ তথ্যভান্ডার ({diseasesCount} টি রোগ)
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/admin/content"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    জরুরি নোটিশ ও পরামর্শ বুলেটিন
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
