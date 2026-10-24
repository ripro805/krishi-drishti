"use client";

import { useState, useEffect, useCallback } from "react";
import { HistoryItem } from "@/types/scanner";
import { getScanHistory, updateHistoryStatus, clearScanHistory } from "@/lib/storage";
import { apiClient } from "@/lib/apiClient";

export function useScanHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCrop, setFilterCrop] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const refreshHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch from server API
      const res = await apiClient.scans.getHistory({
        crop: filterCrop,
        status: filterStatus,
      });

      if (res?.scans) {
        const formatted: HistoryItem[] = res.scans.map((s: any) => ({
          id: s.id,
          date: s.createdAt || s.date,
          crop: s.crop,
          banglaCrop: s.banglaCrop,
          disease: s.disease,
          banglaName: s.banglaName,
          confidence: s.confidence,
          severity: s.severity,
          imageUrl: s.imageUrl,
          status: s.status,
          isLowConfidence: s.isLowConfidence,
          feedbackRating: s.feedbackRating,
        }));

        setHistory(formatted);
        setTotalCount(res.total ?? formatted.length);
      } else {
        // Fallback to local storage
        const local = getScanHistory();
        setHistory(local);
        setTotalCount(local.length);
      }
    } catch (err: any) {
      console.warn("[useScanHistory] API retrieval failed, falling back to local cache:", err);
      const local = getScanHistory();
      setHistory(local);
      setTotalCount(local.length);
      setError(null); // Don't crash UI, show cached data
    } finally {
      setIsLoading(false);
    }
  }, [filterCrop, filterStatus]);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const toggleStatus = async (id: string, newStatus: "Active" | "Treated" | "Monitoring") => {
    // Optimistic UI update
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    updateHistoryStatus(id, newStatus);

    try {
      await apiClient.scans.updateStatus(id, newStatus);
    } catch (err) {
      console.error("[useScanHistory] Failed to update scan status on server:", err);
    }
  };

  const deleteScan = async (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    try {
      await apiClient.scans.deleteScan(id);
    } catch (err) {
      console.error("[useScanHistory] Failed to delete scan on server:", err);
    }
  };

  const clearAll = () => {
    clearScanHistory();
    setHistory([]);
    setTotalCount(0);
  };

  const filteredHistory = history.filter((item) => {
    const matchesCrop = filterCrop === "All" || item.crop.toLowerCase() === filterCrop.toLowerCase();
    const matchesStatus = filterStatus === "All" || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesCrop && matchesStatus;
  });

  return {
    history: filteredHistory,
    totalCount: filteredHistory.length || totalCount,
    isLoading,
    error,
    filterCrop,
    setFilterCrop,
    filterStatus,
    setFilterStatus,
    toggleStatus,
    deleteScan,
    clearAll,
    refreshHistory,
  };
}
