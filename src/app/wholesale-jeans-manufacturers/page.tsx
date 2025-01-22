import { Metadata } from 'next';
import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import WholesaleJeansManufacturersComp from '@/components/landing-pages/wholesale-jeans-manufacturers';

export const metadata: Metadata = {
  title: "Wholesale Jeans Manufacturers",
  keywords:  "Wholesale Jeans Manufacturers, Jeans Wholesale, Jeans Factories",
  description: "It is the right time to order low-cost and brilliant quality denim and jeans from the best wholesale jeans suppliers with your required specifications"
}

const WholesaleJeansManufacturers = () => {
  return (
    <>
      <Header></Header>
      <WholesaleJeansManufacturersComp 
        title='Wholesale Jeans Manufacturers' 
        description='Wholesale Jeans Manufacturers'>
      </WholesaleJeansManufacturersComp>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansManufacturers;