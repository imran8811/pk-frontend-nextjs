import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import WholesaleWomenJeansComp from '@/components/landing-pages/wholesale-women-jeans';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Wholesale Women Jeans",
  keywords:  "Women Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const WholesaleWomenJeans = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleWomenJeansComp 
            title={metadata.title} 
            description={metadata.description}>
          </WholesaleWomenJeansComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleWomenJeans;