import rateLimit from "express-rate-limit";

const jsonHandler = (req, res, next, options) => {
  res.status(options.statusCode).json({
    ok: false,
    message: "Too many requests",
    redirect: `${process.env.FRONT_END_URL}/limit_page`,
  });
};

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});
export const resetEmailLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 5,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});
export const resetPassLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
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
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
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

export const contactLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const interviewLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});

export const reminderLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});
export const updateApplicationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15,
  handler: jsonHandler,
  standardHeaders: true,
  legacyHeaders: false,
});
export const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3000,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: "Too many requests",
      redirect: `${process.env.FRONT_END_URL}/limit_page`,
    });
  },
});
