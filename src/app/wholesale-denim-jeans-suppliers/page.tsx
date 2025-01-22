import { Metadata } from 'next';
import Header from '@/components/shared/header/header.comp';
import Footer from '@/components/shared/footer/footer.comp';
import WholesaleDenimJeansSuppliersComp from '@/components/landing-pages/wholesale-denim-jeans-suppliers';

export const metadata: Metadata = {
  title: "Wholesale Denim Jeans Suppliers",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const WholesaleDenimJeansSuppliers = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <WholesaleDenimJeansSuppliersComp 
            title='Wholesale Denim Jeans Suppliers' 
            description='Wholesale Denim Jeans Suppliers'>
          </WholesaleDenimJeansSuppliersComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default WholesaleDenimJeansSuppliers;