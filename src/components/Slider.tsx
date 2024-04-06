import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ISliderProps {
  list?: string[];
  spaceBetween?: number;
  modules?: any[];
  pagination?: boolean;
}

export default function Slider({
  list = [],
  spaceBetween = 0,
  modules = [],
  pagination = false,
}: ISliderProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={spaceBetween}
      loop
      effect={"fade"}
      pagination={
        pagination
          ? {
              clickable: false,
            }
          : undefined
      }
      navigation
      autoplay
      modules={[Pagination, Autoplay, ...modules]}
      className="mySwiper"
    >
      {list.map((slider, index) => {
        return (
          <SwiperSlide key={index}>
            <img src={slider} className="img-slider-full"/>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
