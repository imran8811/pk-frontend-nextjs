"use client"
import { FC } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import styles from './home-banner.module.css'
import Link from "next/link";

const HomeBanner: FC = () => {
  return (
    <div className="mt-3">
      <Swiper 
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1} 
        loop={true} 
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}>
        <SwiperSlide>
          <Link href={'/wholesale-shop/men'}><img src="/images/gallery/chino-pant-banner2.jpg" className={styles.imgResponsive} /></Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={'/wholesale-shop/men'}>
            <img src="/images/gallery/jeans-pants-banner.jpg" className={styles.imgResponsive} />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
    
  )
}

export default HomeBanner;