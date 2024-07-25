"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import WholesaleJeansBulkComp from '../../components/landing-pages/wholesale-jeans-bulk';

const WholesaleJeansBulk = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansBulkComp 
            title='Wholesale Jeans Bulk' 
            description='Wholesale Jeans Bulk' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansBulk;