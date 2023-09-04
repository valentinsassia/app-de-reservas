import "./confirmar.css";

import { useParams } from "react-router-dom";

function Confirmar() {
  const params = useParams();

  let nombre = params.nombre;
  let hora = params.hora;
  let cancha = params.cancha;
  let fecha = params.dia + " " + params.fecha;

  return (
    <div className="contenedor_confirmar">
      <div>
        <p>¡Ya casi terminamos!</p>
        <p>Revisa y Confirma</p>
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
      <div className="boton boton_activado">Confirmar</div>
    </div>
  );
}

export default Confirmar;
