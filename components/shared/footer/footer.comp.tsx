import { FC } from "react";
import Nav from "../nav/nav.comp";
import styles from './footer.module.css'
import cls from 'classnames'

const Footer: FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="mb-3 text-center">
          <Nav></Nav>
        </div>
        <ul className="social-network mb-4">
          <li><a href="https://www.facebook.com/pkapparel1" target="_blank" rel="noreferrer">facebook</a></li>
          <li className="instagram">
            <a href="https://www.instagram.com/pkapparel_official" target="_blank" rel="noreferrer">Instagram</a>
          </li>
          <li className="linkedin">
            <a href="https://www.linkedin.com/company/pkapparel" target="_blank" rel="noreferrer">Linkedin</a>
          </li>
        </ul>
        <p className="text-center text-white pb-3 mb-0"><strong>&nbsp;&copy;&nbsp;PK Apparel | All Rights Reserved 2024</strong></p>
      </footer>
    </>
  )
}

export default Footer;