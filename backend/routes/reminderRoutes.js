import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  all,
  create,
  update,
  dismiss,
  destroy,
} from "../controller/reminderController.js";
import { reminderLimiter } from "../middleware/rateLimiter.js";
import { validateMongoId, validateReminder } from "../middleware/validate.js";
const reminderRoutes = express.Router();

reminderRoutes.get("/all", verifyToken, all);
reminderRoutes.post(
  "/create",
  verifyToken,
  validateReminder,
  reminderLimiter,
  create,
);
reminderRoutes.put(
  "/update/:id",
  verifyToken,
  validateMongoId,
  validateReminder,
  reminderLimiter,
  update,
);
reminderRoutes.patch(
  "/:id/dismiss",
  verifyToken,
  validateMongoId,
  reminderLimiter,
  dismiss,
);
reminderRoutes.delete("/delete/:id", verifyToken, validateMongoId, destroy);

export default reminderRoutes;
