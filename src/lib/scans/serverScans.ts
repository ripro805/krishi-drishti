import fs from "fs";
import path from "path";

export interface StoredScan {
  id: string;
  scanCode: string;
  userId: string | null;
  crop: string;
  banglaCrop: string;
  disease: string;
  banglaName: string;
  confidence: number;
  severity: "Healthy" | "Mild" | "Moderate" | "Severe";
  imageUrl: string;
  imageName?: string;
  status: "Active" | "Treated" | "Monitoring";
  isLowConfidence: boolean;
  feedbackRating?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

const STORE_FILE = path.join(process.cwd(), "src", "data", "scans_store.json");

const SEEDED_SCANS: StoredScan[] = [
  {
    id: "SCAN-HIST-001",
    scanCode: "SCAN-POTATO-001",
    userId: "usr-farmer-002",
    crop: "Potato",
    banglaCrop: "আলু",
    disease: "Late Blight",
    banglaName: "আলুর নাবী ধসা (লেট ব্লাইট)",
    confidence: 98.4,
    severity: "Severe",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    imageName: "potato_late_blight_field.jpg",
    status: "Active",
    isLowConfidence: false,
    feedbackRating: "accurate",
    createdAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
  },
  {
    id: "SCAN-HIST-002",
    scanCode: "SCAN-TOMATO-002",
    userId: "usr-farmer-002",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    disease: "Early Blight",
    banglaName: "টমেটোর আগাম ধসা রোগ",
    confidence: 96.8,
    severity: "Moderate",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?w=600&auto=format&fit=crop&q=80",
    imageName: "tomato_early_blight_leaf.jpg",
    status: "Treated",
    isLowConfidence: false,
    feedbackRating: "accurate",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  },
  {
    id: "SCAN-HIST-003",
    scanCode: "SCAN-RICE-003",
    userId: "usr-farmer-002",
    crop: "Rice",
    banglaCrop: "ধান",
    disease: "Rice Blast",
    banglaName: "ধানের ব্লাস্ট রোগ",
    confidence: 97.2,
    severity: "Severe",
    imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
    imageName: "rice_blast_leaf.jpg",
    status: "Active",
    isLowConfidence: false,
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
  {
    id: "SCAN-HIST-004",
    scanCode: "SCAN-TOMATO-004",
    userId: "usr-farmer-002",
    crop: "Tomato",
    banglaCrop: "টমেটো",
    disease: "Uncertain Foliar Symptoms",
    banglaName: "অস্পষ্ট বা মিশ্র রোগ লক্ষণ",
    confidence: 58.4,
    severity: "Mild",
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop&q=80",
    imageName: "uncertain_foliar.jpg",
    status: "Monitoring",
    isLowConfidence: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
  },
];

function loadScans(): Map<string, StoredScan> {
  const map = new Map<string, StoredScan>();

  if (fs.existsSync(STORE_FILE)) {
    try {
      const content = fs.readFileSync(STORE_FILE, "utf-8");
      const list: StoredScan[] = JSON.parse(content);
      for (const item of list) {
        map.set(item.id, item);
      }
      return map;
    } catch (e) {
      console.warn("[serverScans] Failed to parse scans store, reseeding:", e);
    }
  }

  for (const item of SEEDED_SCANS) {
    map.set(item.id, item);
  }

  saveToFile(map);
  return map;
}

function saveToFile(map: Map<string, StoredScan>) {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = Array.from(map.values());
    fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.warn("[serverScans] Failed to write scans store:", e);
  }
}

declare global {
  var __KRISHI_SCANS_DB__: Map<string, StoredScan> | undefined;
}

function getScansDB(): Map<string, StoredScan> {
  if (!globalThis.__KRISHI_SCANS_DB__) {
    globalThis.__KRISHI_SCANS_DB__ = loadScans();
  }
  return globalThis.__KRISHI_SCANS_DB__;
}

export interface ScanQueryOptions {
  userId?: string | null;
  userRole?: string;
  crop?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getScansList(options: ScanQueryOptions = {}): Promise<{
  scans: StoredScan[];
  total: number;
  page: number;
  limit: number;
}> {
  const db = getScansDB();
  let list = Array.from(db.values());

  // Filter by user ownership if not admin/expert
  if (options.userId && options.userRole !== "admin" && options.userRole !== "expert") {
    list = list.filter((s) => s.userId === options.userId || s.userId === null);
  } else if (!options.userId && options.userRole !== "admin") {
    // Guest view: return public/demo scans
    list = list.filter((s) => s.userId === null || s.userId === "usr-farmer-002");
  }

  // Filter by Crop
  if (options.crop && options.crop.toLowerCase() !== "all") {
    list = list.filter(
      (s) =>
        s.crop.toLowerCase() === options.crop?.toLowerCase() ||
        s.banglaCrop === options.crop
    );
  }

  // Filter by Status
  if (options.status && options.status.toLowerCase() !== "all") {
    list = list.filter((s) => s.status.toLowerCase() === options.status?.toLowerCase());
  }

  // Sort descending by date
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = list.length;
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, Math.min(100, options.limit || 50));
  const offset = (page - 1) * limit;
  const paginated = list.slice(offset, offset + limit);

