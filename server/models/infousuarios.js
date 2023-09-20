import mongoose from "mongoose";

const infousuarios = new mongoose.Schema({
  email: {
    type: String,
  },
}, {
  timestamps: true
});

export default mongoose.model("infousuarios", infousuarios);
