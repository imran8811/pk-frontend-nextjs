import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import WholesaleJeansBulkComp from '@/components/landing-pages/wholesale-jeans-bulk';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Wholesale Jeans Bulk",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const WholesaleJeansBulk = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleJeansBulkComp 
            title='Wholesale Jeans Bulk' 
            description='Wholesale Jeans Bulk' />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleJeansBulk;