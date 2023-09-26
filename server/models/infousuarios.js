import mongoose from "mongoose";

const infousuarios = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    codigo: {
      type: String,
    },
    token: {
      type: String,
    },
    usuario: { type: String },
    telefono: { type: Number },
    dia: { type: String },
    hora: { type: Number },
    cancha: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("infousuarios", infousuarios);
