import { Router } from "express";
import { ScanController } from "./scan.controller.js";
import { optionalAuthenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createScanSchema, updateScanStatusSchema } from "./scan.validation.js";

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

// Delete scan record
router.delete("/:id", ScanController.deleteScan);

export const scanRoutes = router;
