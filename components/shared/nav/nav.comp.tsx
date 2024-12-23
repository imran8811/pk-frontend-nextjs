import Link from "next/link";
import { FC } from "react"
import styles from '../header/header.module.css'

const Nav: FC = () => {
  return (
    <nav className={styles.footerMenu}>
      <ul>
        <li><Link href="/men">men</Link></li>
        <li><Link href="/women">Women</Link></li>
        <li><Link href="/boys">Boys</Link></li>
        <li><Link href="/girls">girls</Link></li>
        <li><Link href="/about">About us</Link></li>
        <li><Link href="/factory">Factory</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact us</Link></li>
      </ul>
    </nav>
  )
}

export default Nav;