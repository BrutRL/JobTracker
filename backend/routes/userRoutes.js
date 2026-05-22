import {
  specific,
  update,
  destroy,
  updateEmailReminder,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { profileUpdateLimiter } from "../middleware/rateLimiter.js";
import express from "express";
import multer from "multer";
const userRoutes = express.Router();

export const avatarStorage = multer.diskStorage({
  destination: "./public/avatar",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

userRoutes.get("/specific", verifyToken, specific);
userRoutes.put(
  "/update",
  verifyToken,
  uploadAvatar.single("avatarPath"),
  profileUpdateLimiter,
  update,
);
userRoutes.patch("/email_reminder", verifyToken, updateEmailReminder);
userRoutes.delete("/delete", verifyToken, destroy);

export default userRoutes;
