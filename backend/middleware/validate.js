export const validateRegister = (req, res, next) => {
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
    return res.status(400).json({ ok: false, message: "Invalid email format" });
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
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, message: "Invalid email format" });
  }
  next();
};
