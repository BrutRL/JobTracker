import multer from "multer";

export const errorFileValidator = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        ok: false,
        message: "File is too large. Maximum size is 1MB only.",
      });
    }
    return res.status(400).json({ ok: false, message: err.message });
  }

  if (err.message.includes("Only")) {
    return res.status(400).json({ ok: false, message: err.message });
  }

  return res.status(500).json({ ok: false, message: "Internal server error" });
};
