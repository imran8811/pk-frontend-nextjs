"use client";
import Link from 'next/link'
import Script from 'next/script'
import styles from '../header/header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { getUserSessionData, UserLogout } from '../../../services/auth.service'
import { usePathname, useRouter } from 'next/navigation'
import { GET_CART_DETAILS, TOKEN_REFRESH, WHOLESALE_SHOP } from '../../../endpoints'
import cls from 'classnames';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../interceptors/axios.interceptor';

export default function Header() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [hideShopLink, setHideShopLink] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  let userData, userLogout;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
    userLogout = async() => {
      if(await UserLogout(userData.userId)){
        localStorage.removeItem('userData');
        router.replace(WHOLESALE_SHOP);
      }
    }
  }

  // let tokenExpire = setTimeout(() => getRefreshToken(), 500000)
  
  useEffect(() => {
    getUserIP();
  }, [])

  
  const getUserIP = async() => {
    await axiosInstance({
      method: "get",
      url: '/auth/user-auth'
    }).then(res => {
      setHideShopLink(res.data)
      if(!res.data.data){
        router.push('/')
      } else {
        getCartItemsCount();
      }
    })
  }

  const getCartItemsCount = async() => {
    await axiosInstance({
      method: "get",
      url: `${GET_CART_DETAILS}?userId=${userData.userId}`
    }).then(res => {
      setCartItemsCount(res.data.length)
    })
  }

  // const getRefreshToken = async() => {
  //   const data = {
  //     oldRefreshToken: userData.refreshToken
  //   }
  //   await axiosInstance({
  //     method: "post",
  //     url: `${TOKEN_REFRESH}`,
  //     data: data
  //   }).then(res => {
  //       console.log(res);
  //       clearTimeout(tokenExpire);
  //       tokenExpire = setTimeout(() => getRefreshToken(), 500000);
  //   })
  // }

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TTX4WPE230" />
      <Script
        id="g-tag" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TTX4WPE230')`,
        }} />
      <header className='row border-bottom border-info mb-3'>
        <div className="col-md-3 pt-3 mb-2">
          <Link href="/">
            <img src="/images/logo.jpg" alt="logo" width={227} height={46} title="PK Apparel Home" />
          </Link>
        </div>
        <div className='col-1'></div>
        <div className='col-md-8 mt-3'>
          <div className={cls(styles.headerMenu, 'text-end')}>
            <ul >
              {!hideShopLink &&
                <li><Link href={'/wholesale-shop'}>Wholesale Shop</Link></li>
              }
              <li><Link href={'/wholesale-shop/cart'}>Cart ({cartItemsCount})</Link></li>
              {!userData?.token &&
                <>
                  <li><Link href={'/login'}>Login</Link></li>
                  <li><Link href={'/signup'}>Signup</Link></li>
                </>
              }
              {userData?.token &&
                <li className={styles.headerMenuDropdown}> 
                  {userData.businessName} &nbsp;
                  <FontAwesomeIcon icon={faCaretDown} className='fa fa-caret-down' />
                  <ul>
                    <li><Link href={'/manage-account'}>Account</Link></li>
                    <li><Link href={'/orders'}>Orders</Link></li>
                    <li><Link href={'#'} onClick={() => {userLogout()}}>Logout</Link></li>
                  </ul>
                </li>
              }
            </ul>
          </div>
        </div>
      </header>
    </>
)}
