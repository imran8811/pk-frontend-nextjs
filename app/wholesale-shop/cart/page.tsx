"use client";
import { Metadata } from 'next';
import Header from '../../../components/shared/header/header.comp';
import Footer from '../../../components/shared/footer/footer.comp';
import CartComp from '../../../components/cart/cart.comp';
import Keywords from '../../../components/shared/keywords/keywords.comp';

const CartPage = () => {
  return (
    <>
      <Header />
      <CartComp />
      <Footer />
    </>
  )
}

export default CartPage;
