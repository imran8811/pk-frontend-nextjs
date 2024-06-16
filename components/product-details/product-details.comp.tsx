"use client";
import { FC, useEffect } from "react"
import useState from 'react-usestateref'
import { PRODUCT_API, basePath, ADD_TO_CART } from "../../endpoints"
import { IProduct } from "../../models"
import axiosInstance from "../../interceptors/axios.interceptor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { CheckUserSession } from '../../services/auth.service';
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ErrorMessage } from "@hookform/error-message"

const ProductDetails : FC = () => {
  type FormInputs = {
    productId:string,
    sizes: string[],
    quantity: string[],
    instructions: string
  }
  const [productDetails, setproductDetails, productDetailsRef] = useState<IProduct[]>([]);
  const [totalAmount, setTotalAmount, totalAmountRef] = useState<number>(0);
  const { register, handleSubmit, getValues, setValue, setError, watch, formState: { errors }} = useForm<FormInputs>({ criteriaMode: 'all'});
  const params = useParams();
  const router = useRouter();
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    getProductDetails();
  }, [])

  const getProductDetails = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${PRODUCT_API}/${params.dept}/${params.category}/${params.id}`
    }).then(res => {
      setproductDetails(res.data);
    })
  }

  const onSubmit = async(formData:any) => {
    if(!CheckUserSession()){
      sessionStorage.setItem('nextRoute', `/wholesale-shop/${productDetails[0].dept}/${productDetails[0].category}/${productDetails[0]._id}`);
      sessionStorage.setItem('nextAction', `addToCart`);
      router.push('/login');
      return;
    }
    
    const data = {
      productId: formData.productId,
      userId: userData.userId,
      sizes: formData.sizes,
      quantity: formData.quantity,
      instructions: formData.instructions,
      amount: totalAmountRef.current,
      productDetails: []
    }
    calculateTotalAmount(formData.quantity, productDetailsRef.current[0].price);
    const res = await axiosInstance({
      method: "post",
      url: `${ADD_TO_CART}`,
      data: data
    }).then(res => {
      if(res.data.type === 'success') {
        toast.success('Item Added to cart');
      }
    }).catch(err =>{
      if(err.response.data.errorCode === 960){
        toast.error('Item already exist in cart')
      };
    })
  }

  const calculateTotalAmount = (quantity:string[], price) => {
    const totalQuantity = quantity.reduce((a, b) => Number(a)+Number(b), 0);
    setTotalAmount(totalQuantity * Number(price));
  }

  return (
    <div className="mb-5">
      {productDetails && productDetails.map((product, index) => {
        setValue('productId', product._id);
        return (
          <>
            <div className="row mb-5" key={index}>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href={'/wholesale-shop'}>Shop</Link></li>
                  <li className="breadcrumb-item text-capitalize"><Link href={`/wholesale-shop/${params.dept}`}>{params.dept}</Link></li>
                  <li className="breadcrumb-item text-capitalize"><Link href={`/wholesale-shop/${params.dept}/${params.category}`}>{(params.category).toString().replace('-', ' ')}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{product.articleNo}</li>
                </ol>
              </nav>
              <h1 className="text-center mb-5">{product.slug}</h1>
              <div className="col-md-6">
                <Carousel>
                  <div>
                    <img src={product.productImages.frontImgUrl} alt={product.productImages.frontImgUrl} />
                  </div>
                  <div>
                    <img src={product.productImages.backImgUrl} alt={product.productImages.backImgUrl} />
                  </div>
                  <div>
                    <img src={product.productImages.other1ImgUrl} alt={product.productImages.other1ImgUrl} />
                  </div>
                  <div>
                    <img src={product.productImages.other2ImgUrl} alt={product.productImages.other2ImgUrl} />
                  </div>
                  <div>
                    <img src={product.productImages.other3ImgUrl} alt={product.productImages.other3ImgUrl} />
                  </div>
                </Carousel>
              </div>
              <div className="col-md-6 ps-2">
                <div className="product-min-details">
                  <span>Price: ${product.price} |  </span> 
                  <span>Fabric: {product.fabricWeight}Ounce  |  </span>
                  <span>Contents: {product.fabric} </span>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <ul>
                    <li className="mb-2">Order Quantity</li>
                    <li className="row mb-2">
                      <div className="col-6">
                        <input 
                          type="number" 
                          className="form-control" 
                          {...register('sizes.0', { required: "Required"})} 
                          placeholder="Size" />
                          <ErrorMessage errors={errors} name="sizes.0" as={<small className="text-small text-danger"></small>} />
                      </div>
                      <div className="col-6">
                        <input 
                          type="number" 
                          className="col-9 form-control" 
                          {...register('quantity.0', { required: 'Required'})}
                          onBlur={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}} 
                          placeholder="Quantity" />
                          <ErrorMessage errors={errors} name="quantity.0" as={<small className="text-danger"></small>} />
                      </div>
                    </li>
                    <li className="row mb-2">
                      <div className="col-6">
                        <input 
                          type="number" 
                          className="form-control" 
                          {...register('sizes.1', { required: 'Required'})}
                          placeholder="Size" />
                          <ErrorMessage errors={errors} name="sizes.1" as={<small className="text-danger"></small>} />
                      </div>
                      <div className="col-6">
                        <input 
                          type="number"
                          className="col-9 form-control"
                          {...register('quantity.1', { required: 'Required'})} 
                          onBlur={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}}
                          placeholder="Quantity" />
                          <ErrorMessage errors={errors} name="quantity.1" as={<small className="text-danger"></small>} />
                      </div>
                    </li>
                    <li className="row mb-2">
                      <div className="col-6">
                        <input 
                          type="number" 
                          className="form-control" 
                          {...register('sizes.2', { required: 'Required'})} 
                          placeholder="Size" />
                          <ErrorMessage errors={errors} name="sizes.2" as={<small className="text-danger"></small>} />
                      </div>
                      <div className="col-6">
                        <input 
                          type="number" 
                          className="col-9 form-control" 
                          {...register('quantity.2', { required: 'Required'})}
                          onBlur={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}}  
                          placeholder="Quantity" />
                          <ErrorMessage errors={errors} name="quantity.2" as={<small className="text-danger"></small>} />
                      </div>
                    </li>
                  </ul>
                  <div className="order-instructions mb-3">
                    <textarea 
                      rows={5} 
                      placeholder="Instructions" 
                      {...register('instructions', { required: 'Required'})} 
                      className="form-control">
                      </textarea>
                    <ErrorMessage errors={errors} name="instructions" as={<small className="text-danger"></small>} />
                  </div>
                  <div className="order-uploads mb-3">
                    <label htmlFor="order-uploads">Uploads</label>
                    <div className="col-12 mb-3">
                      <input type="file" className="form-control" />
                      <small>(Custom design, measurement chart etc.)</small>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      <button type="submit" className="btn btn-success text-right">Add to cart</button>
                    </div>
                    <div className="col-6 text-end">
                      <p>Amount: $ {totalAmount}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="product-tabs">
              <Tabs>
                <TabList>
                  <Tab>Details</Tab>
                  <Tab>Packing</Tab>
                  <Tab>Reviews (0)</Tab>
                </TabList>
                <TabPanel>
                  <div className="details-wrap p-3">
                    <div className="row">
                      <div className="col-md-8 col-12 ps-2">
                        <ul>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Article No.</span>
                            <span className="col-6 col-md-8 col-lg-9">{product.articleNo}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Fabric Details</span>
                            <span className="col-6 col-md-8 col-lg-9">{product.fabricWeight + ' Ounce - ' + product.fabric}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Colors</span>
                            <span className="col-6 col-md-8 col-lg-9">{product.color}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Waist Sizes</span>
                            <span className="col-6 col-md-8 col-lg-9">{product.sizes}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Wash Type</span>
                            <span className="col-6 col-md-8 col-lg-9">{product.washType}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Category</span>
                            <span className="col-6  col-md-8 col-lg-9 text-capitalize">{product.category}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Shipping</span>
                            <span className="col-6 col-md-8 col-lg-9">By Air, Sea, DHL etc</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Delivery</span>
                            <span className="col-6 col-md-8 col-lg-9">30 days</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">MOQ</span>
                            <span className="col-6 col-md-8 col-lg-9">{product.moq}</span>
                          </li>
                          <li className="row mb-2">
                            <span className="col-6 col-md-4 col-lg-3">Price</span>
                            <span className="col-6 col-md-8 col-lg-9">${product.price}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Packing Details:</h2>
                  <ul>
                    <li>
                      <ul>
                        <li>Packing size wise</li>
                        <li>10 pieces in Blister</li>
                        <li>6 blister in single carton</li>
                      </ul>
                    </li>
                    <li>
                      <span>Carton Dimensions</span>
                      <span>24 x 24 x 40</span>
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel>
                  <h2>Reviews</h2>
                </TabPanel>
              </Tabs>
              </div>
            </div>
          </>
        )})}
      <ToastContainer />
    </div>
  )
}

export default ProductDetails;
