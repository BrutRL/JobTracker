import { Interview } from "../model/interviewModel.js";
import { Application } from "../model/applicationModel.js";
export const all = async (req, res) => {
  const { id } = req.params;
  try {
    const interview = await Interview.find({
      applicationId: id,
      userId: req.userId,
    });
    res.status(200).json({ ok: true, data: interview });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const create = async (req, res) => {
  const { applicationId, round, scheduledAt, format, notes, outcome } =
    req.body;
  try {
    const application = await Application.findOne({
      _id: applicationId,
      userId: req.userId,
    });
    if (!application) {
      return res
        .status(400)
        .json({ ok: false, message: `You dont have any application yet` });
    }
    const interview = new Interview({
      applicationId: applicationId,
      userId: req.userId,
      round: round,
      scheduledAt: scheduledAt,
      format: format,
      notes: notes,
      outcome: outcome,
    });
    await interview.save();
    res
      .status(200)
      .json({ ok: true, message: `Interview successfully created` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { applicationId, round, scheduledAt, format, notes, outcome } =
    req.body;
  try {
    await Interview.findByIdAndUpdate(
      id,
      {
        applicationId: applicationId,
        userId: req.userId,
        round: round,
        scheduledAt: scheduledAt,
        format: format,
        notes: notes,
        outcome: outcome,
      },
      {
        new: true,
      },
    );
    res
      .status(200)
      .json({ ok: true, message: `Interview Updated successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await Interview.findByIdAndDelete(id);
    res
      .status(200)
      .json({ ok: true, message: `Interview Deleted successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
