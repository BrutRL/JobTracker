import express from "express";
import multer from "multer";
import {
  all,
  create,
  update,
  destroy,
  updateStatus,
} from "../controller/applicationController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateApplication } from "../middleware/validate.js";
import {
  applicationLimiter,
  updateApplicationLimiter,
} from "../middleware/rateLimiter.js";
import { uploadResume } from "../middleware/resumeFileValidator.js";
const applicationRoutes = express.Router();

applicationRoutes.get("/all", verifyToken, all);
applicationRoutes.post(
  "/create",
  verifyToken,
  uploadResume.single("resumePath"),
  validateApplication,
  applicationLimiter,
  create,
);
applicationRoutes.put(
  "/update/:id",
  verifyToken,
  uploadResume.single("resumePath"),
  validateApplication,
  updateApplicationLimiter,
  update,
);
applicationRoutes.patch("/status/:id", verifyToken, updateStatus);
applicationRoutes.delete("/delete/:id", verifyToken, destroy);

export default applicationRoutes;
