import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import FactoryComp from '../../components/factory/factory.comp';

export const metadata: Metadata = {
  title: "Factory - PK Apparel",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const Factory = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <FactoryComp></FactoryComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Factory;