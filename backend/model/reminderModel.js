import mongoose from "mongoose";
import { User } from "./userModel.js";
import { Application } from "./applicationModel.js";
const ReminderSchema = new mongoose.Schema(
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
      required: [true, "User is required"],
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ["follow-up", "interview"],
        message: "{VALUE} is not a valid reminder type",
      },
      required: [true, "Reminder type is required"],
    },
    triggerAt: {
      type: Date,
      required: [true, "Trigger date is required"],
    },
    sent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Reminder = mongoose.model("Reminder", ReminderSchema);
