import { FC, useEffect, useState } from 'react'
import { useRouter } from "next/dist/client/router";
import axios from 'axios'
import Router from 'next/router'

import { ADMIN_LOGOUT } from '../../endpoints'
import Link from 'next/link';

const Header: FC = () => {
  const [session, setSession] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem('adminToken')) {
      const token = localStorage.getItem('adminToken');
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`, 'accept': 'application/json'}
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const adminLogout = (e:any) => {
    e.preventDefault();
    axios.post(ADMIN_LOGOUT).then(res => {
      if(res.data.type === 'success') {
        localStorage.removeItem('adminToken');
        setSession(false);
        Router.push('/admin/login')
      }
    })
  }

  return (
    <header className='col-lg-12'>
      <div className='row'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <Link href="/" className="navbar-brand">
            <img src="/images/logo.jpg" alt="logo" width={227} height={71} title="PK Apparel Home" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link href="/admin/products" className="nav-item nav-link">Products</Link>
              <Link href="/admin/add-products" className="nav-item nav-link">Add product</Link>
              <Link href="/admin/create-user" className="nav-item nav-link">Create User</Link>
              <Link href="/admin/login" className="nav-item nav-link">Login</Link>
              <Link href="/admin/logout" onClick={(e) => adminLogout(e)} className="nav-item nav-link">Logout</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
)}

export default Header;
