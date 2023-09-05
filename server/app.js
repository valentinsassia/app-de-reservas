import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { info_complejo, reservar } from "./socket-functions.js";

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
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());

app.use(rutas)

app.use(express.static(join(__dirname, "./../client/build")));

export default server;
