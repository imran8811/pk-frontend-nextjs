"use client";
import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import ShopComp from '../../components/wholesale-shop/shop.comp';
import Keywords from '../../components/shared/keywords/keywords.comp';

const ShopPage = (data) => {
  return (
    <>
      <div className='container'>
        <Header />
        <ShopComp />
        <Keywords />
      </div>
      <Footer></Footer>
    </>
  )
}

export default ShopPage;
