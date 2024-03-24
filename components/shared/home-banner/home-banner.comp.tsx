"use client"
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import cls from 'classnames';
import styles from './home-banner.module.css'

const HomeBanner: FC = () => {
  return (
    <div className="mt-3">
      <Swiper slidesPerView={1} autoplay={true}>
        <SwiperSlide><img src="/images/gallery/jeans-manufacturers.jpg" className={styles.imgResponsive} /></SwiperSlide>
        <SwiperSlide><img src="/images/gallery/jeans-wholesalers.jpg" className={styles.imgResponsive} /></SwiperSlide>
      </Swiper>
    </div>
    
  )
}

export default HomeBanner;