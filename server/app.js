import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import {
  fijar_hora,
  info_complejo,
  login_codigo,
  login_email,
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
    socket.on("login_email", (peticion) => {
      login_email({ peticion });
    });
    socket.on("login_codigo", (peticion) => {
      login_codigo({ peticion, socket });
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());

app.use(rutas);

app.use(express.static(join(__dirname, "./../client/build")));

export default server;
