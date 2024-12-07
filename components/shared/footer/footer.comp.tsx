import { FC } from "react";
import Nav from "../nav/nav.comp";
import styles from './footer.module.css'
import cls from 'classnames'

const Footer: FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="mb-5 text-center">
          <Nav></Nav>
        </div>
        <div className={styles.footerMenu}>
          <ul className='social-links mb-5'>
            <li><a href='https://www.facebook.com/pkapparel1' target='_blank'><i className='bi bi-facebook'></i></a></li>
            <li><a href='https://www.instagram.com/pkapparel_official' target='_blank'><i className='bi bi-instagram'></i></a></li>
            <li><a href='https://www.tiktok.com/@pkapparel' target='_blank'><i className='bi bi-tiktok'></i></a></li>
            <li><a href='https://www.linkedin.com/company/pkapparel' target='_blank'><i className='bi bi-linkedin'></i></a></li>
          </ul>
        </div>
        {/* <ul className="social-links mb-4">
          <li><a href="https://www.facebook.com/pkapparel1" target="_blank" rel="noreferrer">facebook</a></li>
          <li className="instagram">
            <a href="https://www.instagram.com/pkapparel_official" target="_blank" rel="noreferrer">Instagram</a>
          </li>
          <li className="tiktok">
            <a href="https://www.instagram.com/pkapparel_official" target="_blank" rel="noreferrer">Tiktok</a>
          </li>
          <li className="linkedin">
            <a href="https://www.linkedin.com/company/pkapparel" target="_blank" rel="noreferrer">Linkedin</a>
          </li>
        </ul> */}
        <p className="text-center text-white pb-5 mb-0"><strong>&nbsp;&copy;&nbsp;PK Apparel | All Rights Reserved 2024</strong></p>
      </footer>
    </>
  )
}

export default Footer;