import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";
import Navegacion from "./components/navegacion";
import Menu from "./components/menu";

import { useEffect, useState } from "react";

import io from "socket.io-client";
const socket = io();

function Home() {
  const [condicion_menu, setCondicion_menu] = useState(false);
  const [condicion_cancha, setCondicion_cancha] = useState(false);

  const [num_cancha, setNum_cancha] = useState(1);

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
      return (
        <Horarios
          horarios={horarios}
          num_cancha={num_cancha}
          setCondicion_cancha={setCondicion_cancha}
        />
      );
    }
  };

  const imagenes_contenedor = () => {
    if (imagenes !== undefined) {
      return <Slider imagenes={imagenes} />;
    }
  };

  const elegir_canchas = () => {
    if (horarios !== undefined) {
      return (
        <div
          className={`contenedor ${condicion_cancha ? `elegir_canchas` : ``}`}
        >
          {horarios.map((elem) => {
            return (
              <p
                onClick={() => {
                  setNum_cancha(elem.cancha);
                  setCondicion_cancha(false);
                }}
              >
                Cancha {elem.cancha}
              </p>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="home">
      <div className="contenedor arriba">{<Navegacion />}</div>

      {
        <Menu
          condicion_menu={condicion_menu}
          setCondicion_menu={setCondicion_menu}
        />
      }

      <div className="contenedor medio">{imagenes_contenedor()}</div>
      <div className="contenedor abajo">{horarios_contenedor()}</div>

      {elegir_canchas()}

      <div
        className={`${condicion_menu || condicion_cancha ? `cortina` : ``}`}
        onClick={() => {
          setCondicion_menu(false);
          setCondicion_cancha(false);
        }}
      ></div>
    </div>
  );
}

export default Home;
