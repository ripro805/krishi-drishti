import { Request, Response, NextFunction } from "express";
import { UsersService } from "./users.service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";

export class UsersController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.query.role as string | undefined;
      const users = await UsersService.getAllUsers(role);
      return sendResponse(res, {
        statusCode: 200,
        message: "Users retrieved successfully",
        data: users,
        meta: { total: users.length },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UsersService.getUserById(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "User details retrieved",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // Allow users to update their own profile, or admins to update anyone
      if (req.user?.role !== "ADMIN" && req.user?.id !== id) {
        throw ApiError.forbidden("You can only modify your own profile");
      }

      // Non-admins cannot elevate role
      if (req.user?.role !== "ADMIN" && req.body.role) {
        delete req.body.role;
      }

      const updated = await UsersService.updateUser(id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        message: "User profile updated successfully",
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await UsersService.deleteUser(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "User deleted successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
