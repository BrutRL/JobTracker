import { Reminder } from "../model/reminderModel.js";
import { Application } from "../model/applicationModel.js";
import { User } from "../model/userModel.js";
import agenda from "../config/agenda.js";

export const all = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId })
      .populate("applicationId", "company role status")
      .sort({ triggerAt: 1 });
    res.status(200).json({ ok: true, data: reminders });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const create = async (req, res) => {
  const { applicationId, type, triggerAt } = req.body;
  try {
    const trigger = new Date(triggerAt);
    if (isNaN(trigger) || trigger <= new Date()) {
      return res.status(400).json({
        ok: false,
        message: "Date and Time must be a valid future date",
      });
    }
    const user = await User.findById(req.userId);

    if (!user.emailReminders) {
      return res.status(404).json({
        ok: false,
        message: "Please enable Email Reminders before creating",
      });
    }
    const application = await Application.findOne({
      _id: applicationId,
      userId: req.userId,
    });

    if (!application) {
      return res
        .status(404)
        .json({ ok: false, message: "Application not found" });
    }

    const reminder = new Reminder({
      applicationId,
      userId: req.userId,
      type,
      triggerAt: trigger,
    });

    await reminder.save();

    await agenda.schedule(trigger, "send reminder", {
      reminderId: reminder._id.toString(),
    });

    res.status(201).json({
      ok: true,
      message: "Reminder successfully created",
      data: reminder,
    });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { type, triggerAt } = req.body;
  try {
    const trigger = new Date(triggerAt);
    if (isNaN(trigger) || trigger <= new Date()) {
      return res.status(400).json({
        ok: false,
        message: "Time and Date must be a valid future date",
      });
    }

    const reminder = await Reminder.findOne({ _id: id, userId: req.userId });
    if (!reminder) {
      return res.status(404).json({ ok: false, message: "Reminder not found" });
    }

    await agenda.cancel({ "data.reminderId": reminder._id.toString() });
    await Reminder.findByIdAndUpdate(
      id,
      { type, triggerAt: trigger },
      { new: true },
    );
    await agenda.schedule(trigger, "send reminder", {
      reminderId: reminder._id.toString(),
    });

    res
      .status(200)
      .json({ ok: true, message: "Reminder updated successfully" });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const dismiss = async (req, res) => {
  const { id } = req.params;
  try {
    const reminder = await Reminder.findOne({ _id: id, userId: req.userId });
    if (!reminder) {
      return res.status(404).json({ ok: false, message: "Reminder not found" });
    }

    await agenda.cancel({ "data.reminderId": reminder._id.toString() });
    await Reminder.findByIdAndUpdate(id, { sent: true }, { new: true });

    res.status(200).json({ ok: true, message: "Reminder dismissed" });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const reminder = await Reminder.findOne({ _id: id, userId: req.userId });
    if (!reminder) {
      return res.status(404).json({ ok: false, message: "Reminder not found" });
    }
    await agenda.cancel({ "data.reminderId": reminder._id.toString() });
    await Reminder.findByIdAndDelete(id);
    res
      .status(200)
      .json({ ok: true, message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
