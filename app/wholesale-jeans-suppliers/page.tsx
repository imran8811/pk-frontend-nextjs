import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import WholesaleJeansSuppliersComp from '../../components/landing-pages/wholesale-jeans-suppliers';

export const metadata: Metadata = {
  title: "Wholesale Jeans Suppliers",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Factories",
  description: "We offer top-notch jeans at amazing prices to customers who need a real blend of quality and style. So, place your order with a renowned jeans manufacturer."
}

const WholesaleJeansSuppliers = () => {
  return (
    <>
      <Header></Header>
      <WholesaleJeansSuppliersComp title={metadata.title} description={metadata.description} />
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansSuppliers;