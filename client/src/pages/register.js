import "./register.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Register() {
  let data_localStorage = localStorage.getItem("token");
  const [permiso, setPermiso] = useState(false);

  const [condicion, setCondicion] = useState(true);
  const [incorrecto, setIncorrecto] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  let nombre = params.nombre;
  let hora = params.hora;
  let dia = params.dia;
  let cancha = params.cancha;
  let fecha = params.fecha;
  let precio = params.precio;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data_localStorage && hora) {
      return navigate(`/${nombre}/${hora}/${cancha}/${dia}/${fecha}/${precio}`);
    } else if (data_localStorage && !hora) {
      return navigate(`/misreservas`);
    } else setPermiso(true);
  }, []);

  useEffect(() => {
    socket.on("confirmar_codigo_res", (respuesta) => {
      if (respuesta.condicion && hora) {
        localStorage.setItem("token", respuesta.token);
        navigate(`/${nombre}/${hora}/${cancha}/${dia}/${fecha}/${precio}`);
      } else if (respuesta.condicion && !hora) {
        localStorage.setItem("token", respuesta.token);
        navigate(`/misreservas`);
      } else if (!respuesta.condicion) {
        setIncorrecto(true);
        setPermiso(true);
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

  const formulario_telefono = () => {
    if (condicion && permiso) {
      const onSubmit_telefono = handleSubmit((telefono) => {
        socket.emit("register_telefono", telefono);
        setCondicion(false);
      });
      return (
        <>
          <div className="formulario">
            <form onSubmit={onSubmit_telefono}>
              <div className="codigoarea">
                <img src="https://alquilatucancha.com/static/flags/AR.png"></img>
                <p>+54</p>
              </div>
              <input
              className="input_telefono"
                type="text"
                {...register("telefono", {
                  required: true,
                })}
                autoComplete="off"
              ></input>
              <label>Telefono</label>
              {errors.telefono && (
                <span className="error">Telefono es requerido</span>
              )}
              <button className="boton_formulario">Enviar</button>
            </form>
          </div>
          <p className="p_2">
            Te enviaremos un codigo para verificar tu numero
          </p>
        </>
      );
    }
  };

  const formulario_codigo = () => {
    if (!condicion) {
      const onSubmit_codigo = handleSubmit((datos) => {
        socket.emit("confirmar_codigo", {
          telefono: datos.telefono,
          codigo: datos.codigo,
        });
        setPermiso(false);
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
              {incorrecto && <span className="error">Codigo incorrecto</span>}
              <button className="boton_formulario">Verificar codigo</button>
            </form>
          </div>
          <p className="p_2">¡Revisa tu celular!</p>
        </>
      );
    }
  };

  return (
    <div className="contenedor_register">
      {sin_permiso()}
      <div
        onClick={() => {
          if (hora) {
            navigate(`/${nombre}`);
          }
          if (!hora) {
            navigate(-1);
          }
        }}
        className="back"
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      {formulario_telefono()}
      {formulario_codigo()}
    </div>
  );
}

export default Register;
