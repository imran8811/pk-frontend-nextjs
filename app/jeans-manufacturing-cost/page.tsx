import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansManufacturingCostComp from '../../components/landing-pages/jeans-manufacturing-cost';

export const metadata: Metadata = {
  title: "Jeans Manufacturing Cost",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const JeansManufacturers = () => {
  return (
    <>
      <Header></Header>
      <JeansManufacturingCostComp title={metadata.title} description={metadata.description} />
      <Footer></Footer>
    </>
  )
}

export default JeansManufacturers;