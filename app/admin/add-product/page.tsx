"use client"
import type { NextPage } from 'next'
import AdminHeader from '../../../components/admin/admin-header'
import AdminFooter from '../../../components/admin/admin-footer'
import AddProduct from '../../../components/admin/add-product.comp'
import { Suspense } from 'react'

const AddProductPage: NextPage = () => {
  return (
    <Suspense>
      <div className='container-fluid'>
        <div className='row'>
          <AdminHeader></AdminHeader>
          <AddProduct></AddProduct>
        </div>
      </div>
      <AdminFooter></AdminFooter>
    </Suspense>
  )
}

export default AddProductPage;
