import mongoose from "mongoose";

const infousuarios = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    usuario: { type: String },
    telefono: { type: Number },
    dia: { type: String },
    hora: { type: Number },
    cancha: { type: Number },
    reserva: { type: Boolean },
    complejo: { type: String },
    reservas: [{
      dia: { type: String },
      hora: { type: Number },
      cancha: { type: Number },
      complejo: { type: String },
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("infousuarios", infousuarios);
