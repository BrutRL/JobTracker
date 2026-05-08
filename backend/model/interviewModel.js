import mongoose from "mongoose";
import { Application } from "./applicationModel.js";
const InterviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Application,
      required: [true, "Application is required"],
      index: true,
    },
    round: {
      type: String,
      trim: true,
      default: null,
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
    format: {
      type: String,
      enum: {
        values: ["Phone", "Video", "Onsite", "Take-home", "Finalround"],
        message: "{VALUE} is not a valid format",
      },
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    outcome: {
      type: String,
      enum: {
        values: ["Pending", "Passed", "Failed", "No show"],
        message: "{VALUE} is not a valid outcome",
      },
      default: "Pending",
    },
  },
  { timestamps: true },
);

export const Interview = mongoose.model("Interview", InterviewSchema);
