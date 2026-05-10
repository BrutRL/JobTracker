import mongoose from "mongoose";
import { Application } from "./applicationModel.js";
import { User } from "./userModel.js";
const ContactSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Application,
      required: [true, "Application is required"],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    linkedIn: {
      type: String,
      trim: true,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export const Contact = mongoose.model("Contact", ContactSchema);
