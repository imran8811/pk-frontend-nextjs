"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import { Suspense } from 'react';
import ResetPasswordComp from '../../components/auth/reset-password/reset-password.comp';

const ForgotPassPage = () => {
  return (
    <Suspense>
      <Header />
      <ResetPasswordComp />
      <Footer />
    </Suspense>
  )
}

export default ForgotPassPage;
