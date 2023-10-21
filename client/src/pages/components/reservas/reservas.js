import "./reservas.css";

import { useContext, useState } from "react";

import { Contextos } from "../../../context/context.js";

import io from "socket.io-client";
const socket = io();

function Reservas({ nombre }) {
  const { infoReservas } = useContext(Contextos);

  let reservas = infoReservas.reservas;

  const [seleccionado, setSeleccionado] = useState("");

  const con_reservas = () => {
    if (reservas.length) {
      return reservas
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
                <div>
                  <ion-icon name="person-outline"></ion-icon>
                  <p>{elem.usuario === "" ? "-" : elem.usuario}</p>
                </div>
                <div>
                  <ion-icon name="call-outline"></ion-icon>
                  <p>{elem.telefono === null || elem.telefono === undefined ? "-" : elem.telefono}</p>
                </div>
              </div>
            </>
          );
        });
    }
  };

  const sin_reservas = () => {
    if (!reservas.length) {
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
