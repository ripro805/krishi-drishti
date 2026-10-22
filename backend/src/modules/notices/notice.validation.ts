import { z } from "zod";

export const createNoticeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  banglaTitle: z.string().min(3, "Bangla title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  banglaContent: z.string().min(10, "Bangla content must be at least 10 characters"),
  category: z.enum(["alert", "guideline", "news"]).default("alert"),
  date: z.string().default(() => new Date().toISOString().split("T")[0]),
  active: z.boolean().default(true),
});

export const updateNoticeSchema = createNoticeSchema.partial();

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>;
