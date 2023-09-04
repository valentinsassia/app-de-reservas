import infocomplejo from "./models/schema.js";

export const info_complejo = async (datos) => {
  try {
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

    socket.emit("info-complejo-res", complejo);
  } catch (error) {
    console.log(error);
  }
};

export const reservar = async (datos) => {
  try {
    let socket = datos.socket;

    const nombre = datos.peticion.nombre;
    const hora = datos.peticion.hora;
    const dia = datos.peticion.dia;
    const cancha = datos.peticion.cancha;

    await infocomplejo.updateOne(
      {
        nombre: { $eq: nombre },
      },
      { $set: { "horarios.$[a].horario.$[e].horas.$[i].estado": false } },
      {
        arrayFilters: [
          { "a.cancha": cancha },
          { "e.dia": dia },
          { "i.hora": hora },
        ],
      }
    );

    socket.broadcast.emit("La Esquina", "");
  } catch (error) {
    console.log(error);
  }
};
