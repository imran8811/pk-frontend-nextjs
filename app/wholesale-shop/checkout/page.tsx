"use client";
import Header from '../../../components/shared/header/header.comp';
import Footer from '../../../components/shared/footer/footer.comp';
import CheckoutComp from '../../../components/checkout/checkout.comp';
import Keywords from '../../../components/shared/keywords/keywords.comp';
import { useEffect } from 'react';
import { CheckUserSession } from '../../../services/auth.service';
import { redirect } from 'next/navigation';

const CartPage = () => {
  useEffect(() => {
    if(!CheckUserSession()){
      redirect('/login')
    }
  })
  return (
    <>
      <Header />
      <CheckoutComp />
      <Footer />
    </>
  )
}

export default CartPage;