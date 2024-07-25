import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import MotorcycleJeansManufacturersComp from '../../components/landing-pages/motorcycle-jeans-manufacturers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Motorcycle Jeans Manufacturers",
  keywords:  "Biker Jeans manufacturers, KEvlar Jeans Pants Manufacturers",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const MotorcycleJeansManufacturers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <MotorcycleJeansManufacturersComp 
            title={metadata.title} 
            description={metadata.description} />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default MotorcycleJeansManufacturers;