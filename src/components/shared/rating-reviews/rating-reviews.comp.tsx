import { FC } from "react";
import styles from '../../home/home.module.css'
import cls from 'classnames'

const RatingReviews: FC = () => {
  return (
    <div className="mb-5 px-4">
      <h3 className={styles.sectionHeading}>Rating & Reviews</h3>
      <ul className="row">
        <li className="col-lg-3 col-md-6 col-12 mb-3">
          <div className={cls(styles.innerRating, styles.innerManufacture)}>
            <p>We orders 500 women jackets, delivery was on time and quality was also good, we repeated our order</p>
            <div className={styles.ratingWrap}>
              <ul className={styles.starRating}>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
              </ul>
              <p className={styles.reviewerInfo}>
                <span className={styles.reviewerName}>Brand Owner</span>, 
                <span className={styles.reviewerName}> USA</span>
              </p>
            </div>
          </div>
        </li>
        <li className="col-lg-3 col-md-6 col-12 mb-3">
          <div className={cls(styles.innerRating, styles.innerManufacture)}>
            <p>Pants quality was awesome but shipment was 2 weeks late, had not much good expeience but will try them again</p>
            <div className={styles.ratingWrap}>
              <ul className={styles.starRating}>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
              </ul>
              <p className={styles.reviewerInfo}>
                <span className={styles.reviewerName}>Wholesaler</span>, 
                <span className={styles.reviewerName}> UK</span>
              </p>
            </div>
          </div>
        </li>
        <li className="col-lg-3 col-md-6 col-12 mb-3">
          <div className={cls(styles.innerRating, styles.innerManufacture)}>
            <p>Awesome quality better than China, Pakistani jeans have real denim looks and price is also cheap, regular client of PK apparel</p>
            <div className={styles.ratingWrap}>
              <ul className={styles.starRating}>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
              </ul>
              <p className={styles.reviewerInfo}>
                <span className={styles.reviewerName}>Store Owner</span>, 
                <span className={styles.reviewerName}> Germany</span>
              </p>
            </div>
          </div>
        </li>
        <li className="col-lg-3 col-md-6 col-12 mb-3">
          <div className={cls(styles.innerRating, styles.innerManufacture)}>
            <p>Communication is bit slow but overall expeience of denim quality and on time delivery is good, anyway liked them</p>
            <div className={styles.ratingWrap}>
              <ul className={styles.starRating}>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
                <li className={styles.star}></li>
              </ul>
              <p className={styles.reviewerInfo}>
                <span className={styles.reviewerName}>Amazon Retailer</span>, 
                <span className={styles.reviewerName}> UK</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default RatingReviews