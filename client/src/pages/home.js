import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";
import Navegacion from "./components/navegacion";

import { useEffect, useState } from "react";

import io from "socket.io-client";
// const socket = io("http://localhost:4000");
const socket = io();

function Home() {
  const [respuesta, setRespuesta] = useState("0");

  const horarios = respuesta.horarios;
  const imagenes = respuesta.imagenes;

  useEffect(() => {
    socket.emit("info-complejo", {
      nombre: "La Esquina",
    });
    socket.on("info-complejo-res", (respuesta) => {
      setRespuesta(respuesta[0]);
    });

    socket.emit("prueba", {
      num: 4
    })
    socket.on("prueba-res", (respuesta) => {
      console.log(respuesta)
    })
  }, []);

  const horarios_contenedor = () => {
    if (horarios !== undefined) {
      return <Horarios horarios={horarios} />;
    }
  };

  return (
    <div className="home">
      <div className="contenedor arriba">{<Navegacion />}</div>
      <div className="contenedor menu">
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
      <div className="contenedor medio">{<Slider />}</div>
      <div className="contenedor abajo">{horarios_contenedor()}</div>
    </div>
  );
}

export default Home;
