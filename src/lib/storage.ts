import { HistoryItem, ScanResult } from "@/types/scanner";
import { PredictionFeedback, FeedbackStats } from "@/types/feedback";
import { User } from "@/types/auth";
import { DiseaseInfo } from "@/types/disease";
import { DISEASES_DATABASE } from "@/data/diseasesDatabase";
import { apiClient } from "@/lib/apiClient";

const SCAN_HISTORY_KEY = "KRISHI_DRISHTI_SCAN_HISTORY";
const FEEDBACK_KEY = "KRISHI_DRISHTI_FEEDBACK";
const USERS_KEY = "KRISHI_DRISHTI_USERS";
const DISEASES_KEY = "KRISHI_DRISHTI_DISEASES";
const CONTENT_KEY = "KRISHI_DRISHTI_CONTENT";

/* -------------------------------------------------------------
 * 1. Scan History Storage
 * ----------------------------------------------------------- */

export function getScanHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SCAN_HISTORY_KEY);
    if (!raw) return getDefaultHistory();
    return JSON.parse(raw);
  } catch {
    return getDefaultHistory();
  }
}

export async function uploadLeafImage(imageData: string, filename?: string): Promise<string> {
  if (!imageData || !imageData.startsWith("data:")) return imageData;
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageData, filename }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url;
    }
  } catch (err) {
    console.warn("[uploadLeafImage] Failed to upload to storage provider:", err);
  }
  return imageData;
}

export function saveScanToHistory(result: ScanResult): HistoryItem {
  const item: HistoryItem = {
    id: result.scanId,
    date: result.timestamp,
    crop: result.cropDetected,
    banglaCrop: result.diagnosis.banglaCrop || result.banglaCropDetected,
    disease: result.diagnosis.commonName,
    banglaName: result.diagnosis.banglaName,
    confidence: result.diagnosis.confidence,
    severity: result.diagnosis.severity,
    imageUrl: result.imageUrl,
    status: result.diagnosis.severity === "Healthy" ? "Monitoring" : "Active",
    isLowConfidence: result.isLowConfidence,
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getScanHistory();
      const updated = [item, ...existing.filter((h) => h.id !== item.id)].slice(0, 100);
      localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(updated));

      // Asynchronously upload base64 to cloud/local storage and replace huge base64 with URL
      if (result.imageUrl && result.imageUrl.startsWith("data:")) {
        uploadLeafImage(result.imageUrl, result.imageName).then((persistentUrl) => {
          if (persistentUrl && persistentUrl !== result.imageUrl) {
            try {
              const currentHistory = getScanHistory();
              const replaced = currentHistory.map((h) =>
                h.id === result.scanId ? { ...h, imageUrl: persistentUrl } : h
              );
              localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(replaced));
            } catch {
              // ignore
            }
          }
        });
      }

      // Asynchronously persist to server backend
      apiClient.scans.saveScan(item).catch((err) => {
        console.warn("[storage] Background scan sync to server failed:", err);
      });
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
    localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(updated));

    // Asynchronously update status on server backend
    apiClient.scans.updateStatus(id, status).catch((err) => {
      console.warn("[storage] Background status sync to server failed:", err);
    });
  } catch (e) {
    console.warn("Failed to update scan history:", e);
  }
}

export function updateHistoryFeedback(id: string, feedbackRating: "accurate" | "inaccurate" | "unsure") {
  if (typeof window === "undefined") return;
  try {
    const existing = getScanHistory();
    const updated = existing.map((item) => (item.id === id ? { ...item, feedbackRating } : item));
    localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to update scan history feedback:", e);
  }
}

export function clearScanHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SCAN_HISTORY_KEY);
  } catch (e) {
    console.warn("Failed to clear scan history:", e);
  }
}

