import infocomplejo from "./models/infocomplejo.js";
import infousuarios from "./models/infousuarios.js";

import jwt from "jsonwebtoken";

import { transporter } from "./helpers/mail.js";
import { EMAIL } from "./config.js";

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

export const login_email = async (datos) => {
  try {
    let email = datos.peticion.email;

    let codigo = "";

    for (let index = 0; index <= 5; index++) {
      let caracteres = Math.ceil(Math.random() * 9);
      codigo += caracteres;
    }

    const newUsuario = new infousuarios({
      email,
      codigo_login: codigo,
    });

    await newUsuario.save();

    await transporter.sendMail({
      from: EMAIL,
      to: "valensassia2003@outlook.com",
      subject: `${codigo}`,
      body: "hola",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login_codigo = async (datos) => {
  try {
    const socket = datos.socket;
    let email = datos.peticion.email;
    let codigo = datos.peticion.codigo;

    const prueba = await infousuarios.find({
      email: { $eq: email },
      codigo_login: { $eq: codigo },
    });

    if (prueba.length) {
      jwt.sign({ email }, "secreto", (error, token) => {
        if (error) console.log(error);
        socket.emit("login_codigo_res", { token, condicion: true });
      });
    }

    if (!prueba.length) {
      socket.emit("login_codigo_res", { condicion: false });
    }
  } catch (error) {
    console.log(error);
  }
};
