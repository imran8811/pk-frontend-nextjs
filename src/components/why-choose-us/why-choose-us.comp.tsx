import { FC } from "react";
import styles from '../home/home.module.css';

const WhyChooseUs : FC = () => {
  return (
    <div className="mb-5 px-4">
      <div className={styles.sectionHeading}>Why choose us</div>
      <div className="row">
        <div className="col-md-4">
          <strong className={styles.subHead}>ISO Certified</strong>
          <p>We are ISO 9001:2008 certified company, certification is a useful tool to add credibility, by demonstrating that your product or service meets the expectations of your customers.</p>
        </div>
        <div className="col-md-4">
          <strong className={styles.subHead}>Best Prices</strong>
          <p>Our prices are unbeatable, Our FOB prices for best quality jeans pants ranges from $4 - $8 depends on buyer&apos;s styling and design requirements.</p>
        </div>
        <div className="col-md-4">
          <strong className={styles.subHead}>On Time Shipment</strong>
          <p>We have delivered 80% of our shipments on time, We are highly expert in our field and have time estimates of every process it takes to complete shipment.</p>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs;