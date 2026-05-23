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
const reminderRoutes = express.Router();

reminderRoutes.get("/all", verifyToken, all);
reminderRoutes.post("/create", verifyToken, reminderLimiter, create);
reminderRoutes.put("/update/:id", verifyToken, reminderLimiter, update);
reminderRoutes.patch("/:id/dismiss", verifyToken, reminderLimiter, dismiss);
reminderRoutes.delete("/delete/:id", verifyToken, destroy);

export default reminderRoutes;
