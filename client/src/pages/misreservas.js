import "./misreservas.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import io from "socket.io-client";
const socket = io();

function Misreservas() {
  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [informacion, setInformacion] = useState();
  const [permiso, setPermiso] = useState(false);

  useEffect(() => {
    socket.emit("comprobar_reserva", token);
    socket.on("comprobar_reserva_res", (datos) => {
      setInformacion(datos);
      setPermiso(true);
    });
  }, []);

  const sin_permiso = () => {
    if (!permiso) {
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

  return (
    <div className="contenedor_misreservas">
      {sin_permiso()}
      <div onClick={() => navigate(`/`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      <ion-icon name="person-circle-outline"></ion-icon>
      <div className="contenedor_inferior">
        <div>
          <ion-icon name="person-outline"></ion-icon>
          <p>{`${informacion?.usuario ? informacion?.usuario : ""}`}</p>
        </div>
        <div>
          <ion-icon name="call-outline"></ion-icon>
          <p>{`${informacion?.telefono ? informacion?.telefono : ""}`}</p>
        </div>
        <span></span>
      </div>
    </div>
  );
}

export default Misreservas;