  return {
    scans: paginated,
    total,
    page,
    limit,
  };
}

export async function getScanById(id: string): Promise<StoredScan | null> {
  const db = getScansDB();
  return db.get(id) || null;
}

export async function createScanRecord(
  data: {
    id?: string;
    crop: string;
    banglaCrop?: string;
    disease: string;
    banglaName?: string;
    confidence: number;
    severity?: "Healthy" | "Mild" | "Moderate" | "Severe";
    imageUrl: string;
    imageName?: string;
    status?: "Active" | "Treated" | "Monitoring";
    isLowConfidence?: boolean;
    metadata?: Record<string, any>;
  },
  user?: { id?: string; role?: string } | null
): Promise<StoredScan> {
  const db = getScansDB();
  const id = data.id || `SCAN-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const scanCode = `SCAN-${data.crop.toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;

  // Ensure Base64 images are not saved directly as large raw strings in persistent storage
  let storedImageUrl = data.imageUrl;
  if (storedImageUrl && storedImageUrl.startsWith("data:image")) {
    try {
      const publicUploads = path.join(process.cwd(), "public", "uploads", "scans");
      if (!fs.existsSync(publicUploads)) {
        fs.mkdirSync(publicUploads, { recursive: true });
      }
      const extMatch = storedImageUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
      const ext = extMatch ? extMatch[1] : "png";
      const base64Data = storedImageUrl.replace(/^data:image\/[a-zA-Z0-9]+;base64,/, "");
      const fileName = `leaf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = path.join(publicUploads, fileName);
      fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
      storedImageUrl = `/uploads/scans/${fileName}`;
    } catch (e) {
      console.warn("[serverScans] Could not offload base64 image to local disk:", e);
    }
  }

  const newScan: StoredScan = {
    id,
    scanCode,
    userId: user?.id || null,
    crop: data.crop,
    banglaCrop: data.banglaCrop || data.crop,
    disease: data.disease,
    banglaName: data.banglaName || data.disease,
    confidence: Number(data.confidence) || 90.0,
    severity: data.severity || (data.confidence < 70 ? "Mild" : "Moderate"),
    imageUrl: storedImageUrl,
    imageName: data.imageName || "leaf_scan.jpg",
    status: data.status || (data.severity === "Healthy" ? "Monitoring" : "Active"),
    isLowConfidence: !!data.isLowConfidence,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: data.metadata || {},
  };

  db.set(id, newScan);
  saveToFile(db);
  return newScan;
}

export async function updateScanStatus(
  id: string,
  status: "Active" | "Treated" | "Monitoring",
  user?: { id?: string; role?: string } | null
): Promise<StoredScan | null> {
  const db = getScansDB();
  const scan = db.get(id);
  if (!scan) return null;

  // Authorization check
  if (user && user.role !== "admin" && scan.userId && scan.userId !== user.id) {
    throw new Error("Forbidden: You cannot modify another user's scan");
  }

  scan.status = status;
  scan.updatedAt = new Date().toISOString();
  db.set(id, scan);
  saveToFile(db);
  return scan;
}

export async function deleteScanRecord(
  id: string,
  user?: { id?: string; role?: string } | null
): Promise<boolean> {
  const db = getScansDB();
  const scan = db.get(id);
  if (!scan) return false;

  // Authorization check
  if (user && user.role !== "admin" && scan.userId && scan.userId !== user.id) {
    throw new Error("Forbidden: You cannot delete another user's scan");
  }

  db.delete(id);
  saveToFile(db);
  return true;
}
