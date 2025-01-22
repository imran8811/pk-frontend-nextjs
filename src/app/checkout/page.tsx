"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import CheckoutComp from '../../components/checkout/checkout.comp';
import { Suspense, useEffect } from 'react';
import { getUserSessionData } from '../../services/auth.service';
import { redirect } from 'next/navigation';

const CheckoutPage = () => {
  useEffect(() => {
    if(!getUserSessionData()){
      redirect('/login')
    }
  })
  return (
    <Suspense>
      <Header />
      <CheckoutComp />
      <Footer />
    </Suspense>
  )
}

export default CheckoutPage;
