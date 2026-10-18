"use client";

import React from "react";
import Link from "next/link";
import { useScanHistory } from "@/hooks/useScanHistory";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { formatDate } from "@/lib/utils";
import {
  History,
  Trash2,
  Scan,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function HistoryPage() {
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
            Field Outbreak History
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Scan History & Health Tracking
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Log of previously analyzed field samples, infection progress, and remediation statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/scan">
            <Button size="sm">
              <Scan className="h-4 w-4 mr-1.5" />
              Scan New Leaf
            </Button>
          </Link>
          {totalCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-rose-600 hover:bg-rose-50">
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Log
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Filter Crop:
          </span>
          {["All", "Tomato", "Potato", "Corn (Maize)"].map((crop) => (
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
              {crop}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Status:</span>
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
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* History Table / Cards */}
      {history.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
          <History className="mx-auto h-12 w-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Historical Scans Found
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Run an AI diagnosis using our leaf scanner to automatically log health records and treatment progress.
          </p>
          <Link href="/scan" className="mt-4 inline-block">
            <Button size="sm">Go to Scanner</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 hover:border-agri-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.disease}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.disease}
                    </h3>
                    <Badge
                      size="sm"
                      variant={
                        item.severity === "Healthy"
                          ? "success"
                          : item.severity === "Severe"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {item.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Crop: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.crop}</span> &bull; Confidence: {item.confidence.toFixed(1)}% &bull; Scanned: {formatDate(item.date)}
                  </p>
                </div>
              </div>

              {/* Status Toggler */}
              <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                <span className="text-slate-400">Treatment Status:</span>
                <select
                  value={item.status}
                  onChange={(e) =>
                    toggleStatus(item.id, e.target.value as "Active" | "Treated" | "Monitoring")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="Active">🔴 Active Infection</option>
                  <option value="Treated">🟢 Treated / Controlled</option>
                  <option value="Monitoring">🟡 Monitoring</option>
                </select>

                <Link href={`/crop-doctor?prompt=Review past diagnosis for ${encodeURIComponent(item.disease)} on ${encodeURIComponent(item.crop)}`}>
                  <Button variant="ghost" size="sm" className="text-xs p-2">
                    <ExternalLink className="h-4 w-4 text-agri-600" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
