import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { exportPDF } from "../controller/exportController.js";

const exportRoutes = express.Router();

exportRoutes.get("/pdf", verifyToken, exportPDF);

export default exportRoutes;
