"use client";
import { FC, useEffect, useState } from "react"
import styles from './product-listing.module.css'
import axiosInstance from "../../interceptors/axios.interceptor"
import { PRODUCT_API, WHOLESALE_SHOP } from "../../endpoints"
import { IProduct } from "../../models"
import { IProductListing } from "../../models/productListing.model";
import cls from 'classnames';

const ProductListing : FC<IProductListing> = ({dept, category, numberOfRecords}) => {
  const [productListing, setProductListing] = useState<IProduct[]>();

  useEffect(() => {
    getProductsListing()
  }, [])

  const getProductsListing = () => {
    axiosInstance.get(`${PRODUCT_API}/${dept}/${category}`).then(res => {
      setProductListing(res.data)
    })
  }

  return (
    <div className="mb-5">
      <h3 className="mb-5 page-title">
        <span className="text-capitalize text-center">{dept}</span> Hot Selling <span className="text-capitalize">{category}</span>
      </h3>
      <div className={cls(styles.productListing, 'row')}>
      {productListing && productListing.map((product, index) => {
        return (
          <div className="col-lg-3 col-md-4 mb-3 text-center" key={index}>
            <a href={`${WHOLESALE_SHOP}`} className="d-block mb-3" target="_blank" rel="noreferrer">
              <img
                src={product.productImages.frontImgUrl} 
                alt={product.productImages.frontImgUrl}
                height="370"
                className={styles.img} />
            </a>
            <a className="small" href={`${WHOLESALE_SHOP}`}>{'$'+ product.price + '-' + product.slug}</a>
          </div>
        )})}
      </div>
    </div>
  )
}

export default ProductListing;