import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import FactoryComp from '../../components/static/factory/factory.comp';

export const metadata: Metadata = {
  title: "Factory - PK Apparel",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const Factory = () => {
  return (
    <>
      <Header></Header>
      <FactoryComp></FactoryComp>
      <Footer></Footer>
    </>
  )
}

export default Factory;