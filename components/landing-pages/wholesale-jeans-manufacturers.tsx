import { FC } from 'react'
import FAQS from '../faqs/faqs.comp'
import RatingReviews from '../rating-reviews/rating-reviews.comp'
import Tagline from '../tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'

const WholesaleJeansManufacturers: FC<ITaglineProps> = ({keyword, text}) => {
  return (
    <div className="row">
      <Tagline headingText={keyword} paraText={text} />
      <ProductListing category="men" type="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className="mb-5">
        <p className="mb-3">Denim is an eclectic art that has no end. Considering the types of denim fabric and their advantages, it is not peculiar for denim to pave its way into the textile industry and outshine all other types of fabrics. Of all the garments that can be made from this fabric, the roots of it are embedded in denim jeans. <strong>wholesale jeans manufacturers</strong> have a huge responsibility on themselves to keep the essence of true denim jeans in their production.</p>
        <h2>Adding Uniqueness to Denim Jeans</h2>
        <p className="mb-3">In case of producing jeans that is already worn by the public, <strong>wholesale jeans manufacturers</strong> try to expand their ideas and come up with unique designs to stand out from the competition. There are certain processes that are necessary to perform on denim jeans. However, to alter those processes just enough to not lose the purpose of it but impart a certain style in jeans that makes the end product unique is the most important aspect of staying on the top of this market.</p>
        <h3>Features To Look For In Denim Jeans</h3>
        <p className="mb-3">When purchasing jeans, it is extremely important to have an idea of what makes jeans valuable. The worn out look that is induced in denim jeans is the most important feature of it. It comes from a time when jeans were manufactured for men whose work demanded strength in their pants back in 1960s. Taking inspiration from that time, <strong>wholesale jeans manufacturers</strong> try to replicate the worn out effect in their newly produced jeans. Therefore, every profession demands a different effect that gives a new vibe.</p>
        <h4>Jeans based on Gender</h4>
        <p className="mb-3">Jeans that is provided by <strong>wholesale jeans manufacturers</strong> having experience in this field is going to look elegant with any type of shirt on both genders as they provide quality that is rarely found in the market. It can be worn in a casual outing or event as good quality jeans has high reputation in any region of the world. As far as the types of jeans are concerned, there are high waist and medium waist jeans that are mostly preferred for women whereas the low waist jeans are preferred for men. While manufacturing jeans for both genders, it is kept in mind that women prefer softer jeans than men.</p>
      </div>
    </div>
  )}

export default WholesaleJeansManufacturers;
