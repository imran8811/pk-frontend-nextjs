"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import CartComp from '../../components/cart/cart.comp';
import { Suspense } from 'react';

const CartPage = () => {
  return (
    <Suspense>
      <Header />
      <CartComp />
      <Footer />
    </Suspense>
  )
}

export default CartPage;
