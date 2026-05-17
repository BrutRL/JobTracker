import { Application } from "../model/applicationModel.js";

export const all = async (req, res) => {
  try {
    const application = await Application.find({ userId: req.userId });
    res.status(200).json({ ok: true, data: application });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const create = async (req, res) => {
  const {
    company,
    role,
    status,
    location,
    jobUrl,
    salaryMin,
    salaryMax,
    notes,
    tags,
  } = req.body;
  const resumePath = req.file.filename;
  const application = new Application({
    userId: req.userId,
    company: company,
    role: role,
    status: status,
    location: location,
    jobUrl: jobUrl,
    salaryMin: salaryMin,
    salaryMax: salaryMax,
    notes: notes,
    resumeUrl: resumePath,
    tags: tags,
  });

  await application.save();
  res
    .status(201)
    .json({ ok: true, message: `Application Created Successfully` });
  try {
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const {
    company,
    role,
    status,
    location,
    jobUrl,
    salaryMin,
    salaryMax,
    notes,
    tags,
  } = req.body;
  const resumePath = req.file.filename;
  await Application.findByIdAndUpdate(
    id,
    {
      userId: req.userId,
      company: company,
      role: role,
      status: status,
      location: location,
      jobUrl: jobUrl,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      notes: notes,
      resumeUrl: resumePath,
      tags: tags,
    },
    {
      new: true,
    },
  );
  res
    .status(201)
    .json({ ok: true, message: `Application Updated Successfully` });
  try {
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await Application.findByIdAndDelete(id);
    res
      .status(200)
      .json({ ok: true, message: `Application Deleted Successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
