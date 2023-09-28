import "./menu.css";

import { Link } from "react-router-dom";

function Menu({ condicion_menu, setCondicion_menu, nombre }) {
  return (
    <>
      <div
        className={`menu_desactivado ${condicion_menu ? `menu_activado` : ``}`}
      >
        <div>
          <Link to={`/register/misreservas`}>
            <p className="opciones">Mis reservas</p>
          </Link>
          <Link to={`/${nombre}/login/gestionar`}>
            <p className="opciones">Mi complejo</p>
          </Link>
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
