import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate({ body: registerSchema }), AuthController.register);
router.post("/login", validate({ body: loginSchema }), AuthController.login);
router.get("/me", authenticate, AuthController.getMe);

export const authRoutes = router;
