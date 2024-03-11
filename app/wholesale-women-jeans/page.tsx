"use client";
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import WholesaleJeansManufacturersComp from '../../components/landing-pages/wholesale-jeans-manufacturers';

const WholesaleWomenJeans = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansManufacturersComp 
            keyword='Wholesale Women Jeans' 
            text='Wholesale Women Jeans'>
          </WholesaleJeansManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleWomenJeans;