import infocomplejo from "./models/schema.js";

export const prueba = async (datos) => {
  let socket = datos.socket;

  let nombre = datos.peticion.nombre;

  const fecha = new Date();
  let dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  let ayer = dias[fecha.getDay() - 1];
  if (ayer == undefined) {
    ayer = "Sabado";
  }

  let complejo = await infocomplejo.find({
    nombre: { $eq: nombre },
  });

  const ayer_mongo = complejo[0].ayer;

  if (ayer_mongo !== ayer) {
    let horas = complejo[0].horarios[0].horario[0].horas.map((e) => {
      return { hora: e.hora, estado: true };
    });
    complejo = await infocomplejo.findOneAndUpdate(
      {
        nombre: { $eq: nombre },
      },
      {
        $set: {
          "horarios.$[].horario.$[i]": { dia: ayer, reservas: [], horas },
        },
      },
      { arrayFilters: [{ "i.dia": ayer }], returnNewDocument: true }
    );
    await infocomplejo.updateOne(
      {
        nombre: { $eq: nombre },
      },
      { ayer: ayer }
    );
  }

  console.log(complejo)

  socket.emit("info-complejo-res", complejo);
};
