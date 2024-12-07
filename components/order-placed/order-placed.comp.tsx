import { FC } from "react";
import styles from './home.module.css'
import HomeBanner from "../shared/home-banner/home-banner.comp";
import Link from "next/link";

const OrderPlacedComp : FC = () => {
  return (
    <div className="page-content">
      <h2>Order has been placed!</h2>
      <p>Your order is not confirmed until you pay advance amount</p>
      <div className="order-confirmed-links">
        <Link href={'/order-invoice'}> Download / View Invoice </Link> 
      </div>
    </div>
  )
}

export default OrderPlacedComp;