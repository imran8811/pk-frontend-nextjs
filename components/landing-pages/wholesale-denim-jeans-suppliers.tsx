import { FC } from 'react'
import FAQS from '../faqs/faqs.comp'
import RatingReviews from '../rating-reviews/rating-reviews.comp'
import Tagline from '../tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'

const WholesaleDenimJeansSuppliers: FC<ITaglineProps> = ({keyword, text}) => {
  return (
    <div className="row">
      <Tagline headingText={keyword} paraText={text} />
      <ProductListing category="men" type="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className="mb-5">
        <p className='mb-3'>Denim is an aberration that has opened a whole new window for textile industries. It is the invention that was needed in this world. This era of Denim has increased the versatility of the fashion industry and has given them new roots to strengthen their success. Denim is the idea that can be converted into a fabric for home textiles, or a fabric for jeans or even a fabric for dress or shirt. It has unlimited end uses and each end use demands a particular set of properties that are not easy to impart. Therefore, it is extremely important for a businessman to keep in mind the best <strong>Wholesale Denim Jeans Supplier.</strong></p>
        <h2>Staying In Fashion Forever</h2>
        <p className='mb-3'>Denim is not here to abscond after a while; it is here to stay till the end. Denim jeans are setting standards for every other type of pants. The variety that denim jeans offer is rarely found anywhere else.  From kids to adults, everyone is shifting towards it and including more denim in their wardrobe. Textile industries that are not dealing with denim are, also, shifting their products to it. However, no matter which industry incorporates denim products in their attire, it is all about who can produce the best quality of jeans so keep an eye out for <strong>Wholesale Denim Jeans Suppliers</strong>.</p>
        <h3>Standard Quality Offered by Suppliers</h3>
        <p className='mb-3'>Majority of the suppliers are experts in delivery exactly what the client offers but it is important for the client to have knowledge about the products as well. Without any particular knowledge, the standard of quality is not delivered to the client because of the lack of information that the suppliers need. Therefore, it is important to trust the suppliers with the quality that they are sending otherwise you can always count on the best <strong>Wholesale Denim Jeans Suppliers</strong> in town.</p>
        <h4>Having the upper hand</h4>
        <p className='mb-3'>It is extremely important for <strong>Wholesale Denim Jeans Suppliers</strong> to have the upper hand in situations. The reason behind it is that they provide jeans in bulk quantity. By setting a minimum limit for placing order, they are showing their firmness in the business. This way, they not only can make more profit as their prices are low but also make sure that they invest their time in orders that are worth it. Denim jeans are sold in the market at a rate faster than any other product. Therefore, it is important to take orders from clients who have a good stand in the market.</p>
      </div>
    </div>
  )}

export default WholesaleDenimJeansSuppliers;
