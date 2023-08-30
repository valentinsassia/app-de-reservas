import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";
import Navegacion from "./components/navegacion";

import { useEffect } from "react";

import io from "socket.io-client";
// const socket = io("http://localhost:4000");
const socket = io();

function Home() {

  useEffect(() => {
    socket.emit("prueba", {
      numero: 4
    })
    socket.on("respuesta", (respuesta) => {
      console.log(respuesta)
    })
  }, [])

  return (
    <div className="home">
      <div className="contenedor arriba">{<Navegacion />}</div>
      <div className="contenedor menu">
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
      <div className="contenedor medio">{<Slider />}</div>
      <div className="contenedor abajo">{<Horarios />}</div>
    </div>
  );
}

export default Home;
