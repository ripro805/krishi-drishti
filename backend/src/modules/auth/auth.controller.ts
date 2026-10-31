import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: result.user,
        token: result.token,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.user,
        token: result.token,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getMe(req.user!.id);
      return res.status(200).json({
        success: true,
        message: "Current user profile retrieved",
        user: user,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
}
