"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import { Suspense } from 'react';
import ForgotPasswordComp from '../../components/auth/forgot-password/forgot-password.comp';

const ForgotPassPage = () => {
  return (
    <Suspense>
      <Header />
      <ForgotPasswordComp />
      <Footer />
    </Suspense>
  )
}

export default ForgotPassPage;
