import "./horarios.css";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

function Horarios({ horarios, num_cancha, setCondicion_cancha }) {
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

  let cancha = horarios.filter((elem) => {
    return elem.cancha == num_cancha;
  });

  let informacion_dia = cancha[0].horario.filter((elem) => {
    return elem.dia == dia;
  });

  let horas = informacion_dia[0].horas;

  return (
    <>
      <div className="contenedor_informacion">
        <ion-icon name="caret-up-outline"></ion-icon>
        <div
          className="informacion cancha"
          onClick={() => setCondicion_cancha(true)}
        >
          Cancha {num_cancha}
        </div>
        <div className="informacion dia">
          <div className="flecha izquierda" onClick={restar}>
            <ion-icon name="caret-back-outline"></ion-icon>
          </div>
          {dia} {fecha_de_hoy + contador}
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
          depth: 400,
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
                if (elem.estado) {
                  setHoraseleccionada(elem.hora);
                }
              }}
              className={`${
                horaseleccionada === elem.hora && elem.estado
                  ? `seleccionada`
                  : ``
              } ${elem.estado}`}
            >
              <p>{elem.hora}:00</p>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={`boton ${horaseleccionada ? `boton_activado` : ``}`}>
        Continuar
      </div>
    </>
  );
}

export default Horarios;
