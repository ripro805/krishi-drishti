import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/krishi_drishti?schema=public",
  JWT_SECRET: process.env.JWT_SECRET || "krishi-drishti-super-secret-jwt-key-2026-bangladesh-agri",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  DISEASE_MODEL_API_URL: process.env.DISEASE_MODEL_API_URL || "http://localhost:8000/api/predict",
  CROP_DOCTOR_LLM_API_URL: process.env.CROP_DOCTOR_LLM_API_URL || "https://generativelanguage.googleapis.com/v1beta",
  CROP_DOCTOR_API_KEY: process.env.CROP_DOCTOR_API_KEY || "",
};
