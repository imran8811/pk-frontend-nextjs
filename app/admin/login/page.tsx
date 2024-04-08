"use client"
import type { NextPage } from 'next'
import AdminHeader from '../../../components/admin/admin-header'
import AdminFooter from '../../../components/admin/admin-footer'
import AdminLogin from '../../../components/admin/login.comp'

const AdminLoginPage: NextPage = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <AdminHeader></AdminHeader>
          <AdminLogin></AdminLogin>
        </div>
      </div>
      <AdminFooter></AdminFooter>
    </>
  )
}

export default AdminLoginPage;
