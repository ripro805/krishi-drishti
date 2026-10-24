import fs from "fs";
import path from "path";

export interface StoredFeedback {
  id: string;
  scanId: string;
  userId?: string | null;
  crop: string;
  disease: string;
  banglaDisease?: string;
  confidence: number;
  rating: "accurate" | "inaccurate" | "unsure";
  comment?: string;
  userName?: string;
  status: "new" | "reviewed" | "flagged";
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackStats {
  total: number;
  accurateCount: number;
  inaccurateCount: number;
  unsureCount: number;
  accuracyRate: number;
}

const STORE_FILE = path.join(process.cwd(), "src", "data", "feedback_store.json");

const SEEDED_FEEDBACK: StoredFeedback[] = [
  {
    id: "FB-001",
    scanId: "SCAN-HIST-001",
    userId: "usr-farmer-002",
    crop: "Potato",
    disease: "Late Blight",
    banglaDisease: "আলুর নাবী ধসা (লেট ব্লাইট)",
    confidence: 98.4,
    rating: "accurate",
    comment: "মুন্সীগঞ্জের জমিতে হুবহু এই লক্ষণ দেখা গিয়েছিল। কুয়াশার পর রোগটি হয়েছিল। সঠিক প্রেডিকশন।",
    userName: "মোঃ রফিকুল ইসলাম (কৃষক)",
    status: "reviewed",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: "FB-002",
    scanId: "SCAN-HIST-002",
    userId: "usr-farmer-002",
    crop: "Tomato",
    disease: "Early Blight",
    banglaDisease: "টমেটোর আগাম ধসা রোগ",
    confidence: 96.8,
    rating: "accurate",
    comment: "নিচের পাতায় কনসেন্ট্রিক রিং দাগ ছিল। ম্যানকোজেব স্প্রে করে উপকার পেয়েছি।",
    userName: "সেলিনা পারভীন (কৃষি উদ্যোক্তা)",
    status: "reviewed",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "FB-003",
    scanId: "SCAN-HIST-003",
    userId: "usr-farmer-002",
    crop: "Rice",
    disease: "Rice Blast",
    banglaDisease: "ধানের ব্লাস্ট রোগ",
    confidence: 97.2,
    rating: "accurate",
    comment: "ধানের পাতায় চোখের মতো ডিম্বাকৃতি দাগ। লক্ষণ পুরোপুরি মিলেছে।",
    userName: "আব্দুল করিম (বোরো চাষি)",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: "FB-004",
    scanId: "SCAN-HIST-004",
    userId: "usr-farmer-002",
    crop: "Tomato",
    disease: "Uncertain Foliar Symptoms",
    banglaDisease: "অস্পষ্ট বা মিশ্র রোগ লক্ষণ",
    confidence: 58.4,
    rating: "unsure",
    comment: "পাতায় হলুদ ছোপ ছিল তবে ঠিক বোঝা যাচ্ছিল না। বিশেষজ্ঞের পরামর্শ চেয়েছি।",
    userName: "জাহাঙ্গীর আলম (টমেটো চাষি)",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
];

function loadFeedback(): Map<string, StoredFeedback> {
  const map = new Map<string, StoredFeedback>();

  if (fs.existsSync(STORE_FILE)) {
    try {
      const content = fs.readFileSync(STORE_FILE, "utf-8");
      const list: StoredFeedback[] = JSON.parse(content);
      for (const item of list) {
        map.set(item.id, item);
      }
      return map;
    } catch (e) {
      console.warn("[serverFeedback] Failed to parse feedback store, reseeding:", e);
    }
  }

  for (const item of SEEDED_FEEDBACK) {
    map.set(item.id, item);
  }

  saveToFile(map);
  return map;
}

function saveToFile(map: Map<string, StoredFeedback>) {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = Array.from(map.values());
    fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.warn("[serverFeedback] Failed to write feedback store:", e);
  }
}

declare global {
  var __KRISHI_FEEDBACK_DB__: Map<string, StoredFeedback> | undefined;
}

function getFeedbackDB(): Map<string, StoredFeedback> {
  if (!globalThis.__KRISHI_FEEDBACK_DB__) {
    globalThis.__KRISHI_FEEDBACK_DB__ = loadFeedback();
  }
  return globalThis.__KRISHI_FEEDBACK_DB__;
}

export async function submitFeedbackRecord(
  data: {
    scanId: string;
    crop: string;
    disease: string;
    banglaDisease?: string;
    confidence: number;
    rating: "accurate" | "inaccurate" | "unsure";
    comment?: string;
    userName?: string;
    userId?: string | null;
  }
): Promise<StoredFeedback> {
  // 1. Validation
  if (!["accurate", "inaccurate", "unsure"].includes(data.rating)) {
    throw new Error("Invalid rating. Must be 'accurate', 'inaccurate', or 'unsure'.");
  }

  if (data.comment && data.comment.length > 500) {
    throw new Error("Comment exceeds maximum length of 500 characters.");
  }

  const db = getFeedbackDB();

  // Check for existing feedback on this scanId to upsert cleanly
  let existingId: string | null = null;
  for (const f of Array.from(db.values())) {
    if (f.scanId === data.scanId) {
      existingId = f.id;
      break;
    }
  }

  const id = existingId || `FB-${Date.now().toString(36).toUpperCase()}`;
  const now = new Date().toISOString();

  const record: StoredFeedback = {
    id,
    scanId: data.scanId,
    userId: data.userId || null,
    crop: data.crop,
    disease: data.disease,
    banglaDisease: data.banglaDisease || data.disease,
    confidence: Number(data.confidence) || 0,
    rating: data.rating,
    comment: data.comment?.trim() || undefined,
    userName: data.userName || "কৃষক (Farmer)",
    status: "new",
    createdAt: existingId && db.get(existingId)?.createdAt ? db.get(existingId)!.createdAt : now,
    updatedAt: now,
  };

  db.set(id, record);
  saveToFile(db);

  return record;
}

export async function getFeedbackListServer(options: {
  status?: string;
  rating?: string;
} = {}): Promise<{
  feedbackList: StoredFeedback[];
  stats: FeedbackStats;
}> {
  const db = getFeedbackDB();
  let list = Array.from(db.values());

  // Filter by rating
  if (options.rating && options.rating.toLowerCase() !== "all") {
    list = list.filter((f) => f.rating.toLowerCase() === options.rating?.toLowerCase());
  }

  // Filter by status
  if (options.status && options.status.toLowerCase() !== "all") {
    list = list.filter((f) => f.status.toLowerCase() === options.status?.toLowerCase());
  }

  // Sort descending by creation date
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Calculate stats from all stored records
  const allList = Array.from(db.values());
  const total = allList.length;
  const accurateCount = allList.filter((f) => f.rating === "accurate").length;
  const inaccurateCount = allList.filter((f) => f.rating === "inaccurate").length;
  const unsureCount = allList.filter((f) => f.rating === "unsure").length;
  const accuracyRate = total > 0 ? Math.round((accurateCount / total) * 100) : 95;

  return {
    feedbackList: list,
    stats: {
      total,
      accurateCount,
      inaccurateCount,
      unsureCount,
      accuracyRate,
    },
  };
}

export async function updateFeedbackStatusServer(
  id: string,
  status: "new" | "reviewed" | "flagged"
): Promise<StoredFeedback | null> {
  if (!["new", "reviewed", "flagged"].includes(status)) {
    throw new Error("Invalid status. Must be 'new', 'reviewed', or 'flagged'.");
  }

  const db = getFeedbackDB();
  const record = db.get(id);
  if (!record) return null;

  record.status = status;
  record.updatedAt = new Date().toISOString();
  db.set(id, record);
  saveToFile(db);

  return record;
}
