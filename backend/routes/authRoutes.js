import express from "express";
import {
  login,
  register,
  googleLoginCallback,
  googleRegisterCallback,
  googleLoginRedirect,
  googleRegisterRedirect,
  requestPasswordReset,
  logout,
  resetPassword,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import multer from "multer";
import {
  validateRegister,
  validateLogin,
  validateResetPass,
} from "../middleware/validate.js";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";
const authRoutes = express.Router();
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

authRoutes.post("/login", validateLogin, login);
authRoutes.post("/request_reset_pass", requestPasswordReset);
authRoutes.put("/reset_pass/:id", validateResetPass, resetPassword);
authRoutes.post(
  "/register",
  uploadAvatar.single("avatarPath"),
  validateRegister,
  register,
);
authRoutes.post("/logout", verifyToken, logout);
authRoutes.get("/google/jobquest/register", googleRegisterCallback);
authRoutes.get("/google/jobquest/login", googleLoginCallback);
authRoutes.get("/google/login", googleLoginRedirect);
authRoutes.get("/google/register", googleRegisterRedirect);

export default authRoutes;
