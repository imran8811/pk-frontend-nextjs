import { FC } from "react";
import styles from '../home/home.module.css'

const FAQS: FC = () => {
  return (
    <div className="mb-5">
      <h3 className={styles.sectionHeading}>Questions - FAQs</h3>
      <div className={styles.faqsList} itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is your MOQ for available stock?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">There is no MOQ for availabe stock, you can even buy 1 set of each style or color</div>
          </div>
        </div>
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is your MOQ for custom order?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">For custom design order our MOQ is 100 pieces per style per color</div>
          </div>
        </div>
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Do you send samples and how much it costs?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">Yes, we send samples and for available samples cost per piece is $50 including shipping worldwide delivered in 24 hours. <br/><br/>
            <strong>For custom design samples </strong>cost is according to design and delivered in 2 weeks.</div>
          </div>
        </div>
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Are you manufacturer, wholesaler or trader?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">We have our own manufacturing unit with capacity of 3000 pieces per day</div>
          </div>
        </div>
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is your order delivery time?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">Our order delivery time is 3-4 weeks after order confirmation</div>
          </div>
        </div>
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What shipping modes you are working?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">Ex-factory, FOB, CIF etc</div>
          </div>
        </div>
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What payment methods do you accept?</h3>
          <div className={styles.acceptedAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text">
              <strong>For Samples: </strong>Credit/Debit Card, Western Union etc.<br/><br/>
              <strong>For Orders: </strong>LC, Bank Transfers etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQS;