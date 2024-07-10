import { FC, useCallback, useEffect } from "react";
import useState from 'react-usestateref'
import cls from 'classnames'
import styles from './shop.module.css'
import axios from "axios"
import { basePath, PRODUCT_API } from "../endpoints"
import { IProduct } from "../models"
import { useForm } from 'react-hook-form'
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductFiltersComp : FC = (props:any) => {
  const [products, setProducts] = useState<IProduct[]>(props.data);
  const { register, handleSubmit, getValues, watch, formState: { errors }} = useForm();
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])
  
  const [filterDept, setFilterDept, filterDeptRef] = useState(params.dept? params.dept : searchParams.get('dept')? searchParams.get('dept') : '')
  const [filterCategory, setFilterCategory, filterCategoryRef] = useState(params.category? params.category : searchParams.get('category')? searchParams.get('category') : '');
  const [filterFitting, setFilterFitting, filterFittingRef] = useState(searchParams.get('fitting')? searchParams.get('fitting') : '');

  const onFilterDeptOptionChange = (e) => {
    setFilterDept(e.target.value)
    setFiltersData('dept', e.target.value)
  }
  const onFilterCategoryOptionChange = (e) => {
    setFilterCategory(e.target.value)
    filterDeptRef.current === ''? setFilterDept('men') : filterDeptRef.current;
    setFiltersData('category', e.target.value)
  }

  const setFiltersData = (filterType, value) => {
    console.log(filterType, value);
    if(value === '') {
      delete searchParams.get[filterType]
      router.push(pathname + '?' + createQueryString(filterType, value), { scroll: false });
    } else {
      searchParams.set[filterType] = value
      router.push(pathname + '?' + createQueryString(filterType, value), { scroll: false });
    }
  }

  return (
    <>
      {/* <h2>Filters</h2> */}
      <form className="product-filters">
        <div className="filter-wrap">
          <h5 className="text-primary">Department</h5>
          <div className="p-2">
            <label htmlFor="men" className="radio-input"> 
              <input 
                type="radio" 
                name="filterDept" 
                value="men" 
                id="men" 
                checked={filterDept==='men'} 
                onChange={onFilterDeptOptionChange} />  Men
            </label> 
            <label htmlFor="women" className="radio-input"> 
              <input 
                type="radio" 
                name="filterDept" 
                value="women" 
                id="women" 
                checked={filterDept==='women'}
                onChange={onFilterDeptOptionChange} /> Women
            </label>
            <label htmlFor="boys" className="radio-input"> 
              <input 
                type="radio" 
                name="filterDept" 
                value="boys" 
                id="boys" 
                checked={filterDept==='boys'} 
                onChange={onFilterDeptOptionChange} /> Boys
            </label>
            <label htmlFor="girls" className="radio-input">
              <input 
                type="radio" 
                name="filterDept" 
                value="girls" 
                id="girls" 
                checked={filterDept==='girls'} 
                onChange={onFilterDeptOptionChange} /> Girls
            </label>
          </div>
        </div>
        <div className="filter-wrap">
          <h5 className="text-primary">Category</h5>
          <div className="p-2">
            <label htmlFor="jeans-pant" className="radio-input"> 
              <input 
                type="radio" 
                name="filterCategory" 
                value="jeans-pant" 
                id="jeans-pant" 
                checked={filterCategory==='jeans-pant'} 
                onChange={onFilterCategoryOptionChange} />  Jeans Pants
            </label> 
            <label htmlFor="chino-pant" className="radio-input"> 
              <input 
                type="radio" 
                name="filterCategory" 
                value="chino-pant" 
                id="chino-pant" 
                checked={filterCategory==='chino-pant'} 
                onChange={onFilterCategoryOptionChange} />  Chino Pants
            </label>
            <label htmlFor="cargo-trouser" className="radio-input"> 
              <input 
                type="radio" 
                name="filterCategory"
                value="cargo-trouser" 
                id="cargo-trouser" 
                checked={filterCategory==='cargo-trouser'} 
                onChange={onFilterCategoryOptionChange} />  Cargo Trousers
            </label>
            <label htmlFor="biker-jeans" className="radio-input"> 
              <input 
                type="radio" 
                name="filterCategory"
                value="biker-jeans" 
                id="biker-jeans" 
                checked={filterCategory==='biker-jeans'} 
                onChange={onFilterCategoryOptionChange} />  Biker Jeans
            </label>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="text-primary">Fitting</h5>
          <select className="select-input" onChange={(e) => setFiltersData('fitting', e)}>
            <option value="slim">Slim</option>
            <option value="straight">Straight</option>
            <option value="skinny">Skinny</option>
            <option value="ankle">Ankle</option>
          </select>
        </div>
        <div className="mb-3">
          <h5 className="text-primary">Colors</h5>
          <select className="select-input" onChange={(e) => setFiltersData('colors', e)}>
            <option value="">All</option>
            <option value="blue">Blue</option>
            <option value="mid-blue">Mid Blue</option>
            <option value="navy-blue">Navy Blue</option>
            <option value="black">Black</option>
            <option value="jet-black">Jet Black</option>
          </select>
        </div>
        <div className="mb-3">
          <h5 className="text-primary">Washes</h5>
          <label htmlFor="destroyed" className="radio-input">
            <input type="checkbox" id="destroyed" checked />  Destroyed
          </label>
          <label htmlFor="ripped" className="radio-input">
            <input type="checkbox" id="ripped"  checked /> Ripped
          </label>
          <label htmlFor="silicone" className="radio-input">
            <input type="checkbox" id="silicone"  checked /> Silicone
          </label>
        </div>
      </form>
    </>
  )
}

export default ProductFiltersComp;