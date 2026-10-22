import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { CreateFeedbackInput } from "./feedback.validation.js";

export class FeedbackService {
  static async submitFeedback(input: CreateFeedbackInput, userId?: string) {
    // Check if scan exists by id or scanCode
    const scan = await prisma.scan.findFirst({
      where: {
        OR: [{ id: input.scanId }, { scanCode: input.scanId }],
      },
    });

    if (!scan) {
      throw ApiError.notFound("Target scan record not found");
    }

    const feedbackCode = `FB-${Date.now().toString(36).toUpperCase()}`;

    // Upsert feedback to allow updating feedback for the same scan
    const feedback = await prisma.feedback.upsert({
      where: { scanId: scan.id },
      update: {
        rating: input.rating,
        comment: input.comment,
        userName: input.userName,
        status: "new",
      },
      create: {
        feedbackCode,
        scanId: scan.id,
        userId: userId || null,
        crop: input.crop,
        disease: input.disease,
        banglaDisease: input.banglaDisease,
        confidence: input.confidence,
        rating: input.rating,
        comment: input.comment,
        userName: input.userName || "কৃষক",
        status: "new",
      },
    });

    // Also update feedbackRating on Scan record
    await prisma.scan.update({
      where: { id: scan.id },
      data: { feedbackRating: input.rating },
    });

    return feedback;
  }

  static async getFeedbackList(status?: string) {
    const where = status ? { status } : {};

    return prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        scan: {
          select: {
            scanCode: true,
            imageUrl: true,
            severity: true,
          },
        },
      },
    });
  }

  static async updateFeedbackStatus(id: string, status: "new" | "reviewed" | "flagged") {
    const existing = await prisma.feedback.findFirst({
      where: { OR: [{ id }, { feedbackCode: id }] },
    });

    if (!existing) {
      throw ApiError.notFound("Feedback record not found");
    }

    return prisma.feedback.update({
      where: { id: existing.id },
      data: { status },
    });
  }

  static async getFeedbackStats() {
    const list = await prisma.feedback.findMany({
      select: { rating: true },
    });

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
}
