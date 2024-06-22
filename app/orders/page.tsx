"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import OrdersComp from '../../components/orders/orders.comp';

// export const metadata: Metadata = {
//   title: "View Orders - PK Apparel",
//   keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
//   description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
// }

const Orders = () => {
  return (
    <>
      <Header></Header>
      <OrdersComp></OrdersComp>
      <Footer></Footer>
    </>
  )
}

export default Orders;