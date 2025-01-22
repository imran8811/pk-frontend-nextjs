"use client"
import type { NextPage } from 'next'
import AdminHeader from '../../../components/admin/admin-header'
import AdminFooter from '../../../components/admin/admin-footer'
import AddProduct from '../../../components/admin/add-product.comp'

const AddProductPage: NextPage = () => {
  return (
    <>
      <div className='container-fluid'>
        <AdminHeader></AdminHeader>
        <h1 className='text-center mt-5 mb-5'>Page Not Found</h1>
      </div>
      <AdminFooter></AdminFooter>
    </>
  )
}

export default AddProductPage;
