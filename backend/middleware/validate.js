export const validateRegister = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ ok: false, error: "All fields are required" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        ok: false,
        message:
          "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
      });
    }
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "Avatar is required" });
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ ok: false, message: "Avatar must be a JPG, PNG, or WEBP" });
    }
    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: `Something went wrong` });
    console.log(error);
  }
};

export const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "All fields are required" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid email format" });
    }
    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: `Something went wrong` });
    console.log(error);
  }
};

export const validateResetPass = (req, res, next) => {
  try {
    const { password } = req.body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        ok: false,
        message:
          "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: `Something went wrong` });
    console.log(error);
  }
};

export const validateApplication = (req, res, next) => {
  try {
    const { company, role, status, jobUrl, salaryMin, salaryMax } = req.body;

    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;

    const validStatuses = [
      "wishlist",
      "applied",
      "interview",
      "offer",
      "rejected",
    ];

    if (!company || !role) {
      return res
        .status(400)
        .json({ ok: false, message: "Company and role are required" });
    }

    if (company.length > 100) {
      return res
        .status(400)
        .json({ ok: false, message: "Company max 100 characters" });
    }

    if (role.length > 100) {
      return res
        .status(400)
        .json({ ok: false, message: "Role max 100 characters" });
    }

    if (status && !validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid status value" });
    }

    if (jobUrl && !urlRegex.test(jobUrl)) {
      return res
        .status(400)
        .json({ ok: false, message: "Job URL must be a valid URL" });
    }

    if (salaryMin && isNaN(Number(salaryMin))) {
      return res
        .status(400)
        .json({ ok: false, message: "Salary min must be a number" });
    }

    if (salaryMax && isNaN(Number(salaryMax))) {
      return res
        .status(400)
        .json({ ok: false, message: "Salary max must be a number" });
    }

    if (salaryMin && salaryMax && Number(salaryMax) < Number(salaryMin)) {
      return res.status(400).json({
        ok: false,
        message: "Salary max must be greater than salary min",
      });
    }

    if (req.file) {
      if (req.file.mimetype !== "application/pdf") {
        return res
          .status(400)
          .json({ ok: false, message: "Resume must be a PDF" });
      }
    }

    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: "Something went wrong" });
    console.log(error);
  }
};
export const validateContact = (req, res, next) => {
  try {
    const { applicationId, name, email, linkedIn } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    const mongoIdRegex = /^[a-f\d]{24}$/i;

    if (!applicationId) {
      return res
        .status(400)
        .json({ ok: false, message: "Application ID is required" });
    }

    if (!mongoIdRegex.test(applicationId)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid application ID" });
    }

    if (!name) {
      return res
        .status(400)
        .json({ ok: false, message: "Contact name is required" });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        ok: false,
        message: "Name must be between 2 and 100 characters",
      });
    }

    if (email && !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid email format" });
    }

    // if (linkedIn && !linkedInRegex.test(linkedIn)) {
    //   return res
    //     .status(400)
    //     .json({ ok: false, message: "Invalid LinkedIn URL format" });
    // }

    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: "Something went wrong" });
    console.log(error);
  }
};
export const validateInterview = (req, res, next) => {
  try {
    const { applicationId, round, scheduledAt, format, outcome, notes } =
      req.body;

    const mongoIdRegex = /^[a-f\d]{24}$/i;

    const validFormats = [
      "phone",
      "behavioral",
      "technical",
      "final_round",
      "other",
    ];
    const validOutcomes = ["pending", "passed", "rejected", "no_show"];

    if (!applicationId) {
      return res
        .status(400)
        .json({ ok: false, message: "Application ID is required" });
    }

    if (!mongoIdRegex.test(applicationId)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid application ID" });
    }

    if (round && round.length > 100) {
      return res
        .status(400)
        .json({ ok: false, message: "Round max 100 characters" });
    }

    if (scheduledAt && isNaN(new Date(scheduledAt).getTime())) {
      return res
        .status(400)
        .json({ ok: false, message: "Scheduled date must be a valid date" });
    }

    if (format && !validFormats.includes(format)) {
      return res.status(400).json({
        ok: false,
        message: `Format must be one of: ${validFormats.join(", ")}`,
      });
    }

    if (outcome && !validOutcomes.includes(outcome)) {
      return res.status(400).json({
        ok: false,
        message: `Outcome must be one of: ${validOutcomes.join(", ")}`,
      });
    }

    if (notes && notes.length > 500) {
      return res
        .status(400)
        .json({ ok: false, message: "Notes max 500 characters" });
    }

    next();
  } catch (error) {
    res.status(400).json({ ok: false, message: "Something went wrong" });
    console.log(error);
  }
};
