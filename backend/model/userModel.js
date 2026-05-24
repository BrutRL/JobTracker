import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 100,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    emailReminders: {
      type: Boolean,
      default: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastAppliedAt: { type: Date, default: null },
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);
