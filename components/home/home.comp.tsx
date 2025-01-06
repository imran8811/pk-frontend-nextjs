import { FC } from "react";
import styles from './home.module.css'
import HomeBanner from "../shared/home-banner/home-banner.comp";
import cls from 'classnames';
import Link from "next/link";

const HomeComponent : FC = () => {
  return (
    <div className="home-wrapper">
      <div className="mb-5">
        <HomeBanner></HomeBanner>   
      </div>
      <div className={cls(styles.categoriesSection)}>
        <div className={styles.subCatSection}>
          <div className={styles.shopNowOverlay}>
            <h3>Men</h3>
            <Link href={'wholesale-shop/men'} className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
        <div className={styles.subCatSection}>
          <div className={styles.shopNowOverlay}>
            <h3>Women</h3>
            <Link href={'wholesale-shop/women'} className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent;