"use client"
import { FC } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import styles from './home-banner.module.css'

const HomeBanner: FC = () => {
  return (
    <div className="mt-3">
      <Swiper 
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1} 
        loop={true} 
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}>
        <SwiperSlide><img src="/images/gallery/slider-img1.jpg" className={styles.imgResponsive} /></SwiperSlide>
        <SwiperSlide><img src="/images/gallery/modern-1-slide1.jpg" className={styles.imgResponsive} /></SwiperSlide>
        <SwiperSlide><img src="/images/gallery/modern-slide1.jpg" className={styles.imgResponsive} /></SwiperSlide>
      </Swiper>
    </div>
    
  )
}

export default HomeBanner;