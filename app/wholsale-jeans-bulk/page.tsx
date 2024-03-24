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
            keyword='Wholesale Jeans Bulk' 
            text='Wholesale Jeans Bulk'>
          </WholesaleJeansBulkComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansBulk;