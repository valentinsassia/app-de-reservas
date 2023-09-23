import mongoose from "mongoose";

const infocomplejo = new mongoose.Schema({
  nombre: {
    type: String,
  },
  direccion: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  imagenes: {
    type: Array,
  },
  horarios: [
    {
      cancha: { type: Number },
      costo: { type: Number },
      horario: [
        {
          dia: { type: String },
          reservas: { type: Array },
          horas: [
            {
              estado: { type: Boolean },
              fijado: { type: Boolean },
              hora: { type: Number },
            },
          ],
        },
      ],
    },
  ],
  ayer: {
    type: String,
  },
  token: {
    type: String
  }
});

export default mongoose.model("infocomplejo", infocomplejo);
