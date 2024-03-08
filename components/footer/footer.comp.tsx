import { FC } from "react";
import Nav from "../nav/nav.comp";
import styles from './footer.module.css'
import cls from 'classnames'

const Footer: FC = () => {
  return (
    <footer className={cls(styles.footer)}>
      <div className="container">
        <div className="mb-3 text-center">
          <Nav></Nav>
        </div>
        <ul className={styles.socialNetwork}>
          <li><a href="https://www.facebook.com/pkapparel2" target="_blank" rel="noreferrer">facebook</a></li>
          <li className={styles.linkedin}><a href="https://www.linkedin.com/company/pkapparel" rel="noreferrer" target="_blank">Linkedin</a></li>
        </ul>
        <p className="text-center text-white pb-3 mb-0"><strong>&nbsp;&copy;&nbsp;PK Apparel | All Rights Reserved 2022</strong></p>
      </div>
    </footer>
  )
}

export default Footer;