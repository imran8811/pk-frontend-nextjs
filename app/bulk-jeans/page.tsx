"use client"
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import BulkJeansComp from '../../components/landing-pages/bulk-jeans';
import { Suspense } from 'react';

const BulkJeans = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Header></Header>
      <BulkJeansComp mainHeading='Bulk Jeans' subHeading='Bulk Jeans'></BulkJeansComp>
      <Footer></Footer>
    </Suspense>
  )
}

export default BulkJeans;