import "./navegacion.css";

import { useState } from "react";

function Navegacion() {
  const [navegacion, setNavegacion] = useState(true);

  return (
    <>
      <div
        className={`${navegacion ? `elegido` : ``}`}
        onClick={() => {
          setNavegacion(true);
        }}
      >
        <p>Reservar</p>
        <span></span>
      </div>

      <div
        className={`${!navegacion ? `elegido` : ``}`}
        onClick={() => {
          setNavegacion(false);
        }}
      >
        <p>Ver más</p>
        <span></span>
      </div>
    </>
  );
}

export default Navegacion;
