import { FC, useEffect, useState } from "react"
import styles from './product-listing.module.css'
import axios from "axios"
import { GET_PRODUCTS_LISTING, basePath } from "../../endpoints"
import { Product } from "../../models"
import { useRouter } from "next/dist/client/router";
import { IProductListing } from "../../models/productListing.model"

const ProductListing : FC<IProductListing> = ({category, type, numberOfRecords}) => {
  const [productListing, setProductListing] = useState<Product[]>();
  const { isReady } = useRouter();

  useEffect(() => {
    if(!isReady) {return}
    getProductsListing()
  }, [isReady])

  const getProductsListing = () => {
    axios.get(`${GET_PRODUCTS_LISTING}?category=${category}&type=${type}&numberOfRecords=${numberOfRecords}`).then(res => {
      setProductListing(res.data)
    })
  }

  return (
    <div className="row">
      <h2 className="text-center mb-5">
        <span className="text-capitalize">{category}</span> Hot Selling <span className="text-capitalize">{type}</span>
      </h2>
      {productListing && productListing.map(product => {
        return (
          <>
            <div className="col-lg-3 mb-3">
              <a href={"/wholesale-shop?category"+category+"&type="+type} className="d-block mb-3" target="_blank" rel="noreferrer">
                <img 
                  src={basePath+product.product_images.path+'/'+product.product_images.name} 
                  alt={product.product_images.path} 
                  height="370"
                  className={styles.img} />
              </a>
              <a href={"/wholesale-shop/product-details/"+product.article_no} className="d-block text-center">Article# {product.article_no}</a>
            </div>
          </>
        )})}
    </div>
  )
}

export default ProductListing;