import { FC } from 'react'
import FAQS from '../faqs/faqs.comp'
import RatingReviews from '../rating-reviews/rating-reviews.comp'
import Tagline from '../tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jeans Wholesale",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const JeansWholesaleComp: FC<ITaglineProps> = ({keyword, text}) => {
  return (
    <div className="row">
      <Tagline headingText={keyword} paraText={text} />
      <ProductListing category="men" type="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className='mb-5'>
        <p className='mb-4'><strong>Jeans wholesale</strong> business has elevated in the past decade. Although it was first invented for factory workers, it did not take much time for it to become an essential part of catwalks. The rugged fabric has flattered everybody from celebrities to workers. Denim jeans are, now, the ultimate fashion statement, a must-have in every wardrobe. Any product’s ability to capture a huge percentage of the market is highly dependent on its uniqueness. The innovation of dyeing yarn before weaving and using it in the warp only while keeping the weft white is phenomenal. However, the twill weave of denim is a major reason for its success. </p>
        <p className='mb-4'>A good pair of jeans tells the story of its owner. It explains the lifestyle of the person who wears as it ages with time. <strong>Jeans wholesale</strong> market is in equilibrium. Denim lovers are intrigued by the natural worn-out effect of jeans. The more washed down, the better it looks. Jeans are gaining momentum in the world. They are becoming appropriate for meetings, outings, and parties. A premium quality pair of jeans is recognized even in a shredding plant.</p>
        <h2>Wholesale Jeans Online</h2>
        <p className='mb-4'>Purchasing <strong>wholesale jeans</strong> online is indeed a battle. Without the fabric in hand, the ability to conclude the quality of jeans becomes a hustle. However, due to the technologically advanced era in which we exist, the online purchasing dynamics have shifted completely making it easier for the consumer to purchase denim jeans in bulk. Denim qualities are not hidden from the eyes of the consumers even if it is just a picture that is being evaluated. There are three major qualities that you need to know before making a purchase. The character of the rugged fabric, the authentic indigo shade and the worn-out effect is easy to judge even if the fabric is not in your hand. However, as a consumer, you need to be aware of these qualities regardless of the platform where you want to purchase.</p>
        <h3>Quality Jeans Wholesale</h3>
        <p className='mb-4'>As a professional manufacturer of denim jeans, we consider it our duty to educate the consumer with the truth about the quality of denim jeans in wholesale. Denim fabric is extremely cast-sensitive. Therefore, it is essential to evaluate the shade of indigo in the jeans you are purchasing. There is no limitation on the shade. However, it is necessary to be clear about the direction you want your jeans to take. The same goes for the character of denim as well. However, what is important here is to note that the absence of character never exactly becomes a success unless the rest of the ingredients are paired well to create synchronization. As a leading manufacturer of <strong>wholesale jeans</strong> in Pakistan, we need to communicate these guidelines.</p>
        <p className='mb-4'>It is not easy to find a <strong>jeans wholesale</strong> distributor that easily. The rates fluctuate depending on the demand. It is directly proportional to the design and material used in the jeans, as well. Your trust should be aligned with platforms that are experienced and efficient in their work. It is very important to surround your business with exceptional ranges of denim jeans in both quality and quantity.</p> 
      </div>
    </div>
  )}

export default JeansWholesaleComp;
