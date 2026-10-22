import { Request, Response, NextFunction } from "express";
import { FeedbackService } from "./feedback.service.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class FeedbackController {
  static async submitFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const feedback = await FeedbackService.submitFeedback(req.body, req.user?.id);
      return sendResponse(res, {
        statusCode: 201,
        message: "Prediction feedback submitted successfully",
        data: feedback,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getFeedbackList(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as string | undefined;
      const list = await FeedbackService.getFeedbackList(status);
      return sendResponse(res, {
        statusCode: 200,
        message: "Prediction feedbacks retrieved",
        data: list,
        meta: { total: list.length },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getFeedbackStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await FeedbackService.getFeedbackStats();
      return sendResponse(res, {
        statusCode: 200,
        message: "Feedback accuracy statistics",
        data: stats,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateFeedbackStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await FeedbackService.updateFeedbackStatus(id, status);
      return sendResponse(res, {
        statusCode: 200,
        message: `Feedback status updated to ${status}`,
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  }
}
