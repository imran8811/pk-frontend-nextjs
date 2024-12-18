"use client";
import { FC, useEffect } from "react"
import useState from 'react-usestateref'
import { PRODUCT_API, basePath, ADD_TO_CART, GET_PRODUCT_DETAILS } from "../../endpoints"
import { IProduct } from "../../models"
import axiosInstance from "../../interceptors/axios.interceptor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { checkUserSession, getUserSessionData } from '../../services/auth.service';
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ErrorMessage } from "@hookform/error-message"
import { USER_TYPES } from "../../constants";

const ProductDetails : FC = () => {
  type FormInputs = {
    productId:string,
    sizes: string[],
    quantity: string[],
    instructions: string,
    documentLink: string
  }
  const [productDetails, setproductDetails, productDetailsRef] = useState<IProduct[]>([]);
  const { register, handleSubmit, getValues, setValue, setError, watch, formState: { errors }} = useForm<FormInputs>({ criteriaMode: 'all'});
  const [totalAmount, setTotalAmount, totalAmountRef] = useState(0);
  
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    getProductDetails();
    console.log(searchParams.get('mode'));
  }, [])

  const getProductDetails = async () => {
    const res = await axiosInstance({
      method: "get",
      url: GET_PRODUCT_DETAILS+"/"+params.id,
    }).then(res => {
      setproductDetails(res.data);
    })
  }

  const onSubmit = async(formData:any) => {
    let userId;
    // userData = '';
    // if (typeof localStorage !== 'undefined') {
    //   userData = JSON.parse(localStorage.getItem('userData')!);
    // }
    // if(!userData || userData.userId === ''){
    //   userId = crypto.randomUUID();
    // } else {
    //   userId = userData.userId
    // }
    if(checkUserSession()){
      userId = userData.userId
    } else {
      userId = crypto.randomUUID();
    }
    const data = {
      productId: formData.productId,
      userId: userId,
      sizes: formData.sizes,
      quantity: formData.quantity,
      instructions: formData.instructions,
      amount: totalAmountRef.current,
      productDetails: [],
      documentLink: formData.documentLink
    }
    calculateTotalAmount(formData.quantity, productDetailsRef.current[0].price);
    const res = await axiosInstance({
      method: "post",
      url: `${ADD_TO_CART}`,
      data: data
    }).then(res => {
      if(res.data.type === 'success') {
        toast.success('Item Added to cart');
        if (typeof localStorage !== 'undefined') {
          if(!checkUserSession()){
            const userData = {
              userId: userId,
              userType: USER_TYPES.GUEST
            }
            localStorage.setItem('userData', JSON.stringify(userData));
          }
          router.push('/cart')
        }
      }
    }).catch(err =>{
      if(err.response.data.errorCode === 960){
        toast.error('Item already exist in cart')
      };
    })
  }

  const calculateTotalAmount = (quantity:string[], price) => {
    const totalQuantity = quantity.reduce((a, b) => Number(a)+Number(b), 0);
    setTotalAmount(Number((totalQuantity * Number(price)).toFixed(2)));
  }

  return (
    <div className="mb-5">
      {productDetails && productDetails.map((product, index) => {
        setValue('productId', product.p_id);
        return (
          <>
            <div className="mb-5" key={index}>
              <nav aria-label="breadcrumb" className="mt-4 mb-5 px-4">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href={'/'}>Shop</Link></li>
                  <li className="breadcrumb-item text-capitalize"><Link href={`/${params.dept}`}>{params.dept}</Link></li>
                  <li className="breadcrumb-item text-capitalize"><Link href={`/${params.dept}/${params.category}`}>{(params.category).toString().replace('-', ' ')}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{product.article_no}</li>
                </ol>
              </nav>
              <div className="row px-3">
                <div className="col-md-6 mb-4">
                  <Carousel>
                    <div>
                      <img src={product.image_front} alt={product.image_front} />
                    </div>
                    <div>
                      <img src={product.image_back} alt={product.image_back} />
                    </div>
                    <div>
                      <img src={product.image_side} alt={product.image_side} />
                    </div>
                    <div>
                      <img src={product.image_other_one} alt={product.image_other_one} />
                    </div>
                    <div>
                      <img src={product.image_other_two} alt={product.image_other_two} />
                    </div>
                  </Carousel>
                </div>
                <div className="col-md-6">
                  <h1 className="mb-3 border-bottom">{product.slug}</h1>
                  <ul className="mb-5 p-0">
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Article No.</span>
                      <span className="col-6 col-md-8 col-lg-9">{product.article_no}</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Fabric Details</span>
                      <span className="col-6 col-md-8 col-lg-9">{product.fabric + " " + product.fabric_weight}</span>
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
                      <span className="col-6 col-md-8 col-lg-9">{product.wash_type}</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Category</span>
                      <span className="col-6  col-md-8 col-lg-9 text-capitalize">{product.category}</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Front Fly</span>
                      <span className="col-6  col-md-8 col-lg-9 text-capitalize">Zip</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Delivery</span>
                      <span className="col-6 col-md-8 col-lg-9">30 days</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">MOQ</span>
                      <span className="col-6 col-md-8 col-lg-9">{product.moq} Pieces</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Price</span>
                      <span className="col-6 col-md-8 col-lg-9">${product.price} Ex-factory</span>
                    </li>
                  </ul>
                  <h4 className="mb-4">Packing / Shipping</h4>
                  <ul className="px-0 pb-3 mb-3 border-bottom">
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Weight per piece:</span>
                      <span className="col-6 col-md-4 col-lg-3">{product.piece_weight} grams</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Packing Assortment</span>
                      <span className="col-6 col-md-4 col-lg-3">Size wise</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3"></span>
                      <span className="col-6 col-md-4 col-lg-3">10 pieces in Blister</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3"></span>
                      <span className="col-6 col-md-4 col-lg-3">6 blister in single carton</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Carton Dimensions:</span>
                      <span className="col-6 col-md-4 col-lg-3">24&quot; x 24&quot; x 40&quot;</span>
                    </li>
                    <li className="row mb-2">
                      <span className="col-6 col-md-4 col-lg-3">Shipping:</span>
                      <span className="col-6 col-md-4 col-lg-3">By Air</span>
                    </li>
                  </ul>
                  <div className="add-cart-wrap d-flex justify-content-end">
                    <button 
                      type="button" 
                      data-bs-toggle="modal" 
                      data-bs-target="#staticBackdrop" 
                      className="btn btn-primary">Order Now</button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div 
              className="modal" 
              id="staticBackdrop" 
              data-bs-backdrop="static" 
              data-bs-keyboard="false" 
              tab-index="-1" 
              aria-labelledby="staticBackdropLabel" 
              aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Enter Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="modal-body">
                      <ul className="p-0">
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
                        <li className="row mb-2">
                          <div className="col-6">
                            <input 
                              type="number" 
                              className="form-control" 
                              {...register('sizes.3', { required: 'Required'})} 
                              placeholder="Size" />
                              <ErrorMessage errors={errors} name="sizes.3" as={<small className="text-danger"></small>} />
                          </div>
                          <div className="col-6">
                            <input 
                              type="number" 
                              className="col-9 form-control" 
                              {...register('quantity.3', { required: 'Required'})}
                              onBlur={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}}  
                              placeholder="Quantity" />
                              <ErrorMessage errors={errors} name="quantity.3" as={<small className="text-danger"></small>} />
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
                        <div>
                          <small>Upload documents (custom design, measurement chart etc.) to any online storage and share link below</small>
                        </div>
                        <div className="col-12 mb-3">
                          <input type="text" className="form-control" {...register('documentLink')} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <h4>Total Amount: ${totalAmount}</h4>
                        </div>
                      </div>
                  </div>
                  <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    <button type="submit" className="btn btn-primary">Add to Cart</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )})}
      <ToastContainer />
    </div>
  )
}

export default ProductDetails;
