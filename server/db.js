const mongoose = require("mongoose")
// import { MONGODB_URL } from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://appreservas:DezM1ODEnueAZZCP@app-reservas.uerhgnm.mongodb.net/app?retryWrites=true&w=majority");
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}
