import { FC } from 'react'
import FAQS from '../shared/faqs/faqs.comp'
import RatingReviews from '../shared/rating-reviews/rating-reviews.comp'
import Tagline from '../shared/tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Wholesale Women Jeans",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const WholesaleWomenJeans: FC<ITaglineProps> = ({keyword, text}) => {
  return (
    <div className="row">
      <Tagline headingText={keyword} paraText={text} />
      <ProductListing category="men" type="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className="mb-5">
        <p className="mb-3">Year after year, trends change and women fashion experiences drastic changes. From long dresses to short skirts and tank tops, there have been quite lot variations; some additions and some fashion buried forever. If there is one thing that has always been in the latest trends and the number one choice of women from around the world then it has to be classic jeans. A <strong>wholesale women jeans</strong> is one type of business that keeps getting bigger as the demand only increases every passing year. This is the reason why hundreds of wholesale women jeans brands have opened up competing for greater shares.</p>
        <h2>Intricate cuts and long wear fabric</h2>
        <p className="mb-3">To be able to actually meet the right set of demand for women jeans, wholesalers have to provide a high quality fabric that is durable and a design that appeals the eye. Women jeans must have a good fit and be detailed with intricate cuts to give it that perfect shape. <strong>Wholesale women jeans</strong> are required to be of the same consistent quality and provide the same assurance to every purchaser. The quality should not be lost in the bulk that gets produced. Jeans are supposed to be long wearing and wholesalers should be careful with that, as portrayed by PK Apparel.</p>
        <h3>Hitting time and again with the classic wear</h3>
        <p className="mb-3">Despite the variety of designs available, the one classic jean always tops the list for all denim jean. Denim jeans carry great class and elegance that can be worn both for formal and casual purposes; something which attracts women to keep few in stock at all times. Brands dealing in <strong>wholesale women jeans</strong> should make sure that they are able to provide the original jeans design along with those to match the latest fashion trends.</p>
      </div>
    </div>
  )}

export default WholesaleWomenJeans;
