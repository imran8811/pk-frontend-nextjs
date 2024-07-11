"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import WholesaleJeansManufacturersComp from '../../components/landing-pages/wholesale-jeans-manufacturers';

const WholesaleWomenJeans = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansManufacturersComp 
            mainHeading='Wholesale Women Jeans' 
            subHeading='Wholesale Women Jeans'>
          </WholesaleJeansManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleWomenJeans;