import "./navegacion.css";

function Navegacion({navegacion, setNavegacion}) {

  return (
    <>
      <div
        className={`${navegacion ? `elegido` : ``}`}
        onClick={() => {
          setNavegacion(true);
        }}
      >
        <p>Reservar</p>
        {/* <span></span> */}
      </div>

      <div
        className={`${!navegacion ? `elegido` : ``}`}
        onClick={() => {
          setNavegacion(false);
        }}
      >
        <p>Ver más</p>
        {/* <span></span> */}
      </div>
    </>
  );
}

export default Navegacion;
