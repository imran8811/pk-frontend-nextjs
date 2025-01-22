import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ShopComp from '../../components/wholesale-shop/shop.comp';

export const metadata: Metadata = {
  title: "Garments Wholesale Shop - PK Apparel",
  keywords: "Jeans manufacturers, T Shirts Manufacturers, Hoodie Wholesale",
  description: "Manufacturer and exporter of garments including denim products, hosiery products for men, women, boys and girls"
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
