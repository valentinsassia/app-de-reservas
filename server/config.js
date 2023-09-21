import dotenv from "dotenv";

dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const PORT = process.env.PORT || 4000;
export  const EMAIL = process.env.EMAIL
export  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
