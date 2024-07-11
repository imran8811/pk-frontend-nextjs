"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import WholesaleJeansBulkComp from '../../components/landing-pages/wholsale-jeans-bulk';

const WholesaleJeansBulk = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansBulkComp 
            mainHeading='Wholesale Jeans Bulk' 
            subHeading='Wholesale Jeans Bulk' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansBulk;