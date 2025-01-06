"use client";
import { FC, useCallback, useEffect, useState } from "react"
import cls from 'classnames'
import styles from './shop.module.css'
import { basePath, GET_PRODUCTS, PRODUCT_API, PRODUCT_COUNT_BY_DEPT_CATEGORY, WHOLESALE_SHOP } from "../../endpoints"
import { IProduct } from "../../models"
import { useForm } from 'react-hook-form'
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "../../interceptors/axios.interceptor"
import Link from "next/link";
import ProductFiltersComp from "../product-filters.comp";
import { ICategory } from "../../models/category.model";
import axios from "axios";

const ShopComp : FC = (props:any) => {
  const [products, setProducts] = useState<IProduct[]>();
  const [countByDeptCategories, setCountByDeptCategories] = useState<ICategory[]>();
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();

  let queryURL:string;
  if(params.dept && params.category){
    queryURL = `/${params.dept}/${params.category}`;
  } else if(params.dept && !params.category) {
    queryURL = `/${params.dept}`;
  } else {
    queryURL = '/getAll';
  }

  useEffect(() => {
    getAllProducts();
    if(params.dept){
      productCountByDeptCategory();
    }
  }, [params])

  const getAllProducts = () => {
    axiosInstance.get(`${PRODUCT_API}${queryURL}`).then(res => {
      setProducts(res.data)
    })
  }

  const productCountByDeptCategory = () => {
    axiosInstance.post(`${PRODUCT_COUNT_BY_DEPT_CATEGORY}/${params.dept}`, []).then(res => {
      setCountByDeptCategories(res.data)
    })
  }

  return (
    <div className="mb-3">
      <div className={cls(styles.shopListing, 'col-lg-12')}>
        <div className="mb-3">
          <nav aria-label="breadcrumb" className="mt-4 px-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href={WHOLESALE_SHOP}>Wholesale Shop</Link>
              </li>
              <li className="breadcrumb-item text-capitalize">
                <Link href={`${WHOLESALE_SHOP}/${params.dept}`}>{params.dept}</Link>
              </li>
              {params.category && 
                <li className="breadcrumb-item text-capitalize">
                  <Link href={`${WHOLESALE_SHOP}/${params.dept}/${params.category}`}>{(params.category).toString().replace('-', ' ')}</Link>
                </li>
              }
            </ol>
          </nav>
          {/* <h1 className="text-center mb-4">Wholesale Shop</h1> */}
          <div className="products-outer">
            {/* <div className="col-lg-2 d-lg-block d-md-none">
              <ProductFiltersComp />
            </div> */}
            <div className="products">
              <div className="boxes">
                {countByDeptCategories && 
                  <ul className="product-categories-pills mb-5">
                  {countByDeptCategories.map((category, index) => {
                    return (
                      <li className="mx-2 px-3" key={index}>
                        <Link className="text-capitalize" href={'/wholesale-shop/men/'+category['category']}>
                        {category['category'].replace("-", " ")+'s'} ({ category['count']})
                        </Link>
                      </li>
                    )
                  })}
                  </ul>
                }
                {products && products.map((product, index) => {
                  return (
                    <div className="box mb-5 text-center" key={index}>
                      <a href={`${WHOLESALE_SHOP}/${product.dept}/${product.category}/${product.p_id}`} className="d-block" rel="noreferrer">
                        <img
                          src={product.image_front} 
                          alt={product.image_front}
                          height="370"
                          className={styles.img} />
                      </a>
                      <a className="small" href={`/${product.dept}/${product.category}/${product.p_id}`}>{'$'+ product.price + '-' + product.slug}</a>
                    </div>
                  )
                })
               }
              </div>
              {products && products.length === 0 &&
                <h4 className="text-center text-danger mb-5 mt-5">Products coming soon...</h4>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopComp;