"use client";
import { Metadata } from 'next';
import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import WholesaleDenimJeansSuppliersComp from '@/components/landing-pages/wholesale-denim-jeans-suppliers';

const WholesaleDenimJeansSuppliers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleDenimJeansSuppliersComp 
            title='Wholesale Denim Jeans Suppliers' 
            description='Wholesale Denim Jeans Suppliers'>
          </WholesaleDenimJeansSuppliersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleDenimJeansSuppliers;