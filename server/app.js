import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { info_complejo, reservar } from "./socket-functions.js";

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

app.use(express.static(join(__dirname, "./../client/build")));

app.get("/prueba", (req,res) => {
  res.sendFile(join(__dirname, "./../client/build"))
})

app.get("/enviar", (req, res) => {
  res.redirect("/")
})

export default server;
