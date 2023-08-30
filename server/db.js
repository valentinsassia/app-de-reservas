import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}
