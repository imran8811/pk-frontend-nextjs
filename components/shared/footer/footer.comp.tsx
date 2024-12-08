import { FC } from "react";
import Nav from "../nav/nav.comp";
import styles from './footer.module.css'
import cls from 'classnames'
import Keywords from "../keywords/keywords.comp";

const Footer: FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
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
          <div className="footer-bottom">
            <Keywords />
            <p className="text-center pt-5 pb-5 mb-0"><strong>Copyrights&nbsp;&copy;&nbsp;PK Apparel Pvt. Ltd. | All Rights Reserved 2015-2024</strong></p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;