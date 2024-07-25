import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import JeansWholesaleComp from '../../components/landing-pages/jeans-wholesale';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jeans Wholesale",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const JeansWholesale = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <JeansWholesaleComp title={metadata.title} description={metadata.description} />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default JeansWholesale;