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
    const { name, email, password, emailReminders, skills } = req.body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (emailReminders !== undefined)
      updateFields.emailReminders = emailReminders;
    if (req.file) updateFields.avatar = req.file.filename;
    if (skills !== undefined) {
      updateFields.skills = Array.isArray(skills)
        ? skills
        : skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }
    if (password) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          ok: false,
          message:
            "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashPassword;
    }

    const user = await User.findByIdAndUpdate(req.userId, updateFields, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    res.status(200).json({ ok: true, message: "Account updated successfully" });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
export const updateEmailReminder = async (req, res) => {
  const { emailReminders } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      emailReminders: emailReminders,
    },
    {
      new: true,
    },
  );
  res
    .status(200)
    .json({ ok: true, message: `Email Reminders updated successfully` });
  try {
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
