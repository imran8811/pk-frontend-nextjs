import Header from '../../../../components/shared/header/header.comp';
import Footer from '../../../../components/shared/footer/footer.comp';
import ShopComp from '../../../../components/wholesale-shop/shop.comp';
import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ dept: string, category: string}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const dept = (await params).dept.charAt(0).toUpperCase()+(await params).dept.slice(1);
  let category = (await params).category.replace(/-/g, ' ');
  category = category.charAt(0).toUpperCase()+category.slice(1)+'s';
 
  return {
    title: dept+" "+category+' Wholesale Shop'
  }
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
