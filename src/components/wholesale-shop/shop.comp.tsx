"use client";
import { FC, useEffect, useState } from "react"
import cls from 'classnames'
import styles from './shop.module.css'
import { PRODUCT_API, PRODUCT_COUNT_BY_DEPT_CATEGORY, WHOLESALE_SHOP } from "../../endpoints"
import { IProduct } from "../../models"
import { useParams } from "next/navigation";
import axiosInstance from "../../interceptors/axios.interceptor"
import Link from "next/link";
import { ICategory } from "../../models/category.model";

const ShopComp : FC = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [countByDeptCategories, setCountByDeptCategories] = useState<ICategory[]>();
  const params = useParams();

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
                  <Link 
                    href={`${WHOLESALE_SHOP}/${params.dept}/${params.category}`}>
                      {(params.category).toString().replace('-', ' ')}
                  </Link>
                </li>
              }
            </ol>
          </nav>
          <div className="products-outer">
            <div className="products">
              <div className="boxes">
                {countByDeptCategories && countByDeptCategories.length > 0 &&
                  <ul className="product-categories-pills mb-5">
                  {countByDeptCategories.map((category, index) => {
                    return (
                      <li className="mx-2 px-3" key={index}>
                        <Link className="text-capitalize" href={'/wholesale-shop/'+params.dept+'/'+category['category']}>
                        {category['category'].replace("-", " ")+'s'} ({ category['count']})
                        </Link>
                      </li>
                    )
                  })}
                  </ul>
                }
                {products && products.map((product, index) => {
                  return (
                    <div className="box mb-5" key={index}>
                      <Link href={`${WHOLESALE_SHOP}/${product.dept}/${product.category}/${product.slug}-${product.article_no}`} className="d-block" rel="noreferrer">
                        <img
                          src={product.image_front} 
                          alt={product.image_front}
                          height="370"
                          className={styles.img} />
                      </Link>
                      <Link href={`${WHOLESALE_SHOP}/${product.dept}/${product.category}/${product.slug}-${product.article_no}`} className="text-capitalize d-block pt-3 px-3 text-dark">
                        <span>{product.article_no}-</span>
                        <span>{product.product_name}</span><br />
                        <span className="text-danger">Price: ${product.price}</span>
                      </Link>
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