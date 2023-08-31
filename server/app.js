import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import http from "http";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { prueba } from "./socket-functions.js";

import infocomplejo from "./models/schema.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    // origin: "http://localhost:3000",
  },
});

const prueba2 = async () => {
  const aver = await infocomplejo.find()
  console.log(aver)
}

prueba2()

app.use(cors());

io.on("connection", (socket) => {
  try {
    socket.on("info-complejo", (peticion) => {
        prueba({peticion,socket})
    });
  } catch (error) {
    console.log(error);
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.use(express.static(join(__dirname, "./../client/build")));

export default server;
