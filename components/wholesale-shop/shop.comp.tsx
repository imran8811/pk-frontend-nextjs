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

const ShopComp : FC = (props:any) => {
  const [products, setProducts] = useState<IProduct[]>();
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

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
  }, [])

  const getAllProducts = () => {
    axiosInstance.get(`${PRODUCT_API}${queryURL}`).then(res => {
      setProducts(res.data)
    })
  }

  const setFiltersData = (filterType, e) => {
    if(e.target.value === '') {
      delete searchParams.get[filterType]
      router.push(pathname + '?' + createQueryString(filterType, e.target.value), { scroll: false });
    } else {
      searchParams.set[filterType] = e.target.value
      router.push(pathname + '?' + createQueryString(filterType, e.target.value), { scroll: false });
    }
    // getAllProducts();
  }

  return (
    <div className="row">
      <div className={cls(styles.shopListing, 'col-lg-12')}>
        <div className="row">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href={'/wholesale-shop'}>Shop</Link>
              </li>
              <li className="breadcrumb-item text-capitalize">
                <Link href={`/wholesale-shop/${params.dept}`}>{params.dept}</Link>
              </li>
              {params.category && 
                <li className="breadcrumb-item text-capitalize">
                  <Link href={`/wholesale-shop/${params.dept}/${params.category}`}>{(params.category).toString().replace('-', ' ')}</Link>
                </li>
              }
            </ol>
          </nav>
          <h1 className="text-center mb-4">Wholesale Shop</h1>
          { products && products.map((product, index) => {
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
            )
          })}
          {products?.length === 0 &&
            <h6 className="text-center text-danger mb-5 mt-5">No Product Found</h6>
          }
        </div>
      </div>
    </div>
  )
}

export default ShopComp;