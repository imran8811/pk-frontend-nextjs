import { FC } from 'react'
import FAQS from '../faqs/faqs.comp'
import RatingReviews from '../rating-reviews/rating-reviews.comp'
import Tagline from '../tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jeans Manufacturers",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const JeansManufacturersComp: FC<ITaglineProps> = ({keyword, text}) => {
  return (
    <div className="row">
      <Tagline headingText={keyword} paraText={text} />
      <ProductListing category="men" type="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className="mb-5">
        <h2 className="mb-4">Jeans Manufacturers Are In Competition, But Who Wins?</h2>
        <p className="mb-4">Did you know around 69% of US entrepreneurs start their business from home? The digital world is whole new, its own kind of planet where people instead of carrying out raids on their opponents warehouses, wage war with marketing tactics.</p>
        <p className="mb-4">The best one wins! </p>
        <p className="mb-4">Now, it should be clarified that who is the best one? What it takes to be considered best one? </p>
        <p className="mb-4">Jeans is one of the sub-types of apparel industry and is considered as necessary item of our wardrobe. If you are one of the <strong>Jeans Manufacturers</strong>, then you may relate to a lot of things that this article holds for you. </p>
        <p>We know how much important jeans is for our clothing. We wear it almost every day, at work, home, party, educational institutes and whatnot! When such thing is in so much demand, it is natural to have competition among the manufacturers.</p>
        <p className="mb-4">The question arise who is going to counter all those hurdles and win their customer&apos;s hearts? There are many ways to be successful, have a look at some of them:</p>
        <ul>
          <li>Make sure the material of your jeans is pure and up-to-date. </li>
          <li>Your marketing campaigns are relatable and engaging</li>
          <li>Know market trends all the time. </li>
          <li>Hire competent individuals who are passionate about their job.</li>
          <li>Customer care should be available 24/7 to cater to the queries of consumers.</li>
          <li>Come up with discount options and sale every now and then to attract new customers and retain the old ones.</li>
        </ul>
        <p>One thing should always stay there - put your customer first and see how quickly things changes in your favor.</p>
      </div>
    </div>
  )}

export default JeansManufacturersComp;
