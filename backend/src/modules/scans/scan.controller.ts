import { Request, Response, NextFunction } from "express";
import { ScanService } from "./scan.service.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class ScanController {
  static async createScan(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ScanService.createScan(req.body, req.user?.id);
      return sendResponse(res, {
        statusCode: 201,
        message: "Leaf scan analyzed successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getScanHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        userId: req.query.userId as string | undefined,
        crop: req.query.crop as string | undefined,
        status: req.query.status as string | undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string, 10) : undefined,
      };

      const result = await ScanService.getScanHistory(filters);
      return sendResponse(res, {
        statusCode: 200,
        message: "Scan history retrieved",
        data: result.scans,
        meta: { total: result.total, limit: result.limit, offset: result.offset },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getScanById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const scan = await ScanService.getScanById(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Scan diagnosis retrieved",
        data: scan,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateScanStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await ScanService.updateScanStatus(id, status);
      return sendResponse(res, {
        statusCode: 200,
        message: `Scan status updated to ${status}`,
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteScan(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await ScanService.deleteScan(id);
      return sendResponse(res, {
        statusCode: 200,
        message: "Scan deleted successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async addConsultation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { notes, prescription, verifiedDisease, status } = req.body;
      const expertName = (req as any).user?.name || "ড. নাজমুল হুদা";
      const updated = await ScanService.addConsultation(id, {
        expertName,
        notes,
        prescription,
        verifiedDisease,
        status,
      });
      return sendResponse(res, {
        statusCode: 200,
        message: "Expert consultation advisory saved",
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  }
}
