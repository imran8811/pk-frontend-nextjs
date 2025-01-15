"use client"
import type { NextPage } from 'next';
import AdminHeader from '../../../../components/admin/admin-header';
import AdminFooter from '../../../../components/admin/admin-footer';
import EditProduct from '../../../../components/admin/edit-product.comp';

const AddProductPage: NextPage = () => {
  return (
    <>
      <div className='container-fluid'>
        <AdminHeader></AdminHeader>
        <EditProduct></EditProduct>
      </div>
      <AdminFooter></AdminFooter>
    </>
  )
}

export default AddProductPage;
