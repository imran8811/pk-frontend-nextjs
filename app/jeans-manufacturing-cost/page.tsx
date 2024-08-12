import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansManufacturingCostComp from '../../components/landing-pages/jeans-manufacturing-cost';

export const metadata: Metadata = {
  title: "Jeans Manufacturing Cost",
  keywords:  "Jeans Manufacturing Cost, Jeans Manufacturing Process, Jeans Wholesale",
  description: "Clothing brands need to know the actual jeans manufacturing cost if they go with custom production, so it costs around 3.5$ to 4.3$."
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