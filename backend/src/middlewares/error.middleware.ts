import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { logger } from "../utils/logger.js";
import { env } from "../config/env.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err.name === "PrismaClientKnownRequestError") {
    // Handle Prisma specific constraint errors
    const prismaErr = err as unknown as { code: string; meta?: { target?: string[] } };
    if (prismaErr.code === "P2002") {
      statusCode = 409;
      message = `Unique constraint violation on field: ${prismaErr.meta?.target?.join(", ") || "field"}`;
    } else if (prismaErr.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    } else {
      statusCode = 400;
      message = "Database query error";
    }
  }

  logger.error(`${req.method} ${req.originalUrl} - [${statusCode}] ${message}`, {
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
    errors,
  });

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
