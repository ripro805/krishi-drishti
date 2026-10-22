import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { diseaseRoutes } from "./modules/diseases/disease.routes.js";
import { scanRoutes } from "./modules/scans/scan.routes.js";
import { feedbackRoutes } from "./modules/feedback/feedback.routes.js";
import { noticeRoutes } from "./modules/notices/notice.routes.js";
import { calculatorRoutes } from "./modules/calculator/calculator.routes.js";
import { chatbotRoutes } from "./modules/chatbot/chatbot.routes.js";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/users", usersRoutes);
apiV1Router.use("/diseases", diseaseRoutes);
apiV1Router.use("/scans", scanRoutes);
apiV1Router.use("/feedback", feedbackRoutes);
apiV1Router.use("/notices", noticeRoutes);
apiV1Router.use("/calculator", calculatorRoutes);
apiV1Router.use("/chatbot", chatbotRoutes);

export { apiV1Router };
