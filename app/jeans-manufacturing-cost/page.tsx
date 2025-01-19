import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansManufacturingCostComp from '../../components/landing-pages/jeans-manufacturing-cost';

export const metadata: Metadata = {
  title: "Jeans Manufacturing Cost",
  keywords:  "Jeans Manufacturing Cost, cost to make a jeans, cost to make a pair of jeans",
  description: "Good quality jeans manufacturing cost is between $3.5 to $5.2, depending on the material, sizes, styling and washing affects."
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