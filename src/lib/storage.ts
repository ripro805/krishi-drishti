import { HistoryItem, ScanResult } from "@/types/scanner";

const STORAGE_KEY = "KRISHI_DRISHTI_SCAN_HISTORY";

export function getScanHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultHistory();
    return JSON.parse(raw);
  } catch {
    return getDefaultHistory();
  }
}

export function saveScanToHistory(result: ScanResult): HistoryItem {
  const item: HistoryItem = {
    id: result.scanId,
    date: result.timestamp,
    crop: result.cropDetected,
    disease: result.diagnosis.commonName,
    confidence: result.diagnosis.confidence,
    severity: result.diagnosis.severity,
    imageUrl: result.imageUrl,
    status: result.diagnosis.severity === "Healthy" ? "Monitoring" : "Active",
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getScanHistory();
      const updated = [item, ...existing.filter((h) => h.id !== item.id)].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to persist scan history:", e);
    }
  }

  return item;
}

export function updateHistoryStatus(id: string, status: "Active" | "Treated" | "Monitoring") {
  if (typeof window === "undefined") return;
  try {
    const existing = getScanHistory();
    const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to update scan history:", e);
  }
}

export function clearScanHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear scan history:", e);
  }
}

function getDefaultHistory(): HistoryItem[] {
  return [
    {
      id: "SCAN-HIST-001",
      date: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      crop: "Tomato",
      disease: "Early Blight",
      confidence: 96.8,
      severity: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=300&auto=format&fit=crop&q=80",
      status: "Treated",
    },
    {
      id: "SCAN-HIST-002",
      date: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
      crop: "Potato",
      disease: "Late Blight",
      confidence: 98.4,
      severity: "Severe",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80",
      status: "Active",
    },
    {
      id: "SCAN-HIST-003",
      date: new Date(Date.now() - 3600000 * 24 * 8).toISOString(),
      crop: "Corn (Maize)",
      disease: "Common Rust",
      confidence: 94.6,
      severity: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&auto=format&fit=crop&q=80",
      status: "Treated",
    },
    {
      id: "SCAN-HIST-004",
      date: new Date(Date.now() - 3600000 * 24 * 12).toISOString(),
      crop: "Tomato",
      disease: "Healthy Leaf (Control)",
      confidence: 99.1,
      severity: "Healthy",
      imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=300&auto=format&fit=crop&q=80",
      status: "Monitoring",
    },
  ];
}
