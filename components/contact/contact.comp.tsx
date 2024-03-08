import { FC } from "react"
import styles from './contact.module.css'
import cls from 'classnames'

const Contact : FC = () => {
  return (
    <div className="mb-3">
      <strong className={styles.pageTitle}>Contact Us</strong>
      <div className={cls(styles.contactWrap, 'row mb-3 pt-5 p-3')}>
        <div className="col-lg-6 mb-5">
          <h2>Liaison Office</h2>
          <ul>
            <li className="mb-2">Lucky Hotel Stop, Ferozepur road, <br />Lahore, Pakistan</li>
            <li>
              <span>Tel: </span>
              <span>(+92) 3 000-911-000</span>
            </li>
            <li>
              <span>Email: </span>
              <span><a href="mailto:&#105;&#110;&#102;&#111;&#064;&#112;&#107;&#097;&#112;&#112;&#097;&#114;&#101;&#108;&#046;&#099;&#111;&#109;">&#105;&#110;&#102;&#111;&#064;&#112;&#107;&#097;&#112;&#112;&#097;&#114;&#101;&#108;&#046;&#099;&#111;&#109;</a></span>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 mb-5">
          <h2>Factory</h2>
          <ul>
            <li className="mb-2">21-KM, Ferozepur road, <br />Lahore, Pakistan</li>
            <li>
              <span>Tel: </span>
              <span>(+92) 423 5216095</span>
            </li>
            <li>
              <span>Email: </span>
              <span><a href="mailto:&#112;&#107;&#097;&#112;&#112;&#097;&#114;&#101;&#108;&#050;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">&#112;&#107;&#097;&#112;&#112;&#097;&#114;&#101;&#108;&#050;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;</a></span>
            </li>
          </ul>
        </div>
        <hr />
        <div className={styles.mapOuter}>
          <div className="gmap_canvas">
            <iframe 
              className="gmap_iframe" 
              width="100%"
              height="600" 
              frameBorder="0" 
              scrolling="no" 
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=pk apparel&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;