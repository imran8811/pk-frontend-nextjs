"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import WholesaleJeansManufacturersComp from '../../components/landing-pages/wholesale-jeans-manufacturers';

const WholesaleJeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansManufacturersComp 
            keyword='Wholesale Jeans Manufacturers' 
            text='Wholesale Jeans Manufacturers'>
          </WholesaleJeansManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansManufacturers;