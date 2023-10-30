import "./misreservas.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";

import io from "socket.io-client";
const socket = io();

function Misreservas() {
  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [informacion, setInformacion] = useState();
  const [permiso, setPermiso] = useState(false);

  useEffect(() => {
    socket.emit("comprobar_reserva", { token });
    socket.on("comprobar_reserva_res", (datos) => {
      if (datos?.respuesta === "no hay usuario") {
        localStorage.removeItem("token");
        navigate(`/La%20Esquina`);
      }
      setInformacion(datos);
      setPermiso(true);
    });
  }, []);

  useEffect(() => {
    socket.on("cancelar_reserva_res", (res) => {
      if (res) {
        navigate(`/La%20Esquina`);
      } else setPermiso(true);
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

  const con_reserva = () => {
    if (informacion?.reservas.length) {
      return (
        <>
          <div className="reserva con">
            <Swiper modules={[Navigation]} navigation={true}>
              {informacion.reservas.map((elem, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <div className="con_div">
                        <p>Complejo</p>
                        <p>{elem.complejo}</p>
                      </div>
                      <div className="con_div">
                        <p>Hora</p>
                        <p>{elem.hora}:00</p>
                      </div>
                      <div className="con_div">
                        <p>Dia</p>
                        <p>{elem.dia}</p>
                      </div>
                      <div className="con_div">
                        <p>Cancha</p>
                        <p>{elem.cancha}</p>
                      </div>
                    </SwiperSlide>
                    <div
                      className="boton_con boton boton_activado"
                      onClick={() => {
                        socket.emit("cancelar_reserva", {
                          nombre: elem.complejo,
                          dia: elem.dia,
                          hora: elem.hora,
                          cancha: elem.cancha,
                          token,
                        });
                        setPermiso(false);
                      }}
                    >
                      Cancelar
                    </div>
                  </>
                );
              })}
            </Swiper>
          </div>
        </>
      );
    }
  };

  // const con_reserva = () => {
  //   if (informacion?.reservas.length) {
  //     return (
  //       <>
  //         <div className="reserva con">
  //           <div className="con_div">
  //             <p>Complejo</p>
  //             <p>{informacion.complejo}</p>
  //           </div>
  //           <div className="con_div">
  //             <p>Hora</p>
  //             <p>{informacion.hora}:00</p>
  //           </div>
  //           <div className="con_div">
  //             <p>Dia</p>
  //             <p>{informacion.dia}</p>
  //           </div>
  //           <div className="con_div">
  //             <p>Cancha</p>
  //             <p>{informacion.cancha}</p>
  //           </div>
  //         </div>
  //         <div
  //           className="boton_con boton boton_activado"
  //           onClick={() => {
  //             socket.emit("cancelar_reserva", {
  //               nombre: informacion.complejo,
  //               dia: informacion.dia,
  //               hora: informacion.hora,
  //               cancha: informacion.cancha,
  //               token
  //             });
  //             setPermiso(false);
  //           }}
  //         >
  //           Cancelar
  //         </div>
  //       </>
  //     );
  //   }
  // };

  const sin_reserva = () => {
    if (!informacion?.reservas.length) {
      return (
        <div className="reserva sin">
          <ion-icon name="close-circle-outline"></ion-icon>
          <p>Sin reserva</p>
        </div>
      );
    }
  };

  return (
    <div className="contenedor_misreservas">
      {sin_permiso()}
      <div onClick={() => navigate(`/La%20Esquina`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      <ion-icon name="person-circle-outline"></ion-icon>
      <div className="contenedor_inferior">
        <div
          className="contenedor_informacion_"
          onClick={() => localStorage.removeItem("token")}
        >
          <ion-icon name="person-outline"></ion-icon>
          <p>{`${
            informacion?.usuario ? informacion?.usuario : "Sin nombre"
          }`}</p>
        </div>
        <div className="contenedor_informacion_">
          <ion-icon name="call-outline"></ion-icon>
          <p>{`${
            informacion?.telefono ? informacion?.telefono : "Sin telefono"
          }`}</p>
        </div>
        <span></span>
        {con_reserva()}
        {sin_reserva()}
      </div>
    </div>
  );
}

export default Misreservas;
