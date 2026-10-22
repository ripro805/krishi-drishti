import { Router } from "express";
import { NoticeController } from "./notice.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createNoticeSchema, updateNoticeSchema } from "./notice.validation.js";
import { Role } from "@prisma/client";

const router = Router();

// Public: view announcements & notices
router.get("/", NoticeController.getNotices);

// Admin: create & manage notices
router.post(
  "/",
  authenticate,
  authorize([Role.ADMIN]),
  validate({ body: createNoticeSchema }),
  NoticeController.createNotice
);

router.put(
  "/:id",
  authenticate,
  authorize([Role.ADMIN]),
  validate({ body: updateNoticeSchema }),
  NoticeController.updateNotice
);

router.delete(
  "/:id",
  authenticate,
  authorize([Role.ADMIN]),
  NoticeController.deleteNotice
);

export const noticeRoutes = router;
