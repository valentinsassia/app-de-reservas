import "./menu.css";

function Menu({ condicion_menu, setCondicion_menu }) {
  return (
    <>
      <div
        className={`contenedor menu ${condicion_menu ? `modificar` : ``}`}
        onClick={() => setCondicion_menu(!condicion_menu)}
      >
        <ion-icon
          name={`${condicion_menu ? `close-outline` : `chevron-down-outline`}`}
        ></ion-icon>
      </div>
      <div className={`contenedor ${condicion_menu ? `menu_oculto` : ``}`}>
        <p>Soporte</p>
        <p>Mi complejo</p>
      </div>
    </>
  );
}

export default Menu;
