import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import {
  comprobar_token,
  confirmar_codigo,
  fijar_hora,
  info_complejo,
  login,
  register_email,
  reservar,
} from "./socket-functions.js";

import rutas from "./routes/auth.routes.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

io.on("connection", (socket) => {
  try {
    socket.on("info-complejo", (peticion) => {
      info_complejo({ peticion, socket });
    });
    socket.on("reservar", (peticion) => {
      reservar({ peticion, socket });
    });
    socket.on("fijar_hora", (peticion) => {
      fijar_hora({ peticion, socket });
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
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());

app.use(rutas);

app.use(express.static(join(__dirname, "./../client/build")));

export default server;
