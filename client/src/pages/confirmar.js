import "./confirmar.css";

import { useParams } from "react-router-dom";

function Confirmar() {
  const params = useParams();

  let nombre = params.nombre;
  let hora = params.hora;
  let cancha = params.cancha;

  return <div className="contenedor_confirmar"></div>;
}

export default Confirmar;
