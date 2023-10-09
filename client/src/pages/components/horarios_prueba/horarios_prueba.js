import "./horarios_prueba.css";

import { Contextos } from "../../../context/context";

import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import io from "socket.io-client";
const socket = io();

function Horarios_prueba({ horarios, num_cancha, nombre }) {
  const { setInfoReservas } = useContext(Contextos);

  const [horaseleccionada, setHoraseleccionada] = useState();
  const [Index, setIndex] = useState(0);

  // Empieza Codigo de Fecha

  let dias = [
    ["Domingo"],
    ["Lunes"],
    ["Martes"],
    ["Miercoles"],
    ["Jueves"],
    ["Viernes"],
    ["Sabado"],
  ];

  let hoy = new Date();
  const eliminado = dias.splice(hoy.getDay(), 7);
  eliminado.reverse().map((e) => {
    dias.unshift(e);
  });

  let dia = dias[Index];

  function cantidadDeDias(año, mes) {
    return new Date(año, mes, 0).getDate();
  }

  let dias_del_mes = cantidadDeDias(hoy.getFullYear(), hoy.getMonth() + 1);

  const [contador, setContador] = useState(0);
  const [fecha_de_hoy, setFecha_de_hoy] = useState(hoy.getDate());

  if (fecha_de_hoy + contador == dias_del_mes + 1) {
    setFecha_de_hoy(1);
    setContador(0);
  }
  if (fecha_de_hoy + contador == 0) {
    setFecha_de_hoy(dias_del_mes);
    setContador(0);
  }

  const sumar = () => {
    if (Index < 6) {
      let num = Index;
      setIndex(num + 1);

      let numDia = contador;
      setContador(numDia + 1);

      setHoraseleccionada();
    }
  };

  const restar = () => {
    if (Index > 0) {
      let num = Index;
      setIndex(num - 1);

      let numDia = contador;
      setContador(numDia - 1);

      setHoraseleccionada();
    }
  };

  // Termina Codigo de Fecha

  let fecha = `${dia} ${fecha_de_hoy + contador}`;

  let cancha = horarios.filter((elem) => {
    return elem.cancha == num_cancha;
  });

  let informacion_dia = cancha[0].horario.filter((elem) => {
    return elem.dia == dia;
  });

  let horas = informacion_dia[0].horas;

  useEffect(() => {
    setInfoReservas({
      reservas: horas.filter((elem) => {
        return elem.estado === false;
      }),
      dia,
      num_cancha,
    });
  }, [horarios, Index, num_cancha]);

  return (
    <>
      <div className="contenedor_informacion">
        <div className="informacion dia">
          <div className="flecha izquierda" onClick={restar}>
            <ion-icon name="caret-back-outline"></ion-icon>
          </div>
          {fecha}
          <div className="flecha derecha" onClick={sumar}>
            <ion-icon name="caret-forward-outline"></ion-icon>
          </div>
        </div>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: -20,
          depth: 550,
          modifier: 1,
          slideShadows: true,
        }}
        initialSlide={horas.length / 2}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {horas.map((elem, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => {
                setHoraseleccionada(elem.hora);
              }}
              className={`${
                horaseleccionada === elem.hora ? `seleccionada` : ``
              } horas`}
            >
              <p>{elem.hora}:00</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className="span"></span>
      <div className="seleccionarcancha">
        {horarios.map((elem, index) => {
          let dia_cancha = elem.horario.filter((elem) => {
            return elem.dia === dia[0];
          })[0].horas;

          let estado_cancha = dia_cancha.some(
            (elem) => elem.estado === true && elem.hora === horaseleccionada
          );

          return (
            <Link
              className={`${
                estado_cancha ? "disponible" : "nodisponible"
              } link_cancha`}
              to={
                estado_cancha === true &&
                `/${nombre}/register/${horaseleccionada}/${index + 1}/${dia}/${
                  fecha_de_hoy + contador
                }
            `
              }
            >
              <p>Cancha {index + 1}</p>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Horarios_prueba;
