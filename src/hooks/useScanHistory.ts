"use client";

import { useState, useEffect, useCallback } from "react";
import { HistoryItem } from "@/types/scanner";
import { getScanHistory, updateHistoryStatus, clearScanHistory } from "@/lib/storage";

export function useScanHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filterCrop, setFilterCrop] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const refreshHistory = useCallback(() => {
    setHistory(getScanHistory());
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const toggleStatus = (id: string, newStatus: "Active" | "Treated" | "Monitoring") => {
    updateHistoryStatus(id, newStatus);
    refreshHistory();
  };

  const clearAll = () => {
    clearScanHistory();
    refreshHistory();
  };

  const filteredHistory = history.filter((item) => {
    const matchesCrop = filterCrop === "All" || item.crop.toLowerCase() === filterCrop.toLowerCase();
    const matchesStatus = filterStatus === "All" || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesCrop && matchesStatus;
  });

  return {
    history: filteredHistory,
    totalCount: history.length,
    filterCrop,
    setFilterCrop,
    filterStatus,
    setFilterStatus,
    toggleStatus,
    clearAll,
    refreshHistory,
  };
}
