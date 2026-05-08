import mongoose from "mongoose";
import { User } from "./userModel.js";
const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "User is required"],
      index: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Wishlist", "Applied", "Interview", "Offer", "Rejected"],
        message: "{VALUE} is not a valid status",
      },
      default: "Wishlist",
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    jobUrl: {
      type: String,
      trim: true,
      default: null,
    },
    salaryMin: {
      type: Number,
      default: null,
    },
    salaryMax: {
      type: Number,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    resumeUrl: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model("Application", ApplicationSchema);
