import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import BulkJeansComp from '../../components/landing-pages/bulk-jeans';
import { Suspense } from 'react';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Bulk Jeans",
  keywords:  "Bulk Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const BulkJeans = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Header></Header>
      <BulkJeansComp title={metadata.title} description={metadata.description} />
      <Footer></Footer>
    </Suspense>
  )
}

export default BulkJeans;