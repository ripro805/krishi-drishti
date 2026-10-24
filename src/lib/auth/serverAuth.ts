import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "krishi-drishti-jwt-secret-key-2026-production";
const JWT_EXPIRES_IN = "7d";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: "farmer" | "expert" | "admin";
  district?: string;
  upazila?: string;
  avatar?: string;
  createdAt: string;
}

const STORE_FILE = path.join(process.cwd(), "src", "data", "users_store.json");

function loadUsers(): Map<string, StoredUser> {
  const map = new Map<string, StoredUser>();

  // Check file store
  if (fs.existsSync(STORE_FILE)) {
    try {
      const content = fs.readFileSync(STORE_FILE, "utf-8");
      const list: StoredUser[] = JSON.parse(content);
      for (const u of list) {
        map.set(u.email.toLowerCase().trim(), u);
      }
      return map;
    } catch {
      // ignore
    }
  }

  // Preload default seeded users with synchronous bcrypt hashes
  const adminHash = "$2a$10$Ua6QeN8qL2g0lGgN3Vl5u.1Ld2F/W/qBf8Z/O1V2U3X4Y5Z6a7b8c"; // admin123
  const farmerHash = "$2a$10$Ua6QeN8qL2g0lGgN3Vl5u.1Ld2F/W/qBf8Z/O1V2U3X4Y5Z6a7b8c"; // farmer123
  const expertHash = "$2a$10$Ua6QeN8qL2g0lGgN3Vl5u.1Ld2F/W/qBf8Z/O1V2U3X4Y5Z6a7b8c"; // expert123

  map.set("admin@krishidrishti.gov.bd", {
    id: "usr-admin-001",
    name: "Dr. Anisur Rahman",
    email: "admin@krishidrishti.gov.bd",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
    phone: "01711000001",
    district: "ঢাকা",
    upazila: "ধানমন্ডি",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  });

  map.set("farmer@krishidrishti.gov.bd", {
    id: "usr-farmer-002",
    name: "Md. Rafiqul Islam",
    email: "farmer@krishidrishti.gov.bd",
    passwordHash: bcrypt.hashSync("farmer123", 10),
    role: "farmer",
    phone: "01722000002",
    district: "বগুড়া",
    upazila: "শেরপুর",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  });

  map.set("expert@krishidrishti.gov.bd", {
    id: "usr-expert-003",
    name: "Nasrin Akhter",
    email: "expert@krishidrishti.gov.bd",
    passwordHash: bcrypt.hashSync("expert123", 10),
    role: "expert",
    phone: "01733000003",
    district: "ময়মনসিংহ",
    upazila: "সদর",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  });

  saveToFile(map);
  return map;
}

function saveToFile(map: Map<string, StoredUser>) {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const list = Array.from(map.values());
    fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.warn("[serverAuth] Failed to write users store:", e);
  }
}

// Global reference
declare global {
  var __KRISHI_USERS_DB__: Map<string, StoredUser> | undefined;
}

function getUsersDB(): Map<string, StoredUser> {
  if (!globalThis.__KRISHI_USERS_DB__) {
    globalThis.__KRISHI_USERS_DB__ = loadUsers();
  }
  return globalThis.__KRISHI_USERS_DB__;
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function generateToken(user: StoredUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAuthToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const db = getUsersDB();
  const normalized = email.toLowerCase().trim();
  return db.get(normalized) || null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const db = getUsersDB();
  for (const user of Array.from(db.values())) {
    if (user.id === id) return user;
  }
  return null;
}

export async function saveNewUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role?: "farmer" | "expert" | "admin";
  district?: string;
  upazila?: string;
}): Promise<StoredUser> {
  const db = getUsersDB();
  const normalized = data.email.toLowerCase().trim();
  const id = `usr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  
  const newUser: StoredUser = {
    id,
    name: data.name.trim(),
    email: normalized,
    passwordHash: data.passwordHash,
    phone: data.phone?.trim() || "01700000000",
    role: data.role || "farmer",
    district: data.district || "ঢাকা",
    upazila: data.upazila || "",
    avatar:
      data.role === "admin"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
        : data.role === "expert"
        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  };

  db.set(normalized, newUser);
  saveToFile(db);
  return newUser;
}
