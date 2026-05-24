import express from "express";
import {
  all,
  create,
  update,
  destroy,
} from "../controller/interviewController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateInterview, validateMongoId } from "../middleware/validate.js";
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
  validateMongoId,
  validateInterview,
  interviewLimiter,
  update,
);
interviewRoutes.delete("/delete/:id", verifyToken, validateMongoId, destroy);

export default interviewRoutes;
