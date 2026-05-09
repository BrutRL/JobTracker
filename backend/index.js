import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { DbConnection } from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";
const app = express();
const PORT = 3000;

await DbConnection();

//middleware
app.use("/avatar", express.static("public/avatar"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
