import "./informacion.css";

function Informacion({ informacion }) {
    
  let horarios = informacion.horarios[0].horario[0].horas;

  return (
    <>
      <div className="contenedor_datos">
        <p className="primario">Nombre</p>
        <p className="secundario">{informacion.nombre}</p>
        <p className="primario">Horarios</p>
        <p className="secundario">
          {horarios.at(0).hora}:00 - {horarios.at(-1).hora}:00
        </p>
        <p className="primario">Cantidad de canchas</p>
        <p className="secundario">{informacion.horarios.length}</p>
        <p className="primario">Direccion</p>
        <p className="secundario">{informacion.direccion}</p>
      </div>
    </>
  );
}

export default Informacion;
