import { FC, useEffect, useState } from "react"
import styles from './product-listing.module.css'
import axiosInstance from "../../interceptors/axios.interceptor"
import { PRODUCT_API } from "../../endpoints"
import { IProduct } from "../../models"
import { IProductListing } from "../../models/productListing.model";
import cls from 'classnames';

const ProductListing : FC<IProductListing> = ({category, type, numberOfRecords}) => {
  const [productListing, setProductListing] = useState<IProduct[]>();

  useEffect(() => {
    getProductsListing()
  }, [])

  const getProductsListing = () => {
    axiosInstance.get(`${PRODUCT_API}/men/jeans-pant`).then(res => {
      setProductListing(res.data)
    })
  }

  return (
    <div className="mb-5">
      <h3 className="mb-5">
        <span className="text-capitalize">{category}</span> Hot Selling <span className="text-capitalize">{type}</span>
      </h3>
      <div className={cls(styles.productListing, 'row')}>
      {productListing && productListing.map((product, index) => {
        return (
          <div className="col-lg-3 col-md-4 mb-3 text-center" key={index}>
            <a href={`/wholesale-shop/${product.dept}/${product.category}/${product._id}`} className="d-block mb-3" target="_blank" rel="noreferrer">
              <img
                src={product.productImages.frontImgUrl} 
                alt={product.productImages.frontImgUrl}
                height="370"
                className={styles.img} />
            </a>
            <a className="small" href={`/wholesale-shop/${product.dept}/${product.category}/${product._id}`}>{'$'+ product.price + '-' + product.slug}</a>
          </div>
        )})}
      </div>
    </div>
  )
}

export default ProductListing;