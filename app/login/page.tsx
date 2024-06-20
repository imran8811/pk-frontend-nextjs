"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import LoginComp from '../../components/auth/login/login.comp';
import { Suspense } from 'react';

const LoginPage = () => {
  return (
    <Suspense>
      <Header />
      <LoginComp />
      <Footer />
    </Suspense>
  )
}

export default LoginPage;
