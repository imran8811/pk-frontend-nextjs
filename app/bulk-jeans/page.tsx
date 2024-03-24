"use client"
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
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