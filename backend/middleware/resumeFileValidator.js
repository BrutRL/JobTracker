import multer from "multer";
import path from "path";

export const resumeStorage = multer.diskStorage({
  destination: "./public/resume",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter,
});
