import "./menu.css";

function Menu({ condicion_menu, setCondicion_menu }) {
  return (
    <>
      <div
        className={`menu_desactivado ${condicion_menu ? `menu_activado` : ``}`}
      >
        <div>
          <p>Soporte</p>
          <p>Mi complejo</p>
        </div>
      </div>
      <div
        className={`menu ${condicion_menu ? `modificar` : ``}`}
        onClick={() => setCondicion_menu(!condicion_menu)}
      >
        <ion-icon
          name={`${condicion_menu ? `close-outline` : `chevron-down-outline`}`}
        ></ion-icon>
      </div>
    </>
  );
}

export default Menu;
