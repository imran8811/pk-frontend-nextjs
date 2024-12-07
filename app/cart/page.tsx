"use client";
import Header from '../../../components/shared/header/header.comp';
import Footer from '../../../components/shared/footer/footer.comp';
import CartComp from '../../../components/cart/cart.comp';

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
