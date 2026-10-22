import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { apiV1Router } from "./routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/apiError.js";

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(
  cors({
    origin: [env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.json({ limit: "25mb" })); // accommodates high-res leaf scans & base64
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// System Health & Root endpoints
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "KrishiDrishti AI Agricultural Platform API",
    version: "1.0.0",
    status: "operational",
    documentation: "/api/v1",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// Mount Versioned API Modules
app.use("/api/v1", apiV1Router);

// 404 handler
app.use((req: Request, res: Response, next) => {
  next(ApiError.notFound(`Cannot ${req.method} ${req.originalUrl}`));
});

// Centralized error handling
app.use(errorHandler);

export { app };
