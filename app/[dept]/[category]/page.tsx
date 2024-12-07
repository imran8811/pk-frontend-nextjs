import Header from '../../../../components/shared/header/header.comp';
import Footer from '../../../../components/shared/footer/footer.comp';
import ShopComp from '../../../../components/wholesale-shop/shop.comp';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Wholesale Shop - Factory Shop for Jeans Products",
  keywords: "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const ShopPage = () => {
  return (
    <Suspense>
      <Header />
      <ShopComp />
      <Footer />
    </Suspense>
  )
}

export default ShopPage;
