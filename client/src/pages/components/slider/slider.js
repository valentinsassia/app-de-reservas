import "./slider.css"

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

function Slider({imagenes}) {

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
        {imagenes.map((imagen, index) => {
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