import rateLimit from "express-rate-limit";

const jsonHandler = (req, res, next, options) => {
  res.status(options.statusCode).json({
    ok: false,
    message: "Too many requests",
    redirect: `${process.env.FRONT_END_URL}/limit_page`,
  });
};

export const loginLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 5,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const profileUpdateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const applicationLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 200,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});
