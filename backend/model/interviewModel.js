import mongoose from "mongoose";
import { Application } from "./applicationModel.js";
import { User } from "./userModel.js";
const InterviewSchema = new mongoose.Schema(
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
        values: ["phone", "behavioral", "technical", "final_round", "other"],
      },
      required: true,
    },
    notes: {
      type: String,
      default: null,
    },
    outcome: {
      type: String,
      enum: {
        values: ["pending", "passed", "rejected", "no_show"],
        message: "{VALUE} is not a valid outcome",
      },
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Interview = mongoose.model("Interview", InterviewSchema);