function getDefaultHistory(): HistoryItem[] {
  return [
    {
      id: "SCAN-HIST-001",
      date: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
      crop: "Potato",
      banglaCrop: "আলু",
      disease: "Late Blight",
      banglaName: "আলুর নাবী ধসা (লেট ব্লাইট)",
      confidence: 98.4,
      severity: "Severe",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80",
      status: "Active",
      isLowConfidence: false,
      feedbackRating: "accurate",
    },
    {
      id: "SCAN-HIST-002",
      date: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
      crop: "Tomato",
      banglaCrop: "টমেটো",
      disease: "Early Blight",
      banglaName: "টমেটোর আগাম ধসা রোগ",
      confidence: 96.8,
      severity: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=300&auto=format&fit=crop&q=80",
      status: "Treated",
      isLowConfidence: false,
      feedbackRating: "accurate",
    },
    {
      id: "SCAN-HIST-003",
      date: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
      crop: "Rice",
      banglaCrop: "ধান",
      disease: "Rice Blast",
      banglaName: "ধানের ব্লাস্ট রোগ",
      confidence: 97.2,
      severity: "Severe",
      imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&auto=format&fit=crop&q=80",
      status: "Active",
      isLowConfidence: false,
    },
    {
      id: "SCAN-HIST-004",
      date: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
      crop: "Tomato",
      banglaCrop: "টমেটো",
      disease: "Uncertain Foliar Symptoms",
      banglaName: "অস্পষ্ট বা মিশ্র রোগ লক্ষণ",
      confidence: 58.4,
      severity: "Mild",
      imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=300&auto=format&fit=crop&q=80",
      status: "Monitoring",
      isLowConfidence: true,
      feedbackRating: "unsure",
    },
    {
      id: "SCAN-HIST-005",
      date: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
      crop: "Tomato",
      banglaCrop: "টমেটো",
      disease: "Healthy Leaf (No Pathogen Detected)",
      banglaName: "সুস্থ ও সতেজ পাতা",
      confidence: 99.1,
      severity: "Healthy",
      imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=300&auto=format&fit=crop&q=80",
      status: "Monitoring",
      isLowConfidence: false,
      feedbackRating: "accurate",
    },
  ];
}

/* -------------------------------------------------------------
 * 2. Prediction Feedback Storage
 * ----------------------------------------------------------- */

export function getFeedbackList(): PredictionFeedback[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    if (!raw) return getDefaultFeedback();
    return JSON.parse(raw);
  } catch {
    return getDefaultFeedback();
  }
}

