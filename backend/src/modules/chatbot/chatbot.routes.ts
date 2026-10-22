import { Router } from "express";
import { ChatbotController } from "./chatbot.controller.js";

const router = Router();

router.post("/message", ChatbotController.handleMessage);

export const chatbotRoutes = router;
