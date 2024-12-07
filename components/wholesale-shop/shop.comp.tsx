"use client";
import { FC, useCallback, useEffect, useState } from "react"
import cls from 'classnames'
import styles from './shop.module.css'
import { basePath, GET_PRODUCTS, PRODUCT_API } from "../../endpoints"
import { IProduct } from "../../models"
import { useForm } from 'react-hook-form'
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "../../interceptors/axios.interceptor"
import Link from "next/link";
import ProductFiltersComp from "../product-filters.comp";

const ShopComp : FC = (props:any) => {
  const [products, setProducts] = useState<IProduct[]>();
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
  } else if(searchParams.get('dept') && searchParams.get('category')) {
    queryURL = `/${searchParams.get('dept')}/${searchParams.get('category')}`;
  } else if(searchParams.get('dept') && !searchParams.get('category')) {
    queryURL = `/${searchParams.get('dept')}`;
  } else if(!searchParams.get('dept') && searchParams.get('category')) {
    queryURL = `/men/${searchParams.get('category')}`;
  } else {
    queryURL = '/getAll';
  }

  useEffect(() => {
    getAllProducts();
  }, [searchParams])

  const getAllProducts = () => {
    axiosInstance.get(`${PRODUCT_API}${queryURL}`).then(res => {
      setProducts(res.data)
    })
  }

  return (
    <div className="mb-3">
      <div className={cls(styles.shopListing, 'col-lg-12')}>
        <div className="mb-3">
          <nav aria-label="breadcrumb" className="mt-4 px-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href={'/'}>Shop</Link>
              </li>
              <li className="breadcrumb-item text-capitalize">
                <Link href={`/${params.dept}`}>{params.dept}</Link>
              </li>
              {params.category && 
                <li className="breadcrumb-item text-capitalize">
                  <Link href={`/${params.dept}/${params.category}`}>{(params.category).toString().replace('-', ' ')}</Link>
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
                { products && products.map((product, index) => {
                  return (
                    <div className="box mb-5 text-center" key={index}>
                      <a href={`/${product.dept}/${product.category}/${product.p_id}`} className="d-block mb-3" target="_blank" rel="noreferrer">
                        <img
                          src={product.image_front} 
                          alt={product.image_front}
                          height="370"
                          className={styles.img} />
                      </a>
                      <a className="small" href={`/${product.dept}/${product.category}/${product.p_id}`}>{'$'+ product.price + '-' + product.slug}</a>
                    </div>
                  )
                })}
              </div>
              {products && products.length === 0 &&
                <h4 className="text-center text-danger mb-5 mt-5">No Item Found</h4>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopComp;