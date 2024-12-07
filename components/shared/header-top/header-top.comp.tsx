"use client";
import Link from 'next/link'
import Script from 'next/script'
import styles from './header-top.module.css'
import { getUserSessionData, UserLogout } from '../../../services/auth.service'
import { usePathname, useRouter } from 'next/navigation'
import { GET_CART_DETAILS, TOKEN_REFRESH } from '../../../endpoints'
import cls from 'classnames';
import { useEffect, useState } from 'react';

export default function HeaderTop() {
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
        router.replace('/');
      }
    }
  }

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
      <div className={cls(styles.headerTop, 'row mt-2 pb-2 border-bottom')}>
        <ul className='social-links col-md-5'>
          <li><a href='https://www.facebook.com/pkapparel1' target='_blank'><i className='bi bi-facebook'></i></a></li>
          <li><a href='https://www.instagram.com/pkapparel_official' target='_blank'><i className='bi bi-instagram'></i></a></li>
          <li><a href='https://www.tiktok.com/@pkapparel' target='_blank'><i className='bi bi-tiktok'></i></a></li>
          <li><a href='https://www.linkedin.com/company/pkapparel' target='_blank'><i className='bi bi-linkedin'></i></a></li>
        </ul>
        <div className='col-md-7'>
        <div className={cls(styles.headerMenu, 'text-end')}>
          <ul>
            <li><Link href={'/cart'}>Cart ({cartItemsCount})</Link></li>
            {!userData?.token &&
              <>
                <li><Link href={'/login'}>Login</Link></li>
                <li><Link href={'/signup'}>Signup</Link></li>
              </>
            }
            {userData?.token &&
              <li className={styles.headerMenuDropdown}> 
                {userData.businessName} &nbsp;
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
      </div>
    </>
)}
