import { Router } from "express";
import { CalculatorController } from "./calculator.controller.js";
import { optionalAuthenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { fertilizerCalculationSchema } from "./calculator.validation.js";

const router = Router();

// Precision Urea & N-P-K Fertilizer Calculation
router.post(
  "/fertilizer",
  optionalAuthenticate,
  validate({ body: fertilizerCalculationSchema }),
  CalculatorController.calculateFertilizer
);

export const calculatorRoutes = router;
