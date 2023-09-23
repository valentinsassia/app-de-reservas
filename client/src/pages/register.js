import "./register.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Register() {
  const [permiso, setPermiso] = useState(false);

  let data_localStorage = localStorage.getItem("token");

  const [condicion, setCondicion] = useState(true);
  const [codigofail, setCodigofail] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  let nombre = params.nombre;
  let hora = params.hora;
  let dia = params.dia;
  let cancha = params.cancha;
  let fecha = params.fecha;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data_localStorage) {
      return navigate(`/${nombre}/${hora}/${cancha}/${dia}/${fecha}`);
    } else setPermiso(true);
  }, []);

  useEffect(() => {
    socket.on("confirmar_codigo_res", (respuesta) => {
      if (respuesta.condicion) {
        navigate(`/${nombre}/${hora}/${cancha}/${dia}/${fecha}`);
        localStorage.setItem("token", respuesta.token);
      } else if (!respuesta.condicion) {
        setCodigofail(true);
      }
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

  const formulario_email = () => {
    if (condicion && permiso) {
      const onSubmit_email = handleSubmit((email) => {
        socket.emit("register_email", email);
        setCondicion(false);
      });
      return (
        <>
          <div className="formulario">
            <form onSubmit={onSubmit_email}>
              <input
                type="text"
                {...register("email", {
                  required: true,
                })}
                autoComplete="off"
              ></input>
              <label>Email</label>
              {errors.email && (
                <span className="error">Email es requerido</span>
              )}
              <button className="boton_formulario">Enviar</button>
            </form>
          </div>
          <p className="p_2">Te enviaremos un codigo para verificar el email</p>
        </>
      );
    }
  };

  const formulario_codigo = () => {
    if (!condicion) {
      const onSubmit_codigo = handleSubmit((datos) => {
        socket.emit("confirmar_codigo", {
          email: datos.email,
          codigo: datos.codigo,
        });
      });
      return (
        <>
          <div className="formulario">
            <form onSubmit={onSubmit_codigo}>
              <label>Codigo</label>
              <input
                type="text"
                {...register("codigo", {
                  required: true,
                })}
                autoComplete="off"
              ></input>
              {codigofail && <span className="error">Codigo incorrecto</span>}
              <button className="boton_formulario">Verificar codigo</button>
            </form>
          </div>
          <p className="p_2">¡Revisa tu email!</p>
        </>
      );
    }
  };

  return (
    <div className="contenedor_register">
      {sin_permiso()}
      <div onClick={() => navigate(`/${nombre}`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      {formulario_email()}
      {formulario_codigo()}
    </div>
  );
}

export default Register;
