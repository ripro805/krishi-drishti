import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";
import { prisma } from "../config/db.js";
import { Role } from "@prisma/client";

export interface AuthUserPayload {
  id: string;
  email: string;
  role: Role;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Authentication token is required");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw ApiError.unauthorized("Malformed authorization header");
    }

    let decoded: AuthUserPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserPayload;
    } catch {
      throw ApiError.unauthorized("Invalid or expired token");
    }

    // Optional database verification to ensure user was not deleted or suspended
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true },
    });

    if (!user) {
      throw ApiError.unauthorized("User account no longer exists");
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

export async function optionalAuthenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserPayload;
          const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, role: true, name: true },
          });
          if (user) {
            req.user = user;
          }
        } catch {
          // Token invalid, continue as unauthenticated guest
        }
      }
    }
    return next();
  } catch {
    return next();
  }
}
