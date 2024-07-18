"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansWholesaleComp from '../../components/landing-pages/jeans-wholesale';

const JeansWholesale = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansWholesaleComp title='Jeans Wholesale' description='Jeans Wholesale' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansWholesale;