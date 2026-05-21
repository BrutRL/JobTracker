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
import agenda from "./config/agenda.js";
import cors from "cors";
import { registerJobs } from "./jobs/reminderJob.js";
import rateLimit from "express-rate-limit";
const app = express();
const PORT = 3000;

await DbConnection();

registerJobs(agenda);
console.log("Jobs registered");

await agenda.start();
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
const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      error: "Too many requests",
      redirect: `${process.env.FRONT_END_URL}/limit_page`,
    });
  },
});

app.use(globalLimiter);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/application", applicationRoutes);
app.use("/contact", contactRoutes);
app.use("/interview", interviewRoutes);
app.use("/reminder", reminderRoutes);

process.on("SIGTERM", async () => {
  await agenda.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await agenda.stop();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
