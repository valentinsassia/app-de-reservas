import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { info_complejo } from "./socket-functions.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {},
});

io.on("connection", (socket) => {
  try {
    socket.on("info-complejo", (peticion) => {
      info_complejo({ peticion, socket });
    });
  } catch (error) {
    console.log(error);
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.use(express.static(join(__dirname, "./../client/build")));

export default server;
