"use client";
import { FC, useEffect } from "react"
import useState from 'react-usestateref'
import { PRODUCT_API, basePath, ADD_TO_CART, GET_PRODUCT_DETAILS } from "../../endpoints"
import { IProduct } from "../../models"
import axiosInstance from "../../interceptors/axios.interceptor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { checkUserSession, getUserSessionData } from '../../services/auth.service';
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ErrorMessage } from "@hookform/error-message"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetails : FC = () => {
  type FormInputs = {
    p_id:string,
    cart_sizes: string[],
    quantity: string[],
    price: number,
    instructions: string,
    document_link: string
  }
  const [productDetails, setproductDetails, productDetailsRef] = useState<IProduct[]>([]);
  const { register, handleSubmit, getValues, setValue, setError, watch, formState: { errors }} = useForm<FormInputs>({ criteriaMode: 'all'});
  const [totalAmount, setTotalAmount, totalAmountRef] = useState(0);
  const [open, setOpen] = useState(false);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const params = useParams();
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const userData = getUserSessionData();
  const userSession = checkUserSession();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProductDetails();
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
    const data = {
      ...formData,
      user_id: userData.user_id,
      cart_amount: totalAmountRef.current
    }
    calculateTotalAmount(formData.quantity, productDetailsRef.current[0].price);
    const res = await axiosInstance({
      method: "post",
      url: ADD_TO_CART,
      data: data
    }).then(res => {
      if(res.data.type === 'success') {
        toast.success('Item Added to cart');
        setTimeout(()=> {
          router.push(`${basePath}/${params.dept}/${params.category}`);
        },2000)
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
    <div className="mb-5 page-content" key={1}>
      {productDetails && productDetails.map((product, index) => {
        setValue('p_id', product.p_id);
        setValue('price', product.price);
        return (
          <div key={2}>
            <div className="mb-5" key={index}>
              <nav aria-label="breadcrumb" className="mb-5 px-4">
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
                      <span className="col-6 col-md-8 col-lg-9">{product.p_sizes}</span>
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
                    {userSession &&
                      <Button variant="contained" onClick={handleClickOpen}>Order Now</Button>
                    }
                    {!userSession &&
                     <Link href={`/login?next=${params.dept}/${params.category}/${params.id}`} className="btn btn-primary">Order Now </Link>
                    }
                  </div>
                </div>
              </div>
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Enter Details</DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}>
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                  <div className="modal-body">
                    <ul className="p-0">
                      <li className="row mb-2">
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="form-control" 
                            {...register('cart_sizes.0', { required: "Required"})} 
                            placeholder="Size" />
                            <ErrorMessage errors={errors} name="cart_sizes.0" as={<small className="text-small text-danger"></small>} />
                        </div>
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="col-9 form-control" 
                            {...register('quantity.0', { required: 'Required'})}
                            onKeyUp={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}} 
                            placeholder="Quantity" />
                            <ErrorMessage errors={errors} name="quantity.0" as={<small className="text-danger"></small>} />
                        </div>
                      </li>
                      <li className="row mb-2">
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="form-control" 
                            {...register('cart_sizes.1', { required: 'Required'})}
                            placeholder="Size" />
                            <ErrorMessage errors={errors} name="cart_sizes.1" as={<small className="text-danger"></small>} />
                        </div>
                        <div className="col-6">
                          <input 
                            type="number"
                            className="col-9 form-control"
                            {...register('quantity.1', { required: 'Required'})} 
                            onKeyUp={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}}
                            placeholder="Quantity" />
                            <ErrorMessage errors={errors} name="quantity.1" as={<small className="text-danger"></small>} />
                        </div>
                      </li>
                      <li className="row mb-2">
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="form-control" 
                            {...register('cart_sizes.2', { required: 'Required'})} 
                            placeholder="Size" />
                            <ErrorMessage errors={errors} name="cart_sizes.2" as={<small className="text-danger"></small>} />
                        </div>
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="col-9 form-control" 
                            {...register('quantity.2', { required: 'Required'})}
                            onKeyUp={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}}  
                            placeholder="Quantity" />
                            <ErrorMessage errors={errors} name="quantity.2" as={<small className="text-danger"></small>} />
                        </div>
                      </li>
                      <li className="row mb-2">
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="form-control" 
                            {...register('cart_sizes.3', { required: 'Required'})} 
                            placeholder="Size" />
                            <ErrorMessage errors={errors} name="cart_sizes.3" as={<small className="text-danger"></small>} />
                        </div>
                        <div className="col-6">
                          <input 
                            type="number" 
                            className="col-9 form-control" 
                            {...register('quantity.3', { required: 'Required'})}
                            onKeyUp={() => {calculateTotalAmount(getValues('quantity'), productDetails[0].price)}}  
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
                        <input type="text" placeholder="optional" className="form-control" {...register('document_link')} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <h4>Total Amount: ${totalAmount}</h4>
                      </div>
                    </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button type="submit" variant="contained">Add to Cart</Button>
              </DialogActions>
                </form>
            </Dialog>
          </div>
        )})}
      <ToastContainer />
    </div>
  )
}

export default ProductDetails;
