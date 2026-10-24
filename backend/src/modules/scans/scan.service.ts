import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { CreateScanInput } from "./scan.validation.js";
import { runDiseaseInference } from "../../ai/disease-detector/model.stub.js";
import { Prisma } from "@prisma/client";

export interface ScanFilterOptions {
  userId?: string;
  crop?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export class ScanService {
  static async createScan(input: CreateScanInput, userId?: string) {
    // 1. Run disease detection inference via AI model subsystem
    const inference = await runDiseaseInference({
      imageUrl: input.imageUrl,
      imageName: input.imageName,
      cropHint: input.cropHint,
      matchedDiseaseId: input.matchedDiseaseId,
    });

    // 2. Fetch full disease information from database if available
    let disease = await prisma.disease.findUnique({
      where: { id: inference.diseaseId },
    });

    // Fallback if disease record isn't in db yet
    if (!disease && input.cropHint) {
      disease = await prisma.disease.findFirst({
        where: { crop: { equals: input.cropHint, mode: "insensitive" } },
      });
    }

    const scanCode = `SCAN-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Persist scan in PostgreSQL database
    const scan = await prisma.scan.create({
      data: {
        scanCode,
        userId: userId || null,
        cropDetected: inference.crop,
        banglaCropDetected: inference.banglaCrop || disease?.banglaCrop || null,
        diseaseId: disease?.id || null,
        diseaseName: disease?.commonName || inference.diseaseName,
        banglaDiseaseName: disease?.banglaName || inference.banglaName || null,
        confidence: inference.confidence,
        severity: (disease?.severity as string) || inference.severity,
        imageUrl: input.imageUrl,
        imageName: input.imageName || "leaf_scan.jpg",
        isLowConfidence: inference.isLowConfidence,
        affectedAreaPercentage: inference.leafMetrics.affectedAreaPercentage,
        chlorophyllIndex: inference.leafMetrics.chlorophyllIndex,
        lesionCount: inference.leafMetrics.lesionCount,
        tissueNecrosis: inference.leafMetrics.tissueNecrosis,
        recommendationsCount: inference.recommendationsCount,
        status: inference.severity === "Healthy" ? "Monitoring" : "Active",
      },
      include: {
        disease: true,
      },
    });

    return {
      scanId: scan.id,
      scanCode: scan.scanCode,
      timestamp: scan.createdAt.toISOString(),
      imageUrl: scan.imageUrl,
      imageName: scan.imageName,
      cropDetected: scan.cropDetected,
      banglaCropDetected: scan.banglaCropDetected,
      isLowConfidence: scan.isLowConfidence,
      diagnosis: disease || {
        id: inference.diseaseId,
        crop: inference.crop,
        banglaCrop: inference.banglaCrop,
        commonName: inference.diseaseName,
        banglaName: inference.banglaName,
        scientificName: inference.scientificName,
        severity: inference.severity,
        confidence: inference.confidence,
      },
      leafMetrics: {
        affectedAreaPercentage: scan.affectedAreaPercentage,
        chlorophyllIndex: scan.chlorophyllIndex || "Optimal",
        lesionCount: scan.lesionCount,
        tissueNecrosis: scan.tissueNecrosis,
      },
      recommendationsCount: scan.recommendationsCount,
    };
  }

  static async getScanHistory(filters: ScanFilterOptions = {}) {
    const { userId, crop, status, limit = 50, offset = 0 } = filters;

    const where: Prisma.ScanWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (crop) {
      where.cropDetected = { equals: crop, mode: "insensitive" };
    }

    if (status) {
      where.status = status;
    }

    const [total, scans] = await Promise.all([
      prisma.scan.count({ where }),
      prisma.scan.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
        include: {
          disease: {
            select: {
              id: true,
              commonName: true,
              banglaName: true,
              scientificName: true,
              pathogenType: true,
              severity: true,
            },
          },
        },
      }),
    ]);

    // Format like frontend's HistoryItem
    const formatted = scans.map((s) => ({
      id: s.id,
      scanCode: s.scanCode,
      date: s.createdAt.toISOString(),
      crop: s.cropDetected,
      banglaCrop: s.banglaCropDetected,
      disease: s.diseaseName,
      banglaName: s.banglaDiseaseName,
      confidence: s.confidence,
      severity: s.severity,
      imageUrl: s.imageUrl,
      status: s.status,
      isLowConfidence: s.isLowConfidence,
      feedbackRating: s.feedbackRating,
    }));

    return { scans: formatted, total, limit, offset };
  }

  static async getScanById(id: string) {
    const scan = await prisma.scan.findFirst({
      where: {
        OR: [{ id }, { scanCode: id }],
      },
      include: {
        disease: true,
        feedback: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!scan) {
      throw ApiError.notFound("Scan record not found");
    }

    return scan;
  }

  static async updateScanStatus(id: string, status: "Active" | "Treated" | "Monitoring") {
    const existing = await prisma.scan.findFirst({
      where: { OR: [{ id }, { scanCode: id }] },
    });

    if (!existing) {
      throw ApiError.notFound("Scan record not found");
    }

    return prisma.scan.update({
      where: { id: existing.id },
      data: { status },
    });
  }

  static async deleteScan(id: string) {
    const existing = await prisma.scan.findFirst({
      where: { OR: [{ id }, { scanCode: id }] },
    });

    if (!existing) {
      throw ApiError.notFound("Scan record not found");
    }

    await prisma.scan.delete({
      where: { id: existing.id },
    });

    return { id, message: "Scan record deleted successfully" };
  }

  static async addConsultation(
    id: string,
    consultation: {
      expertName: string;
      notes: string;
      prescription?: string;
      verifiedDisease?: string;
      status?: "Active" | "Treated" | "Monitoring";
    }
  ) {
    const existing = await prisma.scan.findFirst({
      where: { OR: [{ id }, { scanCode: id }] },
    });

    if (!existing) {
      throw ApiError.notFound("Scan record not found");
    }

    const updateData: any = {};
    if (consultation.status) {
      updateData.status = consultation.status;
    }
    if (consultation.verifiedDisease) {
      updateData.banglaDiseaseName = consultation.verifiedDisease;
    }

    return prisma.scan.update({
      where: { id: existing.id },
      data: updateData,
    });
  }
}
