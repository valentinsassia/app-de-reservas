import "./horarios.css";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

function Horarios() {
  const [horaseleccionada, setHoraseleccionada] = useState();

  let horas = [17, 18, 19, 20, 21, 22, 23];

  return (
    <>
      <div className="contenedor_informacion">
        <ion-icon name="caret-up-outline"></ion-icon>
        <div className="informacion cancha">Cancha</div>
        <div className="informacion dia">
          <div className="flecha izquierda">
            <ion-icon name="caret-back-outline"></ion-icon>
          </div>
          Lunes 21
          <div className="flecha derecha">
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
              onClick={() => setHoraseleccionada(elem)}
              className={`${horaseleccionada === elem ? `seleccionada` : ``}`}
            >
              <p>{elem}:00</p>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="boton">
        Continuar
      </div>
    </> 
  );
}

export default Horarios;
