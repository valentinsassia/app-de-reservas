import "./reservas.css";

import { useContext, useState } from "react";

import { Contextos } from "../../../context/context.js";

import io from "socket.io-client";
const socket = io();

function Reservas({ nombre }) {
  const { reservas } = useContext(Contextos);

  let horas = reservas.horas;
  let dia = reservas.dia;
  let cancha = reservas.num_cancha;

  const [seleccionado, setSeleccionado] = useState("");

  const con_reservas = () => {
    if (horas.length) {
      return horas
        .sort((x, y) => x.hora - y.hora)
        .map((elem, index) => {
          return (
            <>
              <div
                key={index}
                className={`con_reservas ${
                  seleccionado === elem.hora ? "cambiar_bordes" : ""
                }`}
                onClick={() => {
                  if (seleccionado === elem.hora) {
                    setSeleccionado("");
                  } else setSeleccionado(elem.hora);
                }}
              >
                <ion-icon
                  name={`${
                    elem.fijado ? `eyedrop-outline` : `checkmark-circle-outline`
                  }`}
                ></ion-icon>
                <p>{elem.hora}:00</p>
                <ion-icon
                  name={`${
                    seleccionado === elem.hora
                      ? `chevron-up-outline`
                      : `chevron-down-outline`
                  }`}
                ></ion-icon>
              </div>
              <div
                key={index + 1}
                className={`${
                  seleccionado === elem.hora ? "desplegar" : "none"
                }`}
              >
                <p
                  onClick={() => {
                    socket.emit("fijar_hora", {
                      dia: dia[0],
                      cancha,
                      hora: elem.hora,
                      nombre,
                      accion: elem.fijado
                    });
                  }}
                >
                  {`${elem.fijado ? `Quitar fijado` : `Fijar horario`}`}
                </p>
              </div>
            </>
          );
        });
    }
  };

  const sin_reservas = () => {
    if (!horas.length) {
      return (
        <div className="sin_reservas">
          <ion-icon name="close-circle-outline"></ion-icon>
          <p>Sin reservas</p>
        </div>
      );
    }
  };

  return (
    <>
      {con_reservas()}
      {sin_reservas()}
    </>
  );
}

export default Reservas;
