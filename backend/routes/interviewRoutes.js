import express from "express";
import {
  all,
  create,
  update,
  destroy,
} from "../controller/interviewController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateInterview } from "../middleware/validate.js";

const interviewRoutes = express.Router();

interviewRoutes.get("/all/:id", verifyToken, all);
interviewRoutes.post("/create", verifyToken, validateInterview, create);
interviewRoutes.put("/update/:id", verifyToken, validateInterview, update);
interviewRoutes.delete("/delete/:id", verifyToken, destroy);

export default interviewRoutes;
