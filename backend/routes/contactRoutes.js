import express from "express";
import {
  specific,
  create,
  update,
  destroy,
} from "../controller/contactController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateContact, validateMongoId } from "../middleware/validate.js";
import { contactLimiter } from "../middleware/rateLimiter.js";
const contactRoutes = express.Router();

contactRoutes.get("/specific/:id", verifyToken, specific);
contactRoutes.post(
  "/create",
  verifyToken,
  validateContact,
  contactLimiter,
  create,
);
contactRoutes.put(
  "/update/:id",
  verifyToken,
  validateMongoId,
  validateContact,
  contactLimiter,
  update,
);
contactRoutes.delete("/delete/:id", verifyToken, validateMongoId, destroy);

export default contactRoutes;
