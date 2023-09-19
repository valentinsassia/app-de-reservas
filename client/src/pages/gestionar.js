import "./gestionar.css";

import Horarios from "./components/horarios/horarios.js";
import Barrainferior from "./components/barrainferior/barrainferior.js";
import Reservas from "./components/reservas/reservas.js";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Gestionar() {
  const params = useParams();
  const navigate = useNavigate();

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

  const sin_informacion = () => {
    if (horarios === undefined) {
      return (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    }
  };

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
          <Reservas nombre={nombre} />
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
      {sin_informacion()}

      <div onClick={() => navigate(`/${nombre}`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>

      <div className="info_contenedor">
        <div className="horarios_contenedor">{horarios_contenedor()}</div>
        <>{reservar_contenedor()}</>
      </div>

      <>{elegir_canchas()}</>

      {/* <>
        <Barrainferior />
      </> */}

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
