import { useEffect } from "react";
import "./confirmar.css";

import { useParams, useNavigate } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Confirmar() {
  useEffect(() => {
    socket.on("resultado", (condicion) => {
      if (condicion) {
        navigate(`/${nombre}`);
      }
    });
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  let nombre = params.nombre;
  let hora = params.hora;
  let cancha = params.cancha;
  let dia = params.dia;
  let fecha = dia + " " + params.fecha;

  return (
    <div className="contenedor_confirmar">
      <div onClick={() => navigate(`/${nombre}`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      <div>
        <p>¡Ya casi terminamos!</p>
        <p>Revisar y Confirmar</p>
      </div>
      <div className="informacion_contenedor">
        <div>
          <p className="primario">Complejo</p>
          <p className="secundario">{nombre}</p>
        </div>
        <div>
          <p className="primario">Fecha</p>
          <p className="secundario">{fecha}</p>
        </div>
        <div>
          <p className="primario">Hora</p>
          <p className="secundario">{hora}:00</p>
        </div>
        <div>
          <p className="primario">Duración</p>
          <p className="secundario">60 minutos</p>
        </div>
        <div>
          <p className="primario">Cancha</p>
          <p className="secundario">{cancha}</p>
        </div>
      </div>
      <div
        className="boton boton_activado boton_font"
        onClick={() => {
          socket.emit("reservar", {
            nombre,
            cancha,
            hora,
            dia,
          });
        }}
      >
        Confirmar
      </div>
    </div>
  );
}

export default Confirmar;
