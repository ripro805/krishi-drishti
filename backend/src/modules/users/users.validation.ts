import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  district: z.string().optional(),
  upazila: z.string().optional(),
  avatar: z.string().url().optional(),
  role: z.enum(["FARMER", "EXPERT", "ADMIN"]).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
