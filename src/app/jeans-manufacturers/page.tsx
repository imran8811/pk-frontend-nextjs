
import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import JeansManufacturersComp from '@/components/landing-pages/jeans-manufacturers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Jeans Manufacturers - Jeans Factories",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Factories",
  description: "We offer top-notch jeans at amazing prices to customers who need a real blend of quality and style. So, place your order with a renowned jeans manufacturer."
}

const JeansManufacturers = () => {
  const title:any = 'Jeans Manufacturers';
  const description:any = metadata.description;
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansManufacturersComp title={title} description={description} />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansManufacturers;