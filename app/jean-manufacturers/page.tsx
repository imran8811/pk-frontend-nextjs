"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeanManufacturersComp from '../../components/landing-pages/jean-manufacturers';

const JeanManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeanManufacturersComp keyword='Jean Manufacturers' text='Jean Manufacturers'></JeanManufacturersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeanManufacturers;