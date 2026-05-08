import express from "express";
import {
  login,
  register,
  googleLoginCallback,
  googleRegisterCallback,
  googleLoginRedirect,
  googleRegisterRedirect,
} from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.get("/google/jobquest/register", googleRegisterCallback);
authRoutes.get("/google/jobquest/login", googleLoginCallback);
authRoutes.get("/google/login", googleLoginRedirect);
authRoutes.get("/google/register", googleRegisterRedirect);
authRoutes.post("/register", register);

export default authRoutes;
