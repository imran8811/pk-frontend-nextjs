"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import JeansWholesaleComp from '../../components/landing-pages/jeans-wholesale';

const KevlarJeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansWholesaleComp keyword='Kevlar Jeans Manufacturers' text='Kevlar Jeans Manufacturers'></JeansWholesaleComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default KevlarJeansManufacturers;