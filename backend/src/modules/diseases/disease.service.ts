import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { CreateDiseaseInput, UpdateDiseaseInput } from "./disease.validation.js";
import { Prisma } from "@prisma/client";

export interface DiseaseFilterOptions {
  crop?: string;
  pathogenType?: string;
  severity?: string;
  search?: string;
}

export class DiseaseService {
  static async getAllDiseases(filters: DiseaseFilterOptions = {}) {
    const { crop, pathogenType, severity, search } = filters;

    const where: Prisma.DiseaseWhereInput = {};

    if (crop) {
      where.crop = { equals: crop, mode: "insensitive" };
    }

    if (pathogenType) {
      where.pathogenType = { equals: pathogenType, mode: "insensitive" };
    }

    if (severity) {
      where.severity = { equals: severity, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { commonName: { contains: search, mode: "insensitive" } },
        { banglaName: { contains: search, mode: "insensitive" } },
        { scientificName: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.disease.findMany({
      where,
      orderBy: { crop: "asc" },
    });
  }

  static async getDiseaseById(id: string) {
    const disease = await prisma.disease.findUnique({
      where: { id },
    });

    if (!disease) {
      throw ApiError.notFound(`Disease with id '${id}' not found`);
    }

    return disease;
  }

  static async createDisease(input: CreateDiseaseInput) {
    const existing = await prisma.disease.findUnique({
      where: { id: input.id },
    });

    if (existing) {
      throw ApiError.conflict(`Disease with id '${input.id}' already exists`);
    }

    return prisma.disease.create({
      data: {
        ...input,
        treatmentPlan: input.treatmentPlan as Prisma.InputJsonValue,
        banglaTreatment: (input.banglaTreatment || Prisma.JsonNull) as Prisma.InputJsonValue,
      },
    });
  }

  static async updateDisease(id: string, input: UpdateDiseaseInput) {
    const existing = await prisma.disease.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound(`Disease with id '${id}' not found`);
    }

    const data: Prisma.DiseaseUpdateInput = {
      ...input,
      treatmentPlan: input.treatmentPlan ? (input.treatmentPlan as Prisma.InputJsonValue) : undefined,
      banglaTreatment: input.banglaTreatment ? (input.banglaTreatment as Prisma.InputJsonValue) : undefined,
    };

    return prisma.disease.update({
      where: { id },
      data,
    });
  }

  static async deleteDisease(id: string) {
    const existing = await prisma.disease.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound(`Disease with id '${id}' not found`);
    }

    await prisma.disease.delete({ where: { id } });
    return { id, message: "Disease removed from pathology catalog" };
  }
}
