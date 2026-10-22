"use client";

import React from "react";
import Link from "next/link";
import { useScanHistory } from "@/hooks/useScanHistory";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import {
  History,
  Trash2,
  Scan,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
} from "lucide-react";

export default function HistoryPage() {
  const { isBangla } = useLanguage();
  const {
    history,
    totalCount,
    filterCrop,
    setFilterCrop,
    filterStatus,
    setFilterStatus,
    toggleStatus,
    clearAll,
  } = useScanHistory();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <Badge variant="success" size="md">
            <History className="h-3.5 w-3.5" />
            {isBangla ? "মাঠের স্ক্যান ইতিহাস" : "Field Outbreak History"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            {isBangla ? "আগের রোগ শনাক্তকরণের ফলাফল ও ইতিহাস" : "Scan History & Health Tracking"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isBangla
              ? "পূর্বে সংরক্ষিত পাতার বিশ্লেষণ, সংক্রমণের অগ্রগতি এবং চিকিৎসার অবস্থা ট্র্যাক করুন।"
              : "Log of previously analyzed field samples, infection progress, and remediation statuses."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/scan">
            <Button size="sm">
              <Scan className="h-4 w-4 mr-1.5" />
              {isBangla ? "নতুন পাতা স্ক্যান করুন" : "Scan New Leaf"}
            </Button>
          </Link>
          {totalCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-rose-600 hover:bg-rose-50">
              <Trash2 className="h-4 w-4 mr-1" />
              {isBangla ? "ইতিহাস মুছুন" : "Clear Log"}
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> {isBangla ? "ফসল ফিল্টার:" : "Filter Crop:"}
          </span>
          {["All", "Tomato", "Potato", "Rice", "Corn (Maize)", "Bell Pepper"].map((crop) => (
            <button
              key={crop}
              type="button"
              onClick={() => setFilterCrop(crop)}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                filterCrop === crop
                  ? "bg-agri-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {crop === "All"
                ? isBangla
                  ? "সকল ফসল"
                  : "All"
                : crop === "Tomato"
                ? isBangla
                  ? "টমেটো"
                  : "Tomato"
                : crop === "Potato"
                ? isBangla
                  ? "আলু"
                  : "Potato"
                : crop === "Rice"
                ? isBangla
                  ? "ধান"
                  : "Rice"
                : crop === "Corn (Maize)"
                ? isBangla
                  ? "ভুট্টা"
                  : "Corn"
                : isBangla
                ? "মরিচ"
                : "Pepper"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">{isBangla ? "অবস্থা:" : "Status:"}</span>
          {["All", "Active", "Treated", "Monitoring"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                filterStatus === status
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {status === "All"
                ? isBangla
                  ? "সকল"
                  : "All"
                : status === "Active"
                ? isBangla
                  ? "সক্রিয়"
                  : "Active"
                : status === "Treated"
                ? isBangla
                  ? "চিকিৎসাধীন"
                  : "Treated"
                : isBangla
                ? "পর্যবেক্ষণে"
                : "Monitoring"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty */}
      {history.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <History className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {isBangla ? "কোনো স্ক্যান ইতিহাস পাওয়া যায়নি" : "No Scan History Found"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {isBangla
              ? "রোগ নির্ণয় স্ক্যানারে গিয়ে একটি পাতার ছবি স্ক্যান করে সংরক্ষণ করুন।"
              : "Capture or upload an infected crop leaf to start tracking outbreak trends across your farm."}
          </p>
          <Link href="/scan" className="mt-4 inline-block">
            <Button size="sm">
              <Scan className="h-4 w-4 mr-1.5" />
              {isBangla ? "এখনই পাতা স্ক্যান করুন" : "Scan Your First Leaf"}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => {
            const isLow = item.isLowConfidence || item.confidence < 75;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.disease}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <Badge
                        size="sm"
                        variant={
                          isLow
                            ? "warning"
                            : item.severity === "Healthy"
                            ? "success"
                            : item.severity === "Severe"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {isLow ? (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        ) : null}
                        {isLow
                          ? "কম কনফিডেন্স"
                          : `${item.confidence.toFixed(0)}% Match`}
                      </Badge>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="rounded-lg bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-agri-700 dark:text-agri-400">
                        {item.banglaCrop || item.crop}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                      {item.banglaName || item.disease}
                    </h3>
                    <p className="text-xs text-slate-400 italic">
                      English: {item.disease}
                    </p>
                  </div>

                  {item.feedbackRating && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.feedbackRating === "accurate" ? (
                        <>
                          <ThumbsUp className="h-3 w-3 text-emerald-600" />
                          <span>কৃষক রেটিং: সঠিক ছিল</span>
                        </>
                      ) : item.feedbackRating === "inaccurate" ? (
                        <>
                          <ThumbsDown className="h-3 w-3 text-rose-600" />
                          <span>কৃষক রেটিং: ভুল ছিল</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="h-3 w-3 text-amber-600" />
                          <span>কৃষক রেটিং: নিশ্চিত নন</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {(["Active", "Treated", "Monitoring"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => toggleStatus(item.id, status)}
                        className={`rounded-lg px-2 py-0.5 text-[10px] font-bold transition-colors ${
                          item.status === status
                            ? status === "Active"
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                              : status === "Treated"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {status === "Active"
                          ? isBangla
                            ? "সক্রিয়"
                            : "Active"
                          : status === "Treated"
                          ? isBangla
                            ? "চিকিৎসাধীন"
                            : "Treated"
                          : isBangla
                          ? "পর্যবেক্ষণ"
                          : "Monitoring"}
                      </button>
                    ))}
                  </div>

                  <Link href={`/crop-doctor?prompt=Tell me more about treating ${encodeURIComponent(item.disease)} on ${encodeURIComponent(item.crop)}`}>
                    <Button variant="ghost" size="sm" className="text-xs p-1.5">
                      <ExternalLink className="h-3.5 w-3.5 text-agri-600" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
