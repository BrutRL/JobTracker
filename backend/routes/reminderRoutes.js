import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  all,
  create,
  update,
  dismiss,
  destroy,
} from "../controller/reminderController.js";

const reminderRoutes = express.Router();

reminderRoutes.get("/all", verifyToken, all);
reminderRoutes.post("/create", verifyToken, create);
reminderRoutes.put("/update/:id", verifyToken, update);
reminderRoutes.patch("/:id/dismiss", verifyToken, dismiss);
reminderRoutes.delete("/delete/:id", verifyToken, destroy);

export default reminderRoutes;
