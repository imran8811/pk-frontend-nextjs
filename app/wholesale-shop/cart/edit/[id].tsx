"use client";
import Header from '../../../../components/shared/header/header.comp';
import Footer from '../../../../components/shared/footer/footer.comp';
import CartComp from '../../../../components/cart/cart.comp';
import Keywords from '../../../../components/shared/keywords/keywords.comp';

const CartEditPage = () => {
  return (
    <>
      <Header />
      <CartComp />
      <Footer></Footer>
    </>
  )
}

export default CartEditPage;
