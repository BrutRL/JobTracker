import express from "express";
import { dashboard } from "../controller/dashboardController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const dashboardRoutes = express.Router();
dashboardRoutes.get("/analytics", verifyToken, dashboard);

export default dashboardRoutes;
