import { FC } from 'react'
import FAQS from '../shared/faqs/faqs.comp'
import RatingReviews from '../shared/rating-reviews/rating-reviews.comp'
import Tagline from '../shared/tagline/tagline.comp'
import ProductListing from '../product-listing/product-listing.comp'
import { ITaglineProps } from '../../models'

const MotorcycleJeansManufacturersComp: FC<ITaglineProps> = ({title, description}) => {
  return (
    <div className="row">
      <Tagline headingText={title} paraText={description} />
      <ProductListing dept="men" category="jeans-pant" numberOfRecords={6} />
      <RatingReviews />
      <FAQS />
      <div className="mb-5">
        <p className='mb-3'>Jeans with aramid protection will never run out of fashion. They will remain a signature style for the motorcycles. It is impossible to venture out with regular jeans once you are introduced to the best quality that <strong>Motorcycle Jeans manufacturers</strong> are providing.</p>
        <p className='mb-3'>Denim jeans for motor cycles are in demand for the past decade. Denim jeans made up of Motorcycle, aramid and protective padding is the best choice for motorcycle riders. Such jeans allow them to carry on with their biking to the best of their potential without holding back.</p>
        <p className='mb-3'>These jeans are not only abrasion resistant, but also heat resistant since road rash is commonly known injury to exist for motorcycles. <strong>Motorcycle Jeans Manufacturers</strong> provide jeans that offer protection for load bearing parts of the body i.e. elbow, butt, knee, etc. Since these parts make the most contact with the ground, they require plethora of attention for designing Motorcycle jeans.</p>
        <h2>Important Functions of Motorcycle Jeans</h2>
        <p className='mb-3'>Denim jeans with aramid protection are strong, but at the same time they are breathable and comfortable. Motorcycle jeans provide ventilation along with the benefit of water resistance. In a reasonable price, Motorcycle jeans manufacturers deal with denim jeans that does not only have quality construction, but also convenience in terms of water proof pockets to carry necessary items, reflective piping to avoid accidents and side zippers to avoid removal of shoes for the removal of jeans.</p>
        <h3>Fit Jeans for Motorcycles</h3>
        <p className='mb-3'>Motorcycle jeans manufacturers produce jeans for motorcycles of all ages and sizes. However, which jeans fits you best is dependent upon your own experience. Denim jeans cannot function properly if they are not of the right fit. Therefore, the measurement of in seam and waist size plays a vital role to figure out which jeans won’t provide protection to the wrong parts during a crash leaving you injured.</p>
        <h4>Dressed up to the nines</h4>
        <p className='mb-3'>It doesn&apos;t necessarily mean that the jeans that provide protection cannot have a sense of style to it. <strong>Motorcycle Jeans Manufacturers</strong> make sure that the denim jeans you are buying is in fashion and will remain a trend for the motorcycles.</p>
        <p className='mb-3'>There are different types of Motorcycle jeans with different styles. One of them is the jeans that can be worn all day in different situations. However, they offer limited protection against serious road injuries. Therefore, they are restricted to casual road motorcycles.</p>
        <p className='mb-3'>Such types of jeans are not for dedicated heavy motorcycles as they require jeans that are flawless in all functions. These types of jeans are weather resistant, has reflective piping, provide ventilation and fit perfectly. They also include knee pucks for extra safety. <strong>Motorcycle Jeans Manufacturers</strong> also provide adjustable knee armor for heavy motorcycles. </p>
        <p className='mb-3'>Each type of biker requires a different style, design and protection. Based upon their passion for biking, we make sure there are no compromises when it comes to their life. Our brand holds the trust of reputed companies and clients. We worry for the motorcycles and produce quality Motorcycle jeans.</p>
      </div>
    </div>
  )}

export default MotorcycleJeansManufacturersComp;
