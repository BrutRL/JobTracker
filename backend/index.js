import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { DbConnection } from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import agenda from "./config/agenda.js";
import cors from "cors";
import helmet from "helmet";
import { registerJobs } from "./jobs/reminderJob.js";
import { weeklySummary } from "./jobs/weeklySummary.js";
import { globalLimiter } from "./middleware/rateLimiter.js";
import rateLimit from "express-rate-limit";
import { errorFileValidator } from "./middleware/errorHandlerFileValidator.js";
const app = express();
const PORT = 3000;

await DbConnection();

registerJobs(agenda);
weeklySummary(agenda);

await agenda.start();
// weekly summary job  report — every Monday 8AM
await agenda.every("0 8 * * 1", "weekly summary");
console.log("Agenda started");

// Middleware
app.use("/avatar", express.static("public/avatar"));
app.use("/resume", express.static("public/resume"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  }),
);
app.use(globalLimiter);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/application", applicationRoutes);
app.use("/contact", contactRoutes);
app.use("/interview", interviewRoutes);
app.use("/reminder", reminderRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/ai", aiRoutes);
app.use("/export", exportRoutes);

// file size limit validator
app.use(errorFileValidator);
process.on("SIGTERM", async () => {
  await agenda.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await agenda.stop();
  process.exit(0);
});
// app.get("/test-digest", async (req, res) => {
//   await agenda.schedule("in 30 seconds", "weekly summary");
//   res.json({ ok: true });
// });
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
