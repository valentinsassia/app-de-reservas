import "./horarios.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

function Horarios() {
  return (
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
        <SwiperSlide >
            <p>4</p>
        </SwiperSlide>
      </Swiper>
  );
}

export default Horarios;
