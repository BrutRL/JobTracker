import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { DbConnection } from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";
const app = express();
const PORT = 3000;

await DbConnection();

app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
