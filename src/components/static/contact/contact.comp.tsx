import { FC } from "react"
import styles from './contact.module.css'
import cls from 'classnames'

const ContactComp : FC = () => {
  return (
    <div className="page-content mb-3">
      <strong className={cls(styles.pageTitle)}>Contact Us</strong>
      <div className={cls(styles.contactWrap, 'row mb-3 mx-3 pt-5 p-3')}>
        <div className="col-lg-6">
          <div className="mb-5">
            <h2>Liaison Office</h2>
            <hr />
            <ul>
              <li className="clearfix mb-3">
                <span>Address</span>
                <span>Sufiabad, 18-KM Ferozepur road, <br />Lahore, Pakistan</span>
              </li>
              <li className="clearfix mb-3">
                <span>Tel/Whatsapp: </span>
                <span>(+92) 3 000-911-000</span>
              </li>
              <li className="clearfix mb-2">
                <span>Email: </span>
                <span><a href="mailto:info@pkapparel.com">info@pkapparel.com</a></span>
              </li>
            </ul>
          </div>
          {/* <hr /> */}
          <div className="mb-5">
            <h2>Factory</h2>
            <hr />
            <ul>
              <li className="clearfix mb-3">
                <span>Address</span>
                <span>21-KM, Ferozepur road, <br />Lahore, Pakistan</span>
              </li>
              <li className="clearfix mb-3">
                <span>Tel: </span>
                <span>(+92) 423 5216095</span>
              </li>
              <li className="clearfix mb-2">
                <span>Email: </span>
                <span><a href="mailto:pkapparel2@gmail.com">pkapparel2@gmail.com</a></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 mb-5">
          <h2>Map Directions</h2>
          <hr />
          <div className="justify-content-center">
            <div className={cls(styles.mapOuter, 'col-12')}>
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
        
      </div>
    </div>
  )
}

export default ContactComp;