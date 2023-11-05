import "./slider.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import laesquinadelfutbol from "./../../../img/laesquinadelfutbol.jpeg";
import laesquinadelfutbol1 from "./../../../img/laesquinadelfutbol1.jpeg";

function Slider() {
  console.log(laesquinadelfutbol)
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
        <SwiperSlide>
          <img src={laesquinadelfutbol}></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src={laesquinadelfutbol1}></img>
        </SwiperSlide>
        <div className="pagination"></div>
      </Swiper>
    </div>
  );
}

export default Slider;