export function saveFeedback(
  feedback: Omit<PredictionFeedback, "id" | "createdAt" | "status">
): PredictionFeedback {
  const newFeedback: PredictionFeedback = {
    ...feedback,
    id: `FB-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getFeedbackList();
      const updated = [newFeedback, ...existing.filter((f) => f.scanId !== feedback.scanId)].slice(0, 200);
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));

      // Asynchronously sync to backend server
      apiClient.feedback.submit(feedback as any).catch((err) => {
        console.warn("[storage] Background feedback sync to server failed:", err);
      });
    } catch (e) {
      console.warn("Failed to persist feedback:", e);
    }
  }

  // Also update scan history item if present
  updateHistoryFeedback(feedback.scanId, feedback.rating);

  return newFeedback;
}

export function updateFeedbackStatus(id: string, status: "new" | "reviewed" | "flagged") {
  if (typeof window === "undefined") return;
  try {
    const existing = getFeedbackList();
    const updated = existing.map((f) => (f.id === id ? { ...f, status } : f));
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));

    // Asynchronously sync status update to backend server
    apiClient.feedback.updateStatus(id, status).catch((err) => {
      console.warn("[storage] Background feedback status sync failed:", err);
    });
  } catch (e) {
    console.warn("Failed to update feedback status:", e);
  }
}

export function getFeedbackStats(): FeedbackStats {
  const list = getFeedbackList();
  const total = list.length;
  const accurateCount = list.filter((f) => f.rating === "accurate").length;
  const inaccurateCount = list.filter((f) => f.rating === "inaccurate").length;
  const unsureCount = list.filter((f) => f.rating === "unsure").length;
  const accuracyRate = total > 0 ? Math.round((accurateCount / total) * 100) : 95;

  return {
    total,
    accurateCount,
    inaccurateCount,
    unsureCount,
    accuracyRate,
  };
}

function getDefaultFeedback(): PredictionFeedback[] {
  return [
    {
      id: "FB-001",
      scanId: "SCAN-HIST-001",
      crop: "Potato",
      disease: "Late Blight",
      banglaDisease: "আলুর নাবী ধসা (লেট ব্লাইট)",
      confidence: 98.4,
      rating: "accurate",
      comment: "মুন্সীগঞ্জের জমিতে হুবহু এই লক্ষণ দেখা গিয়েছিল। কুয়াশার পর রোগটি হয়েছিল। সঠিক প্রেডিকশন।",
      userName: "মোঃ রফিকুল ইসলাম (কৃষক, বগুড়া)",
      createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      status: "reviewed",
    },
    {
      id: "FB-002",
      scanId: "SCAN-HIST-002",
      crop: "Tomato",
      disease: "Early Blight",
      banglaDisease: "টমেটোর আগাম ধসা রোগ",
      confidence: 96.8,
      rating: "accurate",
      comment: "টার্গেট বোর্ডের রিং দেখে নিশ্চিত হয়েছি। ছত্রাকনাশক স্প্রে করার পর আক্রমণ নিয়ন্ত্রণে এসেছে।",
      userName: "আমিনুল হক (সবজি চাষী)",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      status: "reviewed",
    },
    {
      id: "FB-003",
      scanId: "SCAN-HIST-004",
      crop: "Tomato",
      disease: "Uncertain Foliar Symptoms",
      banglaDisease: "অস্পষ্ট বা মিশ্র রোগ লক্ষণ",
      confidence: 58.4,
      rating: "unsure",
      comment: "ছবির আলো কম ছিল। পরে কৃষি অফিসারের কাছে গিয়ে জেনেছি এটি জিংকের ঘাটতি ছিল।",
      userName: "আব্দুল কাদের",
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      status: "flagged",
    },
  ];
}

/* -------------------------------------------------------------
 * 3. User Accounts Storage
 * ----------------------------------------------------------- */

export const INITIAL_USERS: User[] = [
  {
    id: "usr-admin-01",
    name: "অ্যাডমিন (KrishiDrishti Admin)",
    email: "admin@krishi.gov.bd",
    phone: "01711000001",
    role: "admin",
    district: "ঢাকা",
    upazila: "মিরপুর",
    createdAt: "2026-01-01T00:00:00.000Z",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "usr-farmer-01",
    name: "মোঃ রফিকুল ইসলাম",
    email: "farmer@krishi.gov.bd",
    phone: "01722000002",
    role: "farmer",
    district: "বগুড়া",
    upazila: "শিবগঞ্জ",
    createdAt: "2026-02-15T00:00:00.000Z",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "usr-expert-01",
    name: "ড. নাজমুল হুদা (কৃষি সম্প্রসারণ কর্মকর্তা)",
    email: "expert@krishi.gov.bd",
    phone: "01733000003",
    role: "expert",
    district: "গাজীপুর",
    upazila: "জয়দেবপুর",
    createdAt: "2026-03-01T00:00:00.000Z",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
];

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return INITIAL_USERS;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

export function saveUser(user: User): void {
  if (typeof window === "undefined") return;
  try {
    const users = getStoredUsers();
    const updated = [user, ...users.filter((u) => u.id !== user.id)];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to persist user:", e);
  }
}

export function updateUser(user: User): void {
  if (typeof window === "undefined") return;
  try {
    const users = getStoredUsers();
    const updated = users.map((u) => (u.id === user.id ? user : u));
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to update user:", e);
  }
}

export function deleteUser(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const users = getStoredUsers();
    const updated = users.filter((u) => u.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to delete user:", e);
  }
}

/* -------------------------------------------------------------
 * 4. Disease Knowledge Base Storage (Admin editable)
 * ----------------------------------------------------------- */

export function getStoredDiseases(): DiseaseInfo[] {
  if (typeof window === "undefined") return DISEASES_DATABASE;
  try {
    const raw = localStorage.getItem(DISEASES_KEY);
    if (!raw) {
      localStorage.setItem(DISEASES_KEY, JSON.stringify(DISEASES_DATABASE));
      return DISEASES_DATABASE;
    }
    return JSON.parse(raw);
  } catch {
    return DISEASES_DATABASE;
  }
}

export function saveStoredDisease(disease: DiseaseInfo): void {
  if (typeof window === "undefined") return;
  try {
    const diseases = getStoredDiseases();
    const index = diseases.findIndex((d) => d.id === disease.id);
    let updated: DiseaseInfo[];
    if (index >= 0) {
      updated = diseases.map((d) => (d.id === disease.id ? disease : d));
    } else {
      updated = [disease, ...diseases];
    }
    localStorage.setItem(DISEASES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save disease:", e);
  }
}

export function deleteStoredDisease(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const diseases = getStoredDiseases();
    const updated = diseases.filter((d) => d.id !== id);
    localStorage.setItem(DISEASES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to delete disease:", e);
  }
}

/* -------------------------------------------------------------
 * 5. Content Management (FAQs & Notices)
 * ----------------------------------------------------------- */

export interface AgriculturalNotice {
  id: string;
  title: string;
  banglaTitle: string;
  content: string;
  banglaContent: string;
  category: "alert" | "guideline" | "news";
  date: string;
  active: boolean;
}

const DEFAULT_NOTICES: AgriculturalNotice[] = [
  {
    id: "not-01",
    title: "Cold Wave Alert for Potato & Boro Seedbeds",
    banglaTitle: "চলতি শৈত্যপ্রবাহে আলু ও বোরো ধানের বীজতলার সুরক্ষায় বিশেষ সতর্কতা",
    content: "Cover seedbeds with polythene sheets at night and drain cold water in the morning. Inspect potato leaves for early water-soaked spots.",
    banglaContent: "রাতে বীজতলা স্বচ্ছ পলিথিন দিয়ে ঢেকে রাখুন এবং সকালে তুলে ফেলুন। আলুর পাতায় জলছাপযুক্ত দাগ দেখা দেওয়া মাত্র অনুমোদিত প্রতিরোধক ছত্রাকনাশক স্প্রে করুন।",
    category: "alert",
    date: "২০২৬-১০-১৯",
    active: true,
  },
  {
    id: "not-02",
    title: "Safe Pesticide Application Notice",
    banglaTitle: "কীটনাশক প্রয়োগে সংবিধিবদ্ধ স্বাস্থ্য ও নিরাপত্তা বিধি",
    content: "Never guess dosage. Use personal protective equipment, mask, and spray in late afternoon.",
    banglaContent: "কীটনাশকের ডোজ কখনই অনুমান করে প্রয়োগ করবেন না। গ্লাভস ও মাস্ক পরিধান করুন এবং বাতাসের অনুকূলে বিকেলে স্প্রে করুন।",
    category: "guideline",
    date: "২০২৬-১০-১৫",
    active: true,
  },
];

export function getStoredNotices(): AgriculturalNotice[] {
  if (typeof window === "undefined") return DEFAULT_NOTICES;
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (!raw) {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(DEFAULT_NOTICES));
      return DEFAULT_NOTICES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTICES;
  }
}

export function saveStoredNotice(notice: AgriculturalNotice): void {
  if (typeof window === "undefined") return;
  try {
    const notices = getStoredNotices();
    const index = notices.findIndex((n) => n.id === notice.id);
    let updated: AgriculturalNotice[];
    if (index >= 0) {
      updated = notices.map((n) => (n.id === notice.id ? notice : n));
    } else {
      updated = [notice, ...notices];
    }
    localStorage.setItem(CONTENT_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save notice:", e);
  }
}
