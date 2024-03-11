"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import WholesaleDenimJeansSuppliersComp from '../../components/landing-pages/wholesale-denim-jeans-suppliers';

const WholesaleDenimJeansSuppliers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleDenimJeansSuppliersComp 
            keyword='Wholesale Denim Jeans Suppliers' 
            text='Wholesale Denim Jeans Suppliers'>
          </WholesaleDenimJeansSuppliersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleDenimJeansSuppliers;