"use client";
import { Metadata } from 'next';
import Header from '../../../../../components/shared/header/header.comp';
import Footer from '../../../../../components/shared/footer/footer.comp';
import Keywords from '../../../../../components/shared/keywords/keywords.comp';
import ProductDetails from '../../../../../components/product-details/product-details.comp';

const ShopPage = (data) => {
  return (
    <>
      <div className='container'>
        <Header />
        <ProductDetails></ProductDetails>
        <Keywords />
      </div>
      <Footer></Footer>
    </>
  )
}

export default ShopPage;
