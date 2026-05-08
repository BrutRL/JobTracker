import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Successfully connected to db`);
  } catch (error) {
    console.log(`Failed to connect to db${error}`);
  }
};
