import "./slider.css"

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

function Slider() {
  const img = [
    "https://www.quepasaweb.com.ar/wp-content/uploads/2020/10/cancha-futbol-5-autorizada-cuarentena.jpg",
    "https://cdn.elobservador.com.uy/102019/1570231150178.jpg"
  ];

  return (
    <div className="swiperContenedor">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".pagination",
          clickable: true,
        }}
        loop={true}
      >
        {img.map((imagen, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={imagen}></img>
            </SwiperSlide>
          );
        })}
        <div className="pagination"></div>
      </Swiper>
    </div>
  );
}

export default Slider;