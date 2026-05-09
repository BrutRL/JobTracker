import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

export const specific = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const { name, email, password, emailReminders } = req.body;
    const avatarPath = req.file.filename;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name: name,
        email: email,
        avatar: avatarPath,
        password: hashPassword,
        emailReminders: emailReminders,
      },
      {
        new: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    res.status(200).json({ ok: true, message: `Account updated successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    res.status(200).json({ ok: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
