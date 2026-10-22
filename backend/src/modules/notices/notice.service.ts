import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { CreateNoticeInput, UpdateNoticeInput } from "./notice.validation.js";

export class NoticeService {
  static async getNotices(activeOnly = false) {
    const where = activeOnly ? { active: true } : {};
    return prisma.notice.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  static async createNotice(input: CreateNoticeInput) {
    const noticeCode = `not-${Date.now().toString(36)}`;
    return prisma.notice.create({
      data: {
        noticeCode,
        ...input,
      },
    });
  }

  static async updateNotice(id: string, input: UpdateNoticeInput) {
    const existing = await prisma.notice.findFirst({
      where: { OR: [{ id }, { noticeCode: id }] },
    });

    if (!existing) {
      throw ApiError.notFound("Notice not found");
    }

    return prisma.notice.update({
      where: { id: existing.id },
      data: input,
    });
  }

  static async deleteNotice(id: string) {
    const existing = await prisma.notice.findFirst({
      where: { OR: [{ id }, { noticeCode: id }] },
    });

    if (!existing) {
      throw ApiError.notFound("Notice not found");
    }

    await prisma.notice.delete({ where: { id: existing.id } });
    return { id, message: "Notice deleted" };
  }
}
