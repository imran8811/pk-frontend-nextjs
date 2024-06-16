"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import AboutComp from '../../components/static/about/about.comp';

const metadata: Metadata = {
  title: "About Us - PK Apparel",
  keywords: "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

export default function About(){
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <AboutComp></AboutComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
