"use client";
import Link from 'next/link'
import styles from '../header/header.module.css'
import cls from 'classnames';
import HeaderTop from '../header-top/header-top.comp';

export default function Header() {
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
