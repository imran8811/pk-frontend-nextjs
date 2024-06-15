import { FC, useEffect, useState } from "react"
import styles from './product-listing.module.css'
import axiosInstance from "../../interceptors/axios.interceptor"
import { GET_PRODUCTS_LISTING, PRODUCT_API, basePath } from "../../endpoints"
import { IProduct } from "../../models"
import { useRouter } from "next/navigation";
import { IProductListing } from "../../models/productListing.model"

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
    <div className="row">
      <h2 className="text-center mb-5">
        <span className="text-capitalize">{category}</span> Hot Selling <span className="text-capitalize">{type}</span>
      </h2>
      {productListing && productListing.map((product, index) => {
        return (
          <>
            <div className="col-lg-3 col-md-6 col-12 mb-3 text-center" key={index}>
              <a href={`/wholesale-shop/${product.dept}/${product.category}/${product._id}`} className="d-block mb-3" target="_blank" rel="noreferrer">
                <img
                  src={product.productImages.frontImgUrl} 
                  alt={product.productImages.frontImgUrl}
                  className={styles.img} />
              </a>
              <a  className="small" href={`/wholesale-shop/${product.dept}/${product.category}/${product._id}`}>{product.articleNo + '-' + product.slug}</a>
            </div>
          </>
        )})}
    </div>
  )
}

export default ProductListing;