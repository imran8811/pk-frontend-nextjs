"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansManufacturersComp from '../../components/landing-pages/jeans-manufacturers';

const JeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansManufacturersComp></JeansManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansManufacturers;