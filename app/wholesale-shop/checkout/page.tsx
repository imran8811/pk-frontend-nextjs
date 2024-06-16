"use client";
import Header from '../../../components/shared/header/header.comp';
import Footer from '../../../components/shared/footer/footer.comp';
import CheckoutComp from '../../../components/checkout/checkout.comp';
import { useEffect } from 'react';
import { CheckUserSession } from '../../../services/auth.service';
import { redirect } from 'next/navigation';

const CheckoutPage = () => {
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

export default CheckoutPage;
