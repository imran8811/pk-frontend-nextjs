"use client";
import type { NextPage } from 'next'
import Header from '../../../components/admin/admin-header'
import Footer from '../../../components/admin/admin-footer'
import Products from '../../../components/admin/products.comp'

const ProductsPage: NextPage = () => {
  return (
    <>
      <div className='wrapper'>
          <Header></Header>
          <Products></Products>
      </div>
      <Footer></Footer>
    </>
  )
}

export default ProductsPage;
