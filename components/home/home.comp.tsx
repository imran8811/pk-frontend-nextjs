import { FC } from "react";
import styles from './home.module.css'
import HomeBanner from "../shared/home-banner/home-banner.comp";
import Link from "next/link";

const HomeComponent : FC = () => {
  return (
    <div className="col-12">
      <div className="mb-5">
        <HomeBanner></HomeBanner>   
      </div>
      <div className="mb-5">
        <strong className={styles.sectionHeading}>How It Works</strong>
        <ul className="row">
          <li className="col-lg-4">
            <strong>Inquiry Details</strong>
            <p>Product inquiry details like colors, sizes, quantity and design are received and reviewed</p>
          </li>
          <li className="col-lg-4">
            <strong>Quotation</strong>
            <p>Prices are quoted according to the received details</p>
          </li>
          <li className="col-lg-4">
            <strong>Sampling</strong>
            <p>Once prices are finalized then samples are being produced and dispatched</p>
          </li>
          <li className="col-lg-4">
            <strong>Production</strong>
            <p>After samples approval and advance payment receipt we start order production process until the shipment is ready</p>
          </li>
          <li className="col-lg-4">
            <strong>Delivery</strong>
            <p>Once shipment is ready we arrange pickup or delivery according to the terms finalized with buyer</p>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <h2 className={styles.sectionHeading}>Jeans for Men</h2>
        <ul className="row">
          <li className="col-lg-3">
            <Link href="wholesale-shop/men/jeans-pants" className={styles.innerManufacture}>
              <img src="/images/jeans-pant-main.jpg" alt="jeans pants" />
              <span className={styles.productCategory}>Jeans Pants</span>
            </Link>
          </li>
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/jeans-jacket-main.jpg" alt="Jeans Jackets" />
              <span className={styles.productCategory}>Jeans Jackets</span>
            </Link>
          </li>
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/jeans-shirt-main.jpg" alt="jeans shirts" />
              <span className={styles.productCategory}>Jeans Shirts</span>
            </Link>
          </li>
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/jeans-short-main.jpg" alt="jeans shorts" />
              <span className={styles.productCategory}>Jeans Shorts</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <h2 className={styles.sectionHeading}>Jeans for Women</h2>
        <ul className="row">
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/women-jeans.jpg" alt="jeans pants" />
              <span className={styles.productCategory}>Jeans Pants</span>
            </Link>
          </li>
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/women-jacket.jpg" alt="Jeans Jackets" />
              <span className={styles.productCategory}>Jeans Jackets</span>
            </Link>
          </li>
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/women-shirt.jpg" alt="jeans shirts" />
              <span className={styles.productCategory}>Jeans Shirts</span>
            </Link>
          </li>
          <li className="col-lg-3">
            <Link href="#" className={styles.innerManufacture}>
              <img src="/images/women-short.jpg" alt="jeans shorts" />
              <span className={styles.productCategory}>Jeans Shorts</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <div className={styles.sectionHeading}>Why choose us</div>
        <div className="row">
          <div className="col-lg-4">
            <strong className={styles.subHead}>ISO Certified</strong>
            <p>We are ISO 9001:2008 certified company, certification is a useful tool to add credibility, by demonstrating that your product or service meets the expectations of your customers.</p>
          </div>
          <div className="col-lg-4">
            <strong className={styles.subHead}>Best Prices</strong>
            <p>Our prices are unbeatable, Our FOB prices for best quality jeans pants ranges from $4 - $8 depends on buyer&apos;s styling and design requirements.</p>
          </div>
          <div className="col-lg-4">
            <strong className={styles.subHead}>On Time Shipment</strong>
            <p>We have delivered 80% of our shipments on time, We are highly expert in our field and have time estimates of every process it takes to complete shipment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent;