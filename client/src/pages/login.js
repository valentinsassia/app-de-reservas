import "./login.css";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";
const socket = io();

function Login() {
  useEffect(() => {
    socket.on("login_codigo_res", (respuesta) => {
      if (respuesta.condicion) {
        navigate(`/`);
      }
      else if (!respuesta.condicion) {
        alert(54454)
      }
    });
  }, []);

  const navigate = useNavigate();

  const [condicion, setCondicion] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit_email = handleSubmit((email) => {
    socket.emit("login_email", email);
    setCondicion(false);
  });
  
  const formulario_email = () => {
    if (condicion) {
      return (
        <form onSubmit={onSubmit_email}>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
            })}
          ></input>
          {errors.email && <span className="error">Email es requerido</span>}
          <button className="boton boton_activado">Enviar</button>
        </form>
      );
    }
  };


  const onSubmit_codigo = handleSubmit((datos) => {
    socket.emit("login_codigo", { email: datos.email, codigo: datos.codigo });
  });

  const formulario_codigo = () => {
    if (!condicion) {
      return (
        <form onSubmit={onSubmit_codigo}>
          <label>Codigo</label>
          <input
            type="text"
            {...register("codigo", {
              required: true,
            })}
          ></input>
          <button className="boton boton_activado">Verificar codigo</button>
        </form>
      );
    }
  };

  return (
    <div className="contenedor_login">
      <div className="formulario">
        {formulario_email()}
        {formulario_codigo()}
      </div>
    </div>
  );
}

export default Login;
