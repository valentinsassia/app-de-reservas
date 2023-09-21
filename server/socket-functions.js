import infocomplejo from "./models/infocomplejo.js";
import infousuarios from "./models/infousuarios.js";

import { Resend } from "resend";
import jwt from "jsonwebtoken";

console.log(Resend);

export const info_complejo = async (datos) => {
  try {
    let socket = datos.socket;

    let nombre = datos.peticion.nombre;

    const fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
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
      complejo = [
        await infocomplejo.findOneAndUpdate(
          {
            nombre: { $eq: nombre },
          },
          {
            $set: {
              ayer: ayer,
              "horarios.$[].horario.$[a].reservas": [],
              "horarios.$[].horario.$[a].horas.$[e].estado": true,
            },
          },
          {
            arrayFilters: [{ "a.dia": ayer }, { "e.fijado": false }],
            returnNewDocument: true,
          }
        ),
      ];
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

    let complejo = await infocomplejo.updateOne(
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

    await infocomplejo.updateOne(
      {
        nombre: { $eq: nombre },
      },
      {
        $addToSet: {
          "horarios.$[a].horario.$[e].reservas": {
            hora,
          },
        },
      },
      {
        arrayFilters: [{ "a.cancha": cancha }, { "e.dia": dia }],
      }
    );

    if (complejo.modifiedCount) {
      socket.broadcast.emit(nombre, "");
      socket.emit("resultado", true);
    } else socket.emit("resultado", false);
  } catch (error) {
    console.log(error);
  }
};

export const fijar_hora = async (datos) => {
  try {
    let socket = datos.socket;
    const nombre = datos.peticion.nombre;
    const hora = datos.peticion.hora;
    const dia = datos.peticion.dia;
    const cancha = datos.peticion.cancha;
    const accion = datos.peticion.accion;

    let complejo = await infocomplejo.updateOne(
      {
        nombre: { $eq: nombre },
      },
      {
        $set: {
          "horarios.$[a].horario.$[e].horas.$[i].fijado": !accion,
        },
      },
      {
        arrayFilters: [
          { "a.cancha": cancha },
          { "e.dia": dia },
          { "i.hora": hora },
        ],
      }
    );
    if (complejo.modifiedCount) {
      socket.broadcast.emit(nombre, "");
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (datos) => {
  try {
    const socket = datos.socket;
    let email = datos.peticion.email;

    const newUsuario = new infousuarios({
      email,
    });

    const usuarioSave = await newUsuario.save();

    jwt.sign({ id: usuarioSave._id }, "secreto", async (error, token) => {
      if (error) console.log(error);
      //   const data = await resend.emails.send({
      //     from: "Acme <onboarding@resend.dev>",
      //     to: ["valensassia2003@outlook.com"],
      //     subject: "Hello World",
      //     html: `<strong>${token}</strong>`,
      //   });
      // }
      console.log(token);
    });
  } catch (error) {
    console.log(error);
  }
};
