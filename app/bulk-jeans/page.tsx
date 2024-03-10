"use client";
import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import BulkJeansComp from '../../components/landing-pages/bulk-jeans';

const BulkJeans = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <BulkJeansComp keyword='Bulk Jeans' text='Bulk Jeans'></BulkJeansComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default BulkJeans;