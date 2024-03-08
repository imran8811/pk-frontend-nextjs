import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'

const HomeBanner: FC = () => {
  return (
    <div className="mt-3">
      <Swiper slidesPerView={1} autoplay={true}>
        <SwiperSlide><img src="/images/gallery/jeans-manufacturers.jpg" /></SwiperSlide>
        <SwiperSlide><img src="/images/gallery/jeans-wholesalers.jpg" /></SwiperSlide>
      </Swiper>
    </div>
    
  )
}

export default HomeBanner;