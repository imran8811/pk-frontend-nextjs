"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansManufacturingCostComp from '../../components/landing-pages/jeans-manufacturing-cost';

const JeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansManufacturingCostComp mainHeading='Jeans Manufacturing Cost' subHeading='Jeans Manufacturing Cost' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansManufacturers;