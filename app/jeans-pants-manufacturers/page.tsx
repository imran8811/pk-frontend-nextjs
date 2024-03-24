"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansPantsManufacturersComp from '../../components/landing-pages/jeans-pants-manufacturers';

const JeansPantsManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansPantsManufacturersComp keyword='Jeans Pants Manufacturers' text='Jeans Pants Manufacturers'></JeansPantsManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansPantsManufacturers;