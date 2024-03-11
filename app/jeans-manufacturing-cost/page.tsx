"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import JeansManufacturingCostComp from '../../components/landing-pages/jeans-manufacturing-cost';

const JeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansManufacturingCostComp keyword='Jeans Manufacturing Cost' text='Jeans Manufacturing Cost'></JeansManufacturingCostComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansManufacturers;