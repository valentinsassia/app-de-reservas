import mongoose from "mongoose";

const infousuarios = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    usuario: { type: String },
    telefono: { type: Number },
    reservas: [{
      dia: { type: String },
      hora: { type: Number },
      cancha: { type: Number },
      complejo: { type: String },
      precio: {type: Number}
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("infousuarios", infousuarios);
