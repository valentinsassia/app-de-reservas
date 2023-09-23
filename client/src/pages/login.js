import "./login.css";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import io from "socket.io-client";
const socket = io();

function Login() {
  const data_localStorage = localStorage.getItem("token");
  const [permiso, setPermiso] = useState(false);

  const [incorrecto, setIncorrecto] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  let nombre = params.nombre;

  useEffect(() => {
    if (data_localStorage) {
      socket.emit("comprobar_token", data_localStorage);
      socket.on("comprobar_token_res", (res) => {
        if (res) {
          navigate(`/${nombre}/gestionar`);
        } else setPermiso(true);
      });
    } else setPermiso(true);
  });

  useEffect(() => {
    socket.on("login_res", (res) => {
      if (res.condicion === true) {
        localStorage.setItem("token", res.token);
        navigate(`/${nombre}/gestionar`);
      } else return setIncorrecto(true);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((datos) => {
    socket.emit("login", datos);
  });

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

  const formulario_login = () => {
    if (permiso) {
      return (
        <div className="formulario">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("email", {
                required: true,
              })}
              autoComplete="off"
            ></input>
            <label>Email</label>
            {errors.email && <span className="error">Email incorrecto</span>}
          </form>
          <form onSubmit={onSubmit}>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              autoComplete="off"
            ></input>
            <label>Contraseña</label>
            {errors.password && (
              <span className="error">Contraseña incorrecta</span>
            )}
            {incorrecto && (
              <span className="error">La contraseña o el email son incorrectos</span>
            )}
            <button className="boton_formulario">Enviar</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="contenedor_login">
      {sin_permiso()}
      <div onClick={() => navigate(`/${nombre}`)} className="back">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      {formulario_login()}
    </div>
  );
}

export default Login;
