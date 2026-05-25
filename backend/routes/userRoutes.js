import {
  specific,
  update,
  destroy,
  updateEmailReminder,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { profileUpdateLimiter } from "../middleware/rateLimiter.js";
import express from "express";
import { uploadAvatar } from "../middleware/avatarFileValidator.js";
const userRoutes = express.Router();

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
