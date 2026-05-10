import dotenv from "dotenv";
dotenv.config();
import { Agenda } from "agenda";
import { MongoBackend } from "@agendajs/mongo-backend";
const agenda = new Agenda({
  backend: new MongoBackend({
    address: process.env.MONGO_URL,
    collection: "jobs",
  }),
  processEvery: "10 seconds",
  maxConcurrency: 10,
});

export default agenda;
