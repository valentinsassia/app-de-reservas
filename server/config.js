import dotenv from "dotenv";

dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const PORT = process.env.PORT || 4000;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID
