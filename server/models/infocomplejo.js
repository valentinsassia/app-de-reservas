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
      horario: [
        {
          dia: { type: String },
          horas: [
            {
              estado: { type: Boolean },
              precio: { type: Number },
              fijado: { type: Boolean },
              hora: { type: Number },
              usuario: { type: String },
              telefono: { type: Number },
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
    type: String,
  },
});

export default mongoose.model("infocomplejo", infocomplejo);
