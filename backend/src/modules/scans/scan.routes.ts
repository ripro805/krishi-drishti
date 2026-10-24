import { Router } from "express";
import { ScanController } from "./scan.controller.js";
import { authenticate, optionalAuthenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createScanSchema, updateScanStatusSchema } from "./scan.validation.js";
import { Role } from "@prisma/client";

const router = Router();

// Run new scan (supports both authenticated farmers and anonymous scans)
router.post(
  "/",
  optionalAuthenticate,
  validate({ body: createScanSchema }),
  ScanController.createScan
);

// View scan history
router.get("/", optionalAuthenticate, ScanController.getScanHistory);

// View single scan diagnosis
router.get("/:id", ScanController.getScanById);

// Update status (Active, Treated, Monitoring)
router.patch(
  "/:id/status",
  validate({ body: updateScanStatusSchema }),
  ScanController.updateScanStatus
);

// Expert consultation advisory
router.post(
  "/:id/consultation",
  authenticate,
  authorize([Role.ADMIN, Role.EXPERT]),
  ScanController.addConsultation
);

// Delete scan record
router.delete("/:id", ScanController.deleteScan);

export const scanRoutes = router;
