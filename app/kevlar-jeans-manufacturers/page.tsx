"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import KevlarJeansManufacturersComp from '../../components/landing-pages/kevlar-jeans-manufacturers';

const KevlarJeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <KevlarJeansManufacturersComp 
            title='Kevlar Jeans Manufacturers' 
            description='Kevlar Jeans Manufacturers' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default KevlarJeansManufacturers;