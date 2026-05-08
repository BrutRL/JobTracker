import dotenv from "dotenv";
dotenv.config();
import { User } from "../model/userModel.js";
import { google } from "googleapis";
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

    // check if already registered
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      // return res.redirect(
      //   `${process.env.FRONT_END_URL}/login?error=already_registered`,
      // );
      return res.send(`Already register`);
    }

    // password is required in your schema so generate a random one
    const randomPassword = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name: data.name,
      email: data.email,
      avatar: data.picture,
      password: randomPassword,
    });

    // const token = signToken(user);
    // res.cookie("token", token);
    res.redirect(`${process.env.FRONT_END_URL}/google_login_success`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.FRONT_END_URL}/google_failed`);
  }
};

// ─── GOOGLE LOGIN ─────────────────────────────────────

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
      return res.redirect(`${process.env.FRONT_END_URL}/google_failed`);
    }

    const token = signToken(user);
    res.cookie("token", token);
    res.redirect(`${process.env.FRONT_END_URL}/google_login_success`);
  } catch (error) {
    console.error(error);
    console.log(process.env.GOOGLE_CLIENT_ID);
    res.redirect(`${process.env.FRONT_END_URL}/google_failed`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    if (!email) {
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
      token: token,
    });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
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
