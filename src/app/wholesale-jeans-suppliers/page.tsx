import { Metadata } from 'next';
import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import WholesaleJeansSuppliersComp from '@/components/landing-pages/wholesale-jeans-suppliers';

export const metadata: Metadata = {
  title: "Wholesale Jeans Suppliers",
  keywords:  "Wholesale Jeans Suppliers, Jeans Wholesale, Jeans Factories",
  description: "It is the right time to order low-cost and brilliant quality denim and jeans from the best wholesale jeans suppliers with your required specifications"
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