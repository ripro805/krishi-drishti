import { Request, Response, NextFunction } from "express";
import { generateCropDoctorResponse } from "../../ai/chatbot/chatbot.stub.js";
import { sendResponse } from "../../utils/apiResponse.js";

export class ChatbotController {
  static async handleMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ success: false, message: "A query message is required" });
      }

      const response = await generateCropDoctorResponse(message, history || []);
      return sendResponse(res, {
        statusCode: 200,
        message: "Crop Doctor response generated",
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  }
}
