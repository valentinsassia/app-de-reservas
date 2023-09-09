import "./gestionar.css";

import Horarios from "./components/horarios/horarios.js";
import Barrainferior from "./components/barrainferior/barrainferior.js";
import Reservas from "./components/reservas/reservas.js";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Gestionar() {
  const params = useParams();

  const [condicion_cancha, setCondicion_cancha] = useState(false);
  const [num_cancha, setNum_cancha] = useState(1);

  const [respuesta, setRespuesta] = useState("0");
  const [reiniciar, setReiniciar] = useState(0);

  const nombre = params.nombre;
  const horarios = respuesta.horarios;

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
    if (horarios !== undefined) {
      return (
        <Horarios
          nombre={nombre}
          horarios={horarios}
          tipo={"auto-reservar"}
          num_cancha={num_cancha}
          setCondicion_cancha={setCondicion_cancha}
        />
      );
    }
  };

  const reservar_contenedor = () => {
    if (horarios !== undefined) {
      return (
        <div className="reservas_contenedor">
          <Reservas />
        </div>
      );
    }
  };

  const elegir_canchas = () => {
    if (condicion_cancha) {
      return (
        <div className="contenedor elegir_canchas">
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
    <div className="gestionar">
      <div className="info_contenedor">
        <div className="horarios_contenedor">{horarios_contenedor()}</div>
        <>{reservar_contenedor()}</>
      </div>

      <>{elegir_canchas()}</>

      <>
        <Barrainferior />
      </>

      <div
        className={`${condicion_cancha ? `cortina` : ``}`}
        onClick={() => {
          setCondicion_cancha(false);
        }}
      ></div>
    </div>
  );
}

export default Gestionar;
