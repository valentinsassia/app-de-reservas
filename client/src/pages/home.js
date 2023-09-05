import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";
import Navegacion from "./components/navegacion";
import Menu from "./components/menu";
import Informacion from "./components/informacion";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Home() {
  const params = useParams();

  const [condicion_menu, setCondicion_menu] = useState(false);
  const [condicion_cancha, setCondicion_cancha] = useState(false);
  const [num_cancha, setNum_cancha] = useState(1);
  const [navegacion, setNavegacion] = useState(true);

  const [respuesta, setRespuesta] = useState("0");
  const [reiniciar, setReiniciar] = useState(0);

  const nombre = params.nombre;
  const horarios = respuesta.horarios;
  const imagenes = respuesta.imagenes;

  useEffect(() => {
    socket.emit("info-complejo", {
      nombre,
    });
    socket.on("info-complejo-res", (respuesta) => {
      setRespuesta(respuesta[0]);
    });
    socket.on(nombre, () => {
      let numero = reiniciar;
      setReiniciar(numero + 1);
    });
  }, [reiniciar]);

  const horarios_contenedor = () => {
    if (horarios !== undefined && navegacion) {
      return (
        <Horarios
          nombre={nombre}
          horarios={horarios}
          num_cancha={num_cancha}
          setCondicion_cancha={setCondicion_cancha}
        />
      );
    } else if (respuesta !== "0" && !navegacion) {
      return <Informacion informacion={respuesta} />;
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
          {horarios.map((elem, index) => {
            return (
              <div
                className={`${
                  num_cancha == elem.cancha ? `cancha_seleccionada` : ``
                }`}
                onClick={() => {
                  setNum_cancha(elem.cancha);
                  setCondicion_cancha(false);
                }}
                key={index}
              >
                Cancha {elem.cancha}
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="home">
      <div className="contenedor arriba">
        {<Navegacion navegacion={navegacion} setNavegacion={setNavegacion} />}
      </div>

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
