import { Metadata } from 'next';
import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import JeansPantsManufacturersComp from '@/components/landing-pages/jeans-pants-manufacturers';

export const metadata: Metadata = {
  title: "Jeans Pants Manufacturers",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const JeansPantsManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansPantsManufacturersComp title='Jeans Pants Manufacturers' description='Jeans Pants Manufacturers' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansPantsManufacturers;