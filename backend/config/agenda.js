import dotenv from "dotenv";
dotenv.config();
import { Agenda } from "agenda";
import { MongoBackend } from "@agendajs/mongo-backend";

const agenda = new Agenda({
  backend: new MongoBackend({
    address: process.env.MONGO_URL,
    collection: "agendaJobs", // rename from "jobs" to avoid conflicts
  }),
  processEvery: "30 seconds", // increase from 10s to reduce DB load
  maxConcurrency: 5,
  defaultLockLifetime: 10000,
});

agenda.on("error", (err) => {
  console.error("Agenda error:", err);
});

agenda.on("start", (job) => {
  console.log(`Job started: ${job.attrs.name}`);
});

agenda.on("success", (job) => {
  console.log(`Job completed: ${job.attrs.name}`);
});

agenda.on("fail", (err, job) => {
  console.error(`Job failed: ${job.attrs.name}`, err);
});

export default agenda;
