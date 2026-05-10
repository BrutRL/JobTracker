import express from "express";
import multer from "multer";
import {
  all,
  create,
  update,
  destroy,
} from "../controller/applicationController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateApplication } from "../middleware/validate.js";

const applicationRoutes = express.Router();
export const resumeStorage = multer.diskStorage({
  destination: "./public/avatar",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

applicationRoutes.get("/all", verifyToken, all);
applicationRoutes.post(
  "/create",
  verifyToken,
  uploadResume.single("resumePath"),
  validateApplication,
  create,
);
applicationRoutes.put(
  "/update/:id",
  verifyToken,
  uploadResume.single("resumePath"),
  validateApplication,
  update,
);
applicationRoutes.delete("/delete/:id", verifyToken, destroy);

export default applicationRoutes;
