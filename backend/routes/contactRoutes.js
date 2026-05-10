import express from "express";
import {
  specific,
  create,
  update,
  destroy,
} from "../controller/contactController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateContact } from "../middleware/validate.js";

const contactRoutes = express.Router();

contactRoutes.get("/specific/:id", verifyToken, specific);
contactRoutes.post("/create", verifyToken, validateContact, create);
contactRoutes.put("/update/:id", verifyToken, validateContact, update);
contactRoutes.delete("/delete/:id", verifyToken, destroy);

export default contactRoutes;
