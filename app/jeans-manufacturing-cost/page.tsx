"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import JeansManufacturersComp from '../../components/landing-pages/jeans-manufacturers';

const JeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansManufacturersComp keyword='Jeans Manufacturers' text='Jeans Manufacturers'></JeansManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansManufacturers;