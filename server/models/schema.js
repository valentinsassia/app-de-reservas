const mongoose = require("mongoose")

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
  contraseña: {
    type: String,
  },
  imagenes: {
    type: Array,
  },
  Horarios: [
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
              hora: { type: Number },
            },
          ],
        },
      ],
    },
  ],
  ayer: {
    type: String,
  }
});

export default mongoose.model("infocomplejo", infocomplejo);