import "./reservas.css";

import { useContext } from "react";

import { Contextos } from "../../../context/context.js";

function Reservas() {
  const { reservas } = useContext(Contextos);

  const reservas_informacion = () => {
    if (reservas.length) {
      return reservas.map((elem) => {
        return <p>{elem.hora}</p>;
      });
    }
  };

  return <>{reservas_informacion()}</>;
}

export default Reservas;
