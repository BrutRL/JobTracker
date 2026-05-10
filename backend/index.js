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
import { registerJobs } from "./jobs/reminderJob.js";

const app = express();
const PORT = 3000;

await DbConnection();

registerJobs(agenda);
console.log("Jobs registered");

await agenda.start();
console.log("Agenda started");

app.use("/avatar", express.static("public/avatar"));
app.use("/resume", express.static("public/resume"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

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
