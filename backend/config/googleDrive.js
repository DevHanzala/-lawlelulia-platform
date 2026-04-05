import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost"
);

// ✅ THIS is the key line
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});