import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import dns from "dns";

// force IPv4 globally
dns.setDefaultResultOrder("ipv4first");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
