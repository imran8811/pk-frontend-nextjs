import { FC } from "react";
import styles from './home.module.css'
import HomeBanner from "../shared/home-banner/home-banner.comp";
import Link from "next/link";

const OrderConfirmedComp : FC = () => {
  return (
    <div className="page-content">
      <p>Order Confirmed!</p>
      <p>Download or View Invoice</p>
    </div>
  )
}

export default OrderConfirmedComp;