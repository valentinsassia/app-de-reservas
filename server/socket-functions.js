import infocomplejo from "./models/infocomplejo.js";
import infousuarios from "./models/infousuarios.js";

import jwt from "jsonwebtoken";

import twilio from "twilio";

import {
  TWILIO_ACCOUNT_SID,
  TWILIO_SERVICE_SID,
  TWILIO_AUTH_TOKEN,
} from "./config.js";

export const info_complejo = async (datos) => {
  try {
    let socket = datos.socket;

    let nombre = datos.peticion.nombre;

    let fecha = new Date();
    fecha.toLocaleTimeString();
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
              "horarios.$[].horario.$[a].horas.$[e].estado": true,
              "horarios.$[].horario.$[a].horas.$[e].usuario": "",
              "horarios.$[].horario.$[a].horas.$[e].telefono": null,
            },
          },
          {
            arrayFilters: [{ "a.dia": ayer }, { "e.fijado": false }],
            returnNewDocument: true,
          }
        ),
      ];
      await infousuarios.updateMany(
        {
          "reservas.dia": ayer,
        },
        {
          $pull: { reservas: { dia: ayer } },
        }
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
    const precio = datos.peticion?.precio;
    const usuario =
      datos.peticion?.usuario !== undefined ? datos.peticion?.usuario : "";
    const telefono =
      datos.peticion?.telefono !== undefined ? datos.peticion?.telefono : null;
    const token = datos.peticion?.token;

    let Usuario = await infousuarios.updateOne(
      {
        token: { $eq: token },
      },
      {
        usuario,
        $addToSet: {
          reservas: {
            dia,
            hora,
            cancha,
            precio,
            complejo: nombre,
          },
        },
      }
    );

    if (Usuario.modifiedCount || telefono === null) {
      let complejo = await infocomplejo.updateOne(
        {
          nombre: { $eq: nombre },
        },
        {
          $set: {
            "horarios.$[a].horario.$[e].horas.$[i].estado": false,
            "horarios.$[a].horario.$[e].horas.$[i].usuario": usuario,
            "horarios.$[a].horario.$[e].horas.$[i].telefono": telefono,
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
        socket.emit("resultado", true);
      } else socket.emit("resultado", false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const register_telefono = async (datos) => {
  try {
    const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    let telefono = "+54" + datos.peticion.telefono;

    const { status } = await twilioClient.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: telefono,
        channel: "sms",
      });
  } catch (error) {
    console.log(error);
  }
};

export const confirmar_codigo = async (datos) => {
  try {
    const socket = datos.socket;
    let telefono = "+54" + datos.peticion.telefono;
    let code = datos.peticion.codigo;

    const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const { status } = await twilioClient.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: telefono,
        code,
      });

    if (status === "approved") {
      jwt.sign({ telefono }, "secreto", async (error, token) => {
        if (error) console.log(error);
        const verificar = await infousuarios.findOneAndUpdate(
          {
            telefono: { $eq: telefono },
          },
          {
            $set: { token: token },
          }
        );
        if (verificar === null) {
          const newUsuario = new infousuarios({
            telefono,
            token,
          });
          await newUsuario.save();
        }
        socket.emit("confirmar_codigo_res", { token, condicion: true });
      });
    } else socket.emit("confirmar_codigo_res", { condicion: false });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (datos) => {
  try {
    const socket = datos.socket;
    let email = datos.peticion.email;
    let password = datos.peticion.password;

    const verificar = await infocomplejo.find({
      email: { $eq: email },
      password: { $eq: password },
    });

    if (verificar.length) {
      jwt.sign({ email }, "secreto", async (error, token) => {
        if (error) console.log(error);
        await infocomplejo.updateOne(
          { email: { $eq: email } },
          {
            $set: {
              token: token,
            },
          }
        );
        socket.emit("login_res", { condicion: true, token });
      });
    }

    if (!verificar.length) {
      socket.emit("login_res", { condicion: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export const comprobar_token = async (datos) => {
  try {
    const socket = datos.socket;
    let token = datos.peticion;

    const verificar = await infocomplejo.find({ token: { $eq: token } });

    if (verificar.length) {
      socket.emit("comprobar_token_res", true);
    }
    if (!verificar.length) {
      socket.emit("comprobar_token_res", false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const comprobar_reserva = async (datos) => {
  try {
    const socket = datos.socket;
    let token = datos.peticion?.token;
    let dia_frontend = datos.peticion?.dia;

    let Usuario = await infousuarios.find({
      token: { $eq: token },
    });

    if (!Usuario.length) {
      let dueño = await infocomplejo.find({
        token: { $eq: token },
      });
      if (!dueño.length) {
        return socket.emit("comprobar_reserva_res", {
          respuesta: "no hay usuario",
        });
      }
      else return socket.emit("comprobar_reserva_res", {
        respuesta: "es dueño",
      });
    }

    let reservas = Usuario[0]?.reservas;

    let comprobar = reservas?.filter((e) => e.dia === dia_frontend);

    let dia = comprobar[0]?.dia;

    let usuario = Usuario[0]?.usuario;
    let telefono = Usuario[0]?.telefono;

    if (dia !== undefined || dia_frontend === undefined) {
      socket.emit("comprobar_reserva_res", {
        respuesta: "hay reserva",
        reservas,
        usuario,
        telefono,
      });
    }
    if (dia === undefined && dia_frontend !== undefined) {
      socket.emit("comprobar_reserva_res", {
        respuesta: "no hay reserva",
        usuario,
        telefono,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const cancelar_reserva = async (datos) => {
  try {
    const socket = datos.socket;

    const nombre = datos.peticion.nombre;
    const hora = datos.peticion.hora;
    const dia = datos.peticion.dia;
    const cancha = datos.peticion.cancha;

    const token = datos.peticion.token;

    await infousuarios.updateOne(
      {
        token: { $eq: token },
      },
      {
        $pull: { reservas: { dia: dia } },
      }
    );

    let complejo = await infocomplejo.updateOne(
      {
        nombre: { $eq: nombre },
      },
      {
        $set: {
          "horarios.$[a].horario.$[e].horas.$[i].estado": true,
          "horarios.$[a].horario.$[e].horas.$[i].usuario": "",
          "horarios.$[a].horario.$[e].horas.$[i].telefono": null,
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
      socket.emit("cancelar_reserva_res", true);
    }
  } catch (error) {
    console.log(error);
  }
};
