import { FC, useCallback, useEffect, useState } from "react"
import cls from 'classnames'
import styles from './shop.module.css'
import axios from "axios"
import { basePath, PRODUCT_API } from "../endpoints"
import { IProduct } from "../models"
import { useForm } from 'react-hook-form'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductFiltersComp : FC = (props:any) => {
  const [products, setProducts] = useState<IProduct[]>(props.data);
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  const router = useRouter();
  // const { query, isReady } = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log(props.params.dept, props.params.category);
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

  useEffect(() => {
    getAllProducts();
  }, [])

  const getAllProducts = () => {
    axios.get(`${PRODUCT_API}/men/jeans-pant`).then(res => {
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
        <div className="col-lg-2">
          <h2>Filters</h2>
          <form className="product-filters">
            <div className="mb-3">
              <label htmlFor="category">Category</label>
              <select {...register('category', { required: true })} onChange={(e) => setFiltersData('category', e)}>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="boys">Boys</option>
                <option value="gitls">Girls</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="type">Type</label>
              <select {...register('type', { required: true })} onChange={(e) => setFiltersData('type', e)}>
                <option value="jeans-pant">Jeans Pant</option>
                <option value="chino-pant">Chino Pant</option>
                <option value="cargo-trouser">Cargo Trouser</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fitting">Fitting</label>
              <select {...register('fitting', { required: true })} onChange={(e) => setFiltersData('fitting', e)}>
                <option value="slim">Slim</option>
                <option value="straight">Straight</option>
                <option value="skinny">Skinny</option>
                <option value="ankle">Ankle</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="colors">Colors</label>
              <select {...register('colors', { required: true })} onChange={(e) => setFiltersData('colors', e)}>
                <option value="blue">Blue</option>
                <option value="mid-blue">Mid Blue</option>
                <option value="navy-blue">Navy Blue</option>
                <option value="black">Black</option>
                <option value="jet-black">Jet Black</option>
              </select>
            </div>
            <div className="mb-3">
              <h5>Washes</h5>
              <label htmlFor="destroyed"><input type="checkbox" id="destroyed" {...register('washes', { required: true })} /> Destroyed</label>
              <label htmlFor="ripped"><input type="checkbox" id="ripped" {...register('washes', { required: true })} /> Ripped</label>
              <label htmlFor="silicone"><input type="checkbox" id="silicone" {...register('washes', { required: true })} /> Silicone</label>
            </div>
          </form>
        </div>
      </div>
  )
}

export default ProductFiltersComp;