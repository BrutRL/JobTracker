import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { generateInterviewPrep } from "../controller/aiController.js";
import { aiLimiter } from "../middleware/rateLimiter.js";
const aiRoutes = express.Router();

aiRoutes.post("/interview_prep", verifyToken, generateInterviewPrep, aiLimiter);

export default aiRoutes;
