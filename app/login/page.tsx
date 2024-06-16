"use client";
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import LoginComp from '../../components/auth/login/login.comp';

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginComp />
      <Footer />
    </>
  )
}

export default LoginPage;
