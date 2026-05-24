import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  generateInterviewPrep,
  analyzeJobDescription,
} from "../controller/aiController.js";
import { aiLimiter } from "../middleware/rateLimiter.js";
const aiRoutes = express.Router();

aiRoutes.post("/interview_prep", verifyToken, aiLimiter, generateInterviewPrep);
aiRoutes.post(
  "/analyze_job_description",
  verifyToken,
  aiLimiter,
  analyzeJobDescription,
);

export default aiRoutes;
