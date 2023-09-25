import "./confirmar.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import io from "socket.io-client";
const socket = io();

function Confirmar() {
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
    formState: { errors },
  } = useForm();

  const params = useParams();
  const navigate = useNavigate();

  let nombre = params.nombre;
  let hora = params.hora;
  let cancha = params.cancha;
  let dia = params.dia;
  let fecha = dia + " " + params.fecha;

  const onSubmit = handleSubmit((datos) => {
    socket.emit("reservar", {
      nombre,
      cancha,
      hora,
      dia,
      usuario: datos.nombre,
      telefono: datos.telefono
    });
  });

  return (
    <div className="contenedor_confirmar">
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
          {errors.nombre && (
            <span className="error">Telefono es requerido</span>
          )}
          <button className="boton_formulario">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default Confirmar;
