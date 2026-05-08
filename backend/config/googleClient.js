import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

const getOauthClient = (flow) => {
  const redirectUri =
    flow === "register"
      ? `${process.env.BASE_URL}/auth/google/jobquest/register`
      : `${process.env.BASE_URL}/auth/google/jobquest/login`;

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri,
  );
};

export default getOauthClient;
