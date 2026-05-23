import express from "express";
import {
  all,
  create,
  update,
  destroy,
} from "../controller/interviewController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateInterview } from "../middleware/validate.js";
import { interviewLimiter } from "../middleware/rateLimiter.js";
const interviewRoutes = express.Router();

interviewRoutes.get("/all/:id", verifyToken, all);
interviewRoutes.post(
  "/create",
  verifyToken,
  validateInterview,
  interviewLimiter,
  create,
);
interviewRoutes.put(
  "/update/:id",
  verifyToken,
  validateInterview,
  interviewLimiter,
  update,
);
interviewRoutes.delete("/delete/:id", verifyToken, destroy);

export default interviewRoutes;
