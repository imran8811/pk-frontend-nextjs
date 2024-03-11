"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
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