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
          <JeansWholesaleComp keyword='Jeans Wholesale' text='Jeans Wholesale'></JeansWholesaleComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansWholesale;