import "./complejo.css";

import Horarios_complejo from "./components/horarios_complejo/horarios_complejo";
import Slider from "./components/slider/slider.js";
import Navegacion from "./components/navegacion/navegacion.js";
import Menu from "./components/menu/menu.js";
import Informacion from "./components/informacion/informacion.js";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import io from "socket.io-client";
const socket = io();

function Complejo() {
  const params = useParams();

  const [condicion_menu, setCondicion_menu] = useState(false);
  const [navegacion, setNavegacion] = useState(true);

  const [respuesta, setRespuesta] = useState("0");
  const [reiniciar, setReiniciar] = useState(0);

  const nombre = params.nombre;
  const horarios = respuesta.horarios;

  useEffect(() => {
    socket.emit("info-complejo", {
      nombre,
    });
    socket.on("info-complejo-res", (respuesta) => {
      setRespuesta(respuesta[0]);
    });
    socket.on(nombre, () => {
      let numero = reiniciar;
      setReiniciar(numero + 1);
    });
  }, [reiniciar]);

  const sin_informacion = () => {
    if (horarios === undefined) {
      return (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    }
  };

  const horarios_contenedor = () => {
    if (horarios !== undefined && navegacion) {
      return (
        <Horarios_complejo
          nombre={nombre}
          horarios={horarios}
        />
      );
    } else if (respuesta !== "0" && !navegacion) {
      return <Informacion informacion={respuesta} />;
    }
  };

  const slider = () => {
    if (horarios !== undefined) {
      return <Slider />;
    }
  };

  return (
    <div className="complejo">
      {sin_informacion()}

      <div className="contenedor arriba">
        {<Navegacion navegacion={navegacion} setNavegacion={setNavegacion} />}
      </div>

      {
        <Menu
          condicion_menu={condicion_menu}
          setCondicion_menu={setCondicion_menu}
          nombre={nombre}
        />
      }

      <div className="contenedor medio">{slider()}</div>
      <div className="contenedor abajo">{horarios_contenedor()}</div>

      <div
        className={`${condicion_menu ? `cortina` : ``}`}
        onClick={() => {
          setCondicion_menu(false);
        }}
      ></div>
    </div>
  );
}

export default Complejo;
