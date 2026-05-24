import dotenv from "dotenv";
dotenv.config();
import { User } from "../model/userModel.js";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

import { transporter } from "../middleware/nodemailer.js";
import crypto from "crypto";
import getOauthClient from "../config/googleClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatarPath = req.file.filename;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
      avatar: avatarPath,
    });
    await user.save();
    res.status(201).json({ ok: true, message: `Account successfully created` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
export const googleRegisterRedirect = (req, res) => {
  const client = getOauthClient("register");
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(url);
};

export const googleRegisterCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const client = getOauthClient("register");
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: client });
    const { data } = await oauth2.userinfo.get();

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.redirect(`${process.env.FRONT_END_URL}/user`);
    }
    // download google avatar and save to ./public/avatar
    const avatarResponse = await fetch(data.picture);
    const arrayBuffer = await avatarResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `${Date.now()}-${data.id}.jpg`;
    const avatarPath = path.join("public", "avatar", filename);
    fs.writeFileSync(avatarPath, buffer);

    const randomPassword = crypto.randomBytes(32).toString("hex");
    const hashPassword = await bcrypt.hash(randomPassword, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      avatar: filename,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONT_END_URL}/user`);
  } catch (error) {
    console.log(error);
    res.redirect(`${process.env.FRONT_END_URL}/error`);
  }
};

export const googleLoginRedirect = (req, res) => {
  const client = getOauthClient("login");
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(url);
};

export const googleLoginCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const client = getOauthClient("login");

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: client });
    const { data } = await oauth2.userinfo.get();

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.redirect(`${process.env.FRONT_END_URL}/error`);
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONT_END_URL}/user`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.FRONT_END_URL}/error`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ ok: false, message: `User not found` });
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(400).json({ ok: false, message: `Wrong password` });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.status(200).json({
      ok: true,
      message: `Log in Successfully`,
    });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");

      user.resetToken = crypto.createHash("sha256").update(token).digest("hex");
      user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30);
      await user.save();

      const resetUrl = `${process.env.FRONT_END_URL}/reset_pass?token=${token}`;
      await transporter.sendMail({
        from: `"JobQuest" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Reset Your Password - JobQuest",
        html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D1117; padding:20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#161B22; padding:30px; border-radius:8px; font-family:Arial, sans-serif; color:#E6EDF3;">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <h2 style="color:#F0A500; margin:0; font-family:monospace;">JobQuest</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="font-size:16px; margin:0 0 15px 0;">Hi <strong>${user.name}</strong>,</p>
                    <p style="font-size:16px; margin:0 0 20px 0;">
                      We received a request to reset your password. Click the button below to proceed:
                    </p>
                    <div style="text-align:center; margin:30px 0;">
                    <a href="${resetUrl}"
                         style="background-color:#F0A500; color:#0D1117; padding:12px 24px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">
                        Reset My Password
                      </a>
                    </div>
                    <p style="font-size:14px; color:#8B949E;">
                      If you did not request this, ignore this email — your account is safe.
                    </p>
                    <hr style="border:none; border-top:1px solid #21262D; margin:30px 0;">
                    <p style="font-size:14px; color:#8B949E; margin:0;">
                      Best regards,<br>
                      <strong style="color:#F0A500;">JobQuest Team</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
      });
    }

    res.status(200).json({
      ok: true,
      message:
        "A reset link has been sent to your email. Please check your inbox or spam folder",
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashed,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid or expired reset link." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ ok: true, message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ ok: true, message: `Logout successfully` });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
export const authorized = async (req, res) => {
  try {
    res.status(200).json({ ok: true, message: req.user });
  } catch (error) {
    res.status(401).json({ ok: false, error: error.message });
  }
};
