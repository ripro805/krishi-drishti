import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { UpdateUserInput } from "./users.validation.js";
import { Role } from "@prisma/client";

export class UsersService {
  static async getAllUsers(role?: string) {
    const where: { role?: Role } = {};
    if (role && (role === "FARMER" || role === "EXPERT" || role === "ADMIN")) {
      where.role = role as Role;
    }

    return prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        district: true,
        upazila: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { scans: true, feedbacks: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        district: true,
        upazila: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        scans: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return user;
  }

  static async updateUser(id: string, input: UpdateUserInput) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound("User not found");
    }

    return prisma.user.update({
      where: { id },
      data: {
        name: input.name?.trim(),
        phone: input.phone?.trim(),
        district: input.district?.trim(),
        upazila: input.upazila?.trim(),
        avatar: input.avatar,
        role: input.role as Role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        district: true,
        upazila: true,
        avatar: true,
        updatedAt: true,
      },
    });
  }

  static async deleteUser(id: string) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound("User not found");
    }

    await prisma.user.delete({ where: { id } });
    return { id, message: "User deleted successfully" };
  }
}
