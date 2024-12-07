import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import OrderPlacedComp from '../../components/order-placed/order-placed.comp';

const metadata: Metadata = {
  title: "Order Placed - PK Apparel",
  keywords: "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

export default function OrderPlaced(){
  return (
    <>
      <Header></Header>
      <OrderPlacedComp></OrderPlacedComp>
      <Footer></Footer>
    </>
  )
}
