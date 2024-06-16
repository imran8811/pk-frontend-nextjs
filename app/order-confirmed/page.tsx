import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import OrderConfirmedComp from '../../components/order-confirmed/order-confirmed.comp';

const metadata: Metadata = {
  title: "Order Confirmed - PK Apparel",
  keywords: "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

export default function OrderConfirmation(){
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <OrderConfirmedComp></OrderConfirmedComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
