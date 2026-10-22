import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ||
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("🐘 PostgreSQL connected successfully via Prisma ORM");
  } catch (error) {
    console.error("⚠️ PostgreSQL connection failed. Ensure your database is running and DATABASE_URL is configured:", error);
  }
}
