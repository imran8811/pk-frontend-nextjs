"use client";
import Link from 'next/link'
import styles from '../header/header.module.css'
import { getUserSessionData, UserLogout } from '../../../services/auth.service'
import { usePathname, useRouter } from 'next/navigation'
import { GET_CART_DETAILS, TOKEN_REFRESH } from '../../../endpoints'
import cls from 'classnames';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../interceptors/axios.interceptor';
import HeaderTop from '../header-top/header-top.comp';

export default function Header() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  let userData, userLogout;
  
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
    userLogout = async() => {
      if(await UserLogout(userData.userId)){
        localStorage.removeItem('userData');
        router.replace('/');
      }
    }
  }

  const getCartItemsCount = async() => {
    await axiosInstance({
      method: "get",
      url: `${GET_CART_DETAILS}?userId=${userData.userId}`
    }).then(res => {
      setCartItemsCount(res.data.length)
    })
  }

  return (
    <>
      <header>
        <HeaderTop />
        <div className={cls(styles.headerMain, 'border-bottom row mt-4 pb-3')}>
          <div className="col-md-4 mb-3">
            <Link href="/">
              <img src="/images/logo.jpg" alt="logo" width={227} height={46} title="PK Apparel Home" />
            </Link>
          </div>
          <ul className={cls(styles.headerMenu, 'col-md-8')}>
            <li><Link href={'/men'}>Men</Link></li>
            <li><Link href={'/women'}>Women</Link></li>
            <li><Link href={'/boys'}>Boys</Link></li>
            <li><Link href={'/girls'}>Girls</Link></li>
          </ul>
        </div>
      </header>
    </>
)}
