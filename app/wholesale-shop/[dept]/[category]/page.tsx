"use client";
import Header from '../../../../components/shared/header/header.comp';
import Footer from '../../../../components/shared/footer/footer.comp';
import ShopComp from '../../../../components/wholesale-shop/shop.comp';
import { Suspense } from 'react';

const ShopPage = () => {
  return (
    <Suspense>
      <Header />
      <ShopComp />
      <Footer />
    </Suspense>
  )
}

export default ShopPage;
