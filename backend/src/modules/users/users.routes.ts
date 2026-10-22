import { Router } from "express";
import { UsersController } from "./users.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { updateUserSchema } from "./users.validation.js";
import { Role } from "@prisma/client";

const router = Router();

// Admin only: list all registered farmers, experts, admins
router.get("/", authenticate, authorize([Role.ADMIN]), UsersController.getAllUsers);

// Authenticated: view user details
router.get("/:id", authenticate, UsersController.getUserById);

// Authenticated: update profile
router.put(
  "/:id",
  authenticate,
  validate({ body: updateUserSchema }),
  UsersController.updateUser
);

// Admin only: delete user
router.delete("/:id", authenticate, authorize([Role.ADMIN]), UsersController.deleteUser);

export const usersRoutes = router;
