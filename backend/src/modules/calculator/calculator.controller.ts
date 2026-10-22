import { Request, Response, NextFunction } from "express";
import { CalculatorService } from "./calculator.service.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class CalculatorController {
  static async calculateFertilizer(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CalculatorService.calculateFertilizer(req.body, req.user?.id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Fertilizer dosage and split schedule computed successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
