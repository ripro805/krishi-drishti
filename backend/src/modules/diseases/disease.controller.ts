import { Request, Response, NextFunction } from "express";
import { DiseaseService } from "./disease.service.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class DiseaseController {
  static async getAllDiseases(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        crop: req.query.crop as string | undefined,
        pathogenType: req.query.pathogenType as string | undefined,
        severity: req.query.severity as string | undefined,
        search: req.query.search as string | undefined,
      };

      const diseases = await DiseaseService.getAllDiseases(filters);
      return sendResponse(res, {
        statusCode: 200,
        message: "Diseases fetched successfully",
        data: diseases,
        meta: { total: diseases.length },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getDiseaseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const disease = await DiseaseService.getDiseaseById(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Disease details retrieved",
        data: disease,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async createDisease(req: Request, res: Response, next: NextFunction) {
    try {
      const disease = await DiseaseService.createDisease(req.body);
      return sendResponse(res, {
        statusCode: 201,
        message: "Disease added to pathology catalog",
        data: disease,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateDisease(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const disease = await DiseaseService.updateDisease(id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        message: "Disease profile updated successfully",
        data: disease,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteDisease(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await DiseaseService.deleteDisease(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Disease deleted successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
