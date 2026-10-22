import { Router } from "express";
import { DiseaseController } from "./disease.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createDiseaseSchema, updateDiseaseSchema } from "./disease.validation.js";
import { Role } from "@prisma/client";

const router = Router();

// Public: Browse and search disease catalog
router.get("/", DiseaseController.getAllDiseases);
router.get("/:id", DiseaseController.getDiseaseById);

// Admin & Agricultural Experts only: Manage disease knowledge base
router.post(
  "/",
  authenticate,
  authorize([Role.ADMIN, Role.EXPERT]),
  validate({ body: createDiseaseSchema }),
  DiseaseController.createDisease
);

router.put(
  "/:id",
  authenticate,
  authorize([Role.ADMIN, Role.EXPERT]),
  validate({ body: updateDiseaseSchema }),
  DiseaseController.updateDisease
);

router.delete(
  "/:id",
  authenticate,
  authorize([Role.ADMIN]),
  DiseaseController.deleteDisease
);

export const diseaseRoutes = router;
