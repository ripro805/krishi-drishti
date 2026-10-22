import { Request, Response, NextFunction } from "express";
import { NoticeService } from "./notice.service.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class NoticeController {
  static async getNotices(req: Request, res: Response, next: NextFunction) {
    try {
      const activeOnly = req.query.active === "true";
      const notices = await NoticeService.getNotices(activeOnly);
      return sendResponse(res, {
        statusCode: 200,
        message: "Notices retrieved",
        data: notices,
        meta: { total: notices.length },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async createNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const notice = await NoticeService.createNotice(req.body);
      return sendResponse(res, {
        statusCode: 201,
        message: "Notice created successfully",
        data: notice,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await NoticeService.updateNotice(id, req.body);
      return sendResponse(res, {
        statusCode: 200,
        message: "Notice updated successfully",
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await NoticeService.deleteNotice(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Notice deleted",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
