import "./confirmar.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import io from "socket.io-client";
const socket = io();

function Confirmar() {
  let token = localStorage.getItem("token");

  const [permiso, setPermiso] = useState(false);

  useEffect(() => {
    socket.emit("comprobar_reserva", token);
    socket.on("comprobar_reserva_res", (datos) => {
      if (datos?.reserva === true) {
        return navigate("/misreservas");
      } else if (datos?.respuesta === "no hay reserva") {
        setPermiso(true);
        setValue("telefono", datos?.telefono);
        setValue("nombre", datos?.usuario);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("resultado", (condicion) => {
      if (condicion) {
        navigate(`/${nombre}`);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const navigate = useNavigate();

  let nombre = params.nombre;
  let hora = params.hora;
  let cancha = params.cancha;
  let dia = params.dia;
  let fecha = dia + " " + params.fecha;

  const sin_informacion = () => {
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

  const onSubmit = handleSubmit((datos) => {
    socket.emit("reservar", {
      nombre,
      cancha,
      hora,
      dia,
      usuario: datos.nombre,
      telefono: datos.telefono,
      token,
    });
  });

  return (
    <div className="contenedor_confirmar">
      {sin_informacion()}
      <div onClick={() => navigate(`/${nombre}`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>

      <div className="contenedor_principal">
        <p>¡Revisá y Confirmá!</p>
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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("nombre", {
              required: true,
            })}
            autoComplete="off"
          ></input>
          <label className="label">Nombre</label>
          {errors.nombre && <span className="error">Nombre es requerido</span>}
        </form>
        <form onSubmit={onSubmit} className="form">
          <input
            type="text"
            {...register("telefono", {
              required: true,
            })}
            autoComplete="off"
          ></input>
          <label className="label">Telefono</label>
          {errors.telefono && (
            <span className="error">Telefono es requerido</span>
          )}
          <button className="boton_formulario">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default Confirmar;
