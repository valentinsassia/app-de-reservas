import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import {
  cancelar_reserva,
  comprobar_reserva,
  comprobar_token,
  confirmar_codigo,
  info_complejo,
  login,
  register_email,
  reservar,
} from "./socket-functions.js";

import rutas from "./routes/auth.routes.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

var fecha = new Date();

var fechaa = new Date(fecha.valueOf() - fecha.getTimezoneOffset() * 60000);

console.log(fecha)
console.log(fechaa)

const __dirname = dirname(fileURLToPath(import.meta.url));

io.on("connection", (socket) => {
  try {
    socket.on("info-complejo", (peticion) => {
      info_complejo({ peticion, socket });
    });
    socket.on("reservar", (peticion) => {
      reservar({ peticion, socket });
    });
    socket.on("register_email", (peticion) => {
      register_email({ peticion });
    });
    socket.on("confirmar_codigo", (peticion) => {
      confirmar_codigo({ peticion, socket });
    });
    socket.on("login", (peticion) => {
      login({ peticion, socket });
    });
    socket.on("comprobar_token", (peticion) => {
      comprobar_token({ peticion, socket });
    });
    socket.on("comprobar_reserva", (peticion) => {
      comprobar_reserva({ peticion, socket });
    });
    socket.on("cancelar_reserva", (peticion) => {
      cancelar_reserva({ peticion, socket });
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());

app.use(rutas);

app.use(express.static(join(__dirname, "./../client/build")));

export default server;
