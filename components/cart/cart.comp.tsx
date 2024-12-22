import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { ICart } from "../../models/cart.model";
import axiosInstance from "../../interceptors/axios.interceptor";
import { ADD_TO_CART, basePath, CART_API, GET_CART_DETAILS } from "../../endpoints";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter, usePathname, useSearchParams } from "next/navigation";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getUserSessionData, checkUserSession } from "../../services/auth.service";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";

const CartComp: FC = () => {
  const [cartDetails, setCartDetails, cartDetailsRef] = useState<ICart[]>();
  const { register, handleSubmit, getValues, setValue, setError, watch, formState: { errors }} = useForm({ criteriaMode: 'all'});
  const [editCartDialogOpen, setEditCartDialogOpen] = useState(false);
  const [deleteCartDialogOpen, setDeleteCartDialogOpen] = useState(false);
  // const [totalAmount, setTotalAmount, totalAmountRef] = useState(0);

  const params        = useParams();
  const path          = usePathname();
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const userData      = getUserSessionData();
  const userSession   = checkUserSession();

  const openEditCartDialog = (cart_id, user_id, sizes, quantity, instructions, document_link, amount) => {
    setValue('cart_id', cart_id);
    setValue('user_id', user_id);
    setValue('instructions', instructions);
    setValue('document_link', document_link);
    setValue('cart_amount', amount);
    sizes = sizes.split(',')
    quantity = quantity.split(',')
    for(let i=0; i< sizes.length; i++){
      for(let j=0; j< quantity.length; j++){
        setValue(`cart_sizes[${i}]`, sizes[i])
        setValue(`quantity[${j}]`, quantity[j])
      }
    }
    setEditCartDialogOpen(true);
  };

  const closeEditCartDialog = () => {setEditCartDialogOpen(false)};
  const openDeleteCartDialog = () => {setDeleteCartDialogOpen(true)};
  const closeDeleteCartDialog = () => {setDeleteCartDialogOpen(false)};

  useEffect(() => {
    if(userSession){
      getCartDetails();
    } else {
      router.push('/login?next=/cart')
    }
  }, [])

  const deleteCartItem = async(cart_id) => {
    await axiosInstance({
      method: 'delete',
      url: `${CART_API}/${cart_id}`
    }).then(res => {
      setDeleteCartDialogOpen(false);
      toast.success(res.data.message)
      getCartDetails();
    }).catch((err) => {
      console.log(err);
    })
  };

  const onSubmit = async(formData:any) => {
    // const data = {
    //   ...formData,
    //   // user_id: userData.user_id,
    //   // amount: totalAmountRef.current
    // }
    calculateTotalAmount(formData.quantity, formData.price);
    await axiosInstance({
      method: "post",
      url: `${CART_API}/${formData.cart_id}`,
      data: formData
    }).then(res => {
      if(res.data.type === 'success') {
        closeEditCartDialog();
        toast.success(res.data.message);
        getCartDetails();
      }
    }).catch(err =>{
      console.log(err);
    })
  }

  const calculateTotalAmount = (quantity:string[], price) => {
    const totalQuantity = quantity.reduce((a, b) => Number(a)+Number(b), 0);
    // setTotalAmount(Number((totalQuantity * Number(price)).toFixed(2)));
    let totalAmount = (Number((totalQuantity * Number(price)).toFixed(2)));
    setValue('cart_amount', totalAmount);
  }

  const getCartDetails = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_CART_DETAILS}?user_id=${userData.user_id}`
    }).then(res => {
      setCartDetails(res.data);
    })
  }

  return (
    <div className="page-content">
      <div className="row justify-content-center">
      <div className="col-lg-9 col-12">
      { cartDetails && cartDetails.length > 0 &&
        <>
        <h1 className="text-center mb-5">Cart Details</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="col">Article#</th>
              <th className="col">Details</th>
              <th className="col">Sizes</th>
              <th className="col">Quantity</th>
              <th className="col">Amount</th>
              <th className="col">Actions</th>
            </tr>
          </thead>
          {cartDetails.map((cart, index) => {
            return (
                <>
                  <tbody>
                    <tr>
                      <td>{cart.article_no}</td>
                      <td>{cart.slug}</td>
                      <td><span>{cart.cart_sizes}</span></td>
                      <td><span>{cart.quantity}</span></td>
                      <td>${parseInt(cart.amount).toFixed(2)}</td>
                      <td>
                        <div className="row">
                          <button type="button" className="btn col-6" 
                            onClick={() => 
                              openEditCartDialog(cart.cart_id, cart.user_id, cart.cart_sizes, cart.quantity, cart.instructions, cart.document_link, cart.amount)}>
                            <FontAwesomeIcon icon={faEdit} className="fas fa-edit" />
                          </button>
                          <button type="button" className="btn col-6" onClick={openDeleteCartDialog}>
                            <FontAwesomeIcon icon={faTrash} className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <Dialog onClose={closeEditCartDialog} aria-labelledby="customized-dialog-title" open={editCartDialogOpen}>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Edit Cart Item</DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={closeEditCartDialog}
                      sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                      })}>
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
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
                              onKeyUp={() => {calculateTotalAmount(getValues('quantity'), cart.price)}} 
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
                              onKeyUp={() => {calculateTotalAmount(getValues('quantity'), cart.price)}}
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
                              onKeyUp={() => {calculateTotalAmount(getValues('quantity'), cart.price)}}  
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
                              onKeyUp={() => {calculateTotalAmount(getValues('quantity'), cart.price)}}  
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
                          <span>Total Amount: $</span>
                          <input type="text" className="border-none" disabled {...register('cart_amount')} />
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button type="submit" variant="contained">Update Cart</Button>
                    </DialogActions>
                    </form>
                  </Dialog>
                  <Dialog onClose={closeDeleteCartDialog} aria-labelledby="customized-dialog-title" open={deleteCartDialogOpen}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Delete Cart Item</DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={closeEditCartDialog}
                      sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                      })}>
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <p>Are you sure you want to delete this cart item?</p>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="contained" color="error" onClick={()=> deleteCartItem(cart.cart_id)}>Delete</Button>
                    </DialogActions>
                  </Dialog>
                </>
              )
            })}
          </table>
          <div className="mb-5 justify-content-end d-flex">
            <Link href={'/'} className="btn btn-link">Continue Shopping</Link>
            <Link href={'/checkout'} className="btn btn-success">Checkout </Link>
          </div>
        </>
        }
        {cartDetails && cartDetails.length === 0 && 
          <h2 className="text-danger text-center mt-5 mb-5">No item found in cart</h2>
        }
      </div>
      <ToastContainer />
      </div>
    </div>
  )
}

export default CartComp;