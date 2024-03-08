import { FC } from 'react'
import FAQS from '../faqs/faqs.comp'
import RatingReviews from '../rating-reviews/rating-reviews.comp'
import Tagline from '../tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'

const DenimManufacturers: FC<ITaglineProps> = ({keyword, text}:ITaglineProps) => {
  return (
    <div className="row">
      <Tagline headingText={keyword} paraText={text} />
      <ProductListing category="men" type="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
    </div>
  )}

export default DenimManufacturers;
