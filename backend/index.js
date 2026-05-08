import express from "express";
import { DbConnection } from "./config/dbConnection.js";
const app = express();
const PORT = 3000;

await DbConnection();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
