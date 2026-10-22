import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      return sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      return sendResponse(res, {
        statusCode: 200,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getMe(req.user!.id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Current user profile retrieved",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
}
