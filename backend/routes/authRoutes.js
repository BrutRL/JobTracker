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
  authorized,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  loginLimiter,
  registerLimiter,
  resetEmailLimiter,
  resetPassLimiter,
} from "../middleware/rateLimiter.js";
import multer from "multer";
import {
  validateRegister,
  validateLogin,
  validateResetPass,
} from "../middleware/validate.js";
import { uploadAvatar } from "../middleware/avatarFileValidator.js";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";
const authRoutes = express.Router();

authRoutes.post("/login", validateLogin, loginLimiter, login);
authRoutes.post("/request_reset_pass", resetEmailLimiter, requestPasswordReset);
authRoutes.put(
  "/reset_pass/:id",
  validateResetPass,
  resetPassLimiter,
  resetPassword,
);
authRoutes.post(
  "/register",
  uploadAvatar.single("avatarPath"),
  validateRegister,
  registerLimiter,
  register,
);
authRoutes.post("/logout", verifyToken, logout);
authRoutes.get("/google/jobquest/register", googleRegisterCallback);
authRoutes.get("/google/jobquest/login", googleLoginCallback);
authRoutes.get("/google/login", googleLoginRedirect);
authRoutes.get("/google/register", googleRegisterRedirect);
authRoutes.get("/authorized", verifyToken, authorized);
export default authRoutes;
