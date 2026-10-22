import { Router } from "express";
import { FeedbackController } from "./feedback.controller.js";
import { authenticate, optionalAuthenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createFeedbackSchema, updateFeedbackStatusSchema } from "./feedback.validation.js";
import { Role } from "@prisma/client";

const router = Router();

// Submit feedback for a scan result
router.post(
  "/",
  optionalAuthenticate,
  validate({ body: createFeedbackSchema }),
  FeedbackController.submitFeedback
);

// Get feedback accuracy stats (public / admin)
router.get("/stats", FeedbackController.getFeedbackStats);

// Admin & Experts: View all submitted feedback
router.get(
  "/",
  authenticate,
  authorize([Role.ADMIN, Role.EXPERT]),
  FeedbackController.getFeedbackList
);

// Admin & Experts: Update feedback review state
router.patch(
  "/:id/status",
  authenticate,
  authorize([Role.ADMIN, Role.EXPERT]),
  validate({ body: updateFeedbackStatusSchema }),
  FeedbackController.updateFeedbackStatus
);

export const feedbackRoutes = router;
