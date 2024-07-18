"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import WholesaleJeansManufacturersComp from '../../components/landing-pages/wholesale-jeans-manufacturers';

const WholesaleJeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansManufacturersComp 
            title='Wholesale Jeans Manufacturers' 
            description='Wholesale Jeans Manufacturers'>
          </WholesaleJeansManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansManufacturers;