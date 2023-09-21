import nodemailer from "nodemailer"
import { EMAIL, EMAIL_PASSWORD } from "../config.js";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });
  