"use client";
import Link from 'next/link'
import Script from 'next/script'
import styles from '../header/header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { CheckUserSession, UserLogout } from '../../../services/auth.service'
import { useRouter } from 'next/navigation'
import { WHOLESALE_SHOP } from '../../../endpoints'
import cls from 'classnames';

export default function Header() {
  const userData = JSON.parse(localStorage.getItem('userData')!);
  const router = useRouter();
  const userLogout = async() => {
    if(await UserLogout(userData.userId)){
      localStorage.removeItem('userData');
      router.push(WHOLESALE_SHOP);
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
      <header className='row border-bottom border-info mb-4'>
        <div className="col-md-3 pt-3 mb-2">
          <Link href="/">
            <img src="/images/logo.jpg" alt="logo" width={227} height={46} title="PK Apparel Home" />
          </Link>
        </div>
        <div className='col-1'></div>
        <div className='col-md-8 mt-3'>
          <div className={cls(styles.headerMenu, 'text-end')}>
            <ul >
              <li><Link href={'/wholesale-shop'}>Wholesale Shop</Link></li>
              <li><Link href={'/wholesale-shop/cart'}>Cart (0)</Link></li>
              {!CheckUserSession() &&
                <>
                  <li><Link href={'/login'}>Login</Link></li>
                  <li><Link href={'/signup'}>Signup</Link></li>
                </>
              }
              {CheckUserSession() &&
                <li className={styles.headerMenuDropdown}> {userData.businessName} &nbsp;<FontAwesomeIcon icon={faCaretDown} className='fa fa-caret-down' />
                  <ul>
                    <li><Link href={'/account'}>Account</Link></li> 
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
