import { FC } from 'react'
import FAQS from '../shared/faqs/faqs.comp'
import RatingReviews from '../shared/rating-reviews/rating-reviews.comp'
import Tagline from '../shared/tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'

const JeanManufacturersComp: FC<ITaglineProps> = ({title, description}) => {
  return (
    <div className="row">
      <Tagline headingText={title} paraText={description} />
      <ProductListing dept="men" category="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className="mb-5">
        <p className="mb-3">Running a successful denim clothing retail chain always requires many connections with the best wholesale denim suppliers. They can offer excellent and high-quality material at reasonable rates with speedy delivery. Pkapparel.com is one such supplier as its state-of-the-art apparel manufacturing facility caters to chain stores, brands, boutiques, and new and experienced designers interested in sourcing high-quality denim clothing.</p>
        <p className="mb-3">Pkapparel.com is one of the largest jeans distributors when it comes to this context. It also has a partnership with many manufacturers worldwide, which allows them to cater to the growing requirements for wholesale denim jeans for both women and men.</p>
        <p className="mb-3">Let&apos;s look at how high-quality boutique wholesale clothing can be made and how Pkapparel.com can help you in this quest:</p>
        <h2 className="mb-3">CMT or Full Package Production, Get Either</h2>
        <p className="mb-3">Boutique wholesale clothing in high quality can be procured in many ways. You can start with a sew and cut manufacturer who will produce the clothes as per the required specifications and designs provided by you, or you can choose a full package extensive clothing supplier. Pk Apparel offers these both options to customers with its complete services such as design, dyeing and washing of denim, wholesale fabric sourcing, sample making, patterns and tech packs, trim development, and even drop shipping some cases.</p>
        <h2 className="mb-3">Quality is Important</h2>
        <p className="mb-3">Distributors of good quality wholesale clothing make sure that not only the fabric used for manufacturing wholesale jeans for women and men is unique premium denim, but the optional accessories such as thread, buttons, and other trims used are also of high quality.</p>
        <p className="mb-3">So, if you are looking for a high-quality denim jeans distributor and provider, Pk apparel makes sure that your search ends. With its high-quality material and fairest of prices, it makes sure that the sole purpose of its business is the satisfaction of its customers.</p>
      </div>
    </div>
  )}

export default JeanManufacturersComp;
