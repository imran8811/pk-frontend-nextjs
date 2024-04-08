import type { NextPage } from 'next'
import Header from '../../components/admin/admin-header'
import Footer from '../../components/admin/admin-footer'
import CreateAdminUser from '../../components/admin/create-admin-user'

const CreateAdminUserPage: NextPage = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <CreateAdminUser></CreateAdminUser>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default CreateAdminUserPage;
