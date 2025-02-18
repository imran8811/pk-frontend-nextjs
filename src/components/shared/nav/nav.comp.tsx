import Link from "next/link";
import { FC } from "react"
import styles from '../header/header.module.css'

const Nav: FC = () => {
  return (
    <nav className={styles.footerMenu}>
      <ul>
        <li><Link href="/wholesale-shop/men">men</Link></li>
        <li><Link href="/wholesale-shop/women">Women</Link></li>
        <li><Link href="/wholesale-shop/boys">Boys</Link></li>
        <li><Link href="/wholesale-shop/girls">girls</Link></li>
        <li><Link href="/about">About us</Link></li>
        <li><Link href="/factory">Factory</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact us</Link></li>
      </ul>
    </nav>
  )
}

export default Nav;