"use client"
import type { NextPage } from 'next';
import AdminHeader from '../../../components/admin/admin-header';
import AdminFooter from '../../../components/admin/admin-footer';
import CreateAdminUserComp from '../../../components/admin/create-admin-user';

const CreateAdminUser: NextPage = () => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <CreateAdminUserComp></CreateAdminUserComp>
      <AdminFooter></AdminFooter>
    </>
  )
}

export default CreateAdminUser;
