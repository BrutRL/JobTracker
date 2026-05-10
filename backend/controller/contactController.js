import { Contact } from "../model/contactModel.js";
import { Application } from "../model/applicationModel.js";
export const specific = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.find({
      applicationId: id,
      userId: req.userId,
    });
    res.status(200).json({ ok: true, data: contact });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const create = async (req, res) => {
  const { applicationId, name, role, email, linkedIn, notes } = req.body;
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
    const contact = new Contact({
      applicationId: applicationId,
      userId: req.userId,
      name: name,
      role: role,
      email: email,
      linkedIn: linkedIn,
      notes: notes,
    });
    await contact.save();
    res.status(201).json({ ok: true, message: `Contact Successfully Created` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { applicationId, name, role, email, linkedIn, notes } = req.body;
  try {
    await Contact.findByIdAndUpdate(
      id,
      {
        applicationId: applicationId,
        userId: req.userId,
        name: name,
        role: role,
        email: email,
        linkedIn: linkedIn,
        notes: notes,
      },
      {
        new: true,
      },
    );
    res.status(201).json({ ok: true, message: `Contact Updated Successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ ok: true, message: `Contact Deleted Successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
