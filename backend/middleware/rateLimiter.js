import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 5,
  handler: (req, res, next, options) => {
    res.redirect(`${process.env.FRONT_END_URL}/limit_page`);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  handler: (req, res, next, options) => {
    res.redirect(`${process.env.FRONT_END_URL}/limit_page`);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const profileUpdateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  handler: (req, res, next, options) => {
    res.redirect(`${process.env.FRONT_END_URL}/limit_page`);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const applicationLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 200,
  handler: (req, res, next, options) => {
    res.redirect(`${process.env.FRONT_END_URL}/limit_page`);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
