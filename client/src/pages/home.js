import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";
import Navegacion from "./components/navegacion";

import { useEffect, useState } from "react";

import io from "socket.io-client";
// const socket = io("http://localhost:4000");
const socket = io();

function Home() {
  const [condicion, setCondicion] = useState(false);

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
  }, []);

  const horarios_contenedor = () => {
    if (horarios !== undefined) {
      return <Horarios horarios={horarios} />;
    }
  };

  const imagenes_contenedor = () => {
    if (imagenes !== undefined) {
      return <Slider imagenes={imagenes} />;
    }
  };

  return (
    <div className="home">
      <div className="contenedor arriba">{<Navegacion />}</div>

      <div
        className={`contenedor menu ${condicion ? `modificar` : ``}`}
        onClick={() => setCondicion(!condicion)}
      >
        <ion-icon
          name={`${condicion ? `close-outline` : `chevron-down-outline`}`}
        ></ion-icon>
      </div>
      <div className={`contenedor ${condicion ? `menu_oculto` : ``}`}></div>

      <div className="contenedor medio">{imagenes_contenedor()}</div>
      <div className="contenedor abajo">{horarios_contenedor()}</div>

      <div
        className={`${condicion ? `cortina` : ``}`}
        onClick={() => setCondicion(!condicion)}
      ></div>
    </div>
  );
}

export default Home;
