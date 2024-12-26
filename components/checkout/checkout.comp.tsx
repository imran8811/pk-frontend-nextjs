import { FC, Fragment, useEffect, useRef } from "react";
import useState from 'react-usestateref'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import { ICart } from "../../models/cart.model";
import axiosInstance from "../../interceptors/axios.interceptor";
import { CART_API, GET_CART_DETAILS, ORDER_API, ORDER_PLACED, UPDATE_USER_ADDRESS, USER_ADDRESS } from "../../endpoints";
import styles from './checkout.module.css';
import cls from 'classnames';
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkUserSession, guestUserExist, getUserSessionData } from "../../services/auth.service";
import { IUserAddress } from "../../models";
import { ALLOWED_COUNTRIES, ORDER_STATUS } from "../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CheckoutComp: FC = () => {
  const [selectUserAddresses, setSelectUserAddresses, selectUserAddressesRef] = useState(0);
  const [userAddresses, setUserAddresses, userAddressesRef] = useState<IUserAddress[]>();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartDetails, setCartDetails, cartDetailsRef] = useState<ICart[]>([]);
  const [editCartDialogOpen, setEditCartDialogOpen] = useState(false);
  const [deleteCartDialogOpen, setDeleteCartDialogOpen] = useState(false);
  const [confirmOrderDialogOpen, setConfirmOrderDialogOpen] = useState(false);
  const [deleteAddressDialogOpen, setDeleteAddressDialogOpen] = useState(false);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [addressActionType, setAddressActionType, addressActionTypeRef] = useState('add');

  const {register, handleSubmit:handleSubmit, getValues, setValue, setError, formState: { errors }} = useForm({ criteriaMode: 'all'});
  const {register:register2, handleSubmit:handleSubmit2, getValues:getValuse2, setValue:setValue2, setError:setError2, reset:reset2, formState: { errors:errors2 }} = useForm({ criteriaMode: 'all'});

  const params        = useParams();
  const path          = usePathname();
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const userData      = getUserSessionData();
  const userSession   = checkUserSession();
  
  const closeEditCartDialog   = () => {setEditCartDialogOpen(false)};
  const openDeleteCartDialog  = () => {setDeleteCartDialogOpen(true)};
  const closeDeleteCartDialog = () => {setDeleteCartDialogOpen(false)};
  const openConfirmOrderDialog  = () => {setConfirmOrderDialogOpen(true)};
  const closeConfirmOrderDialog = () => {setConfirmOrderDialogOpen(false)};
  const openDeleteAddressDialog  = (add_id) => {
    setValue2('add_id', add_id);
    setDeleteAddressDialogOpen(true)
  };
  const closeDeleteAddressDialog = () => {setDeleteAddressDialogOpen(false)};
  const addressBtnRef = useRef<any>('')
  const openAddAddressDialog  = (actionType) => {
    setAddressActionType(actionType);
    setAddAddressOpen(true)
  };

  const closeAddAddressDialog = (actionType) => {
    reset2();
    setAddressActionType(actionType);
    setAddAddressOpen(false)
  };

  const [isActive, setActive] = useState(null);
  const toggle = (i) => {
    setActive(i);
  };

  useEffect(() => {
    if(userSession){
      getCartDetails();
      getUserAddresses();
    } else {
      router.push('/login?next=/checkout')
    }
  }, [])

  const openEditCartDialog = (cart_id, user_id, sizes, quantity, instructions, document_link, cart_amount) => {
    setValue('cart_id', cart_id);
    setValue('user_id', user_id);
    setValue('instructions', instructions);
    setValue('document_link', document_link);
    setValue('cart_amount', cart_amount);
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

  const editUserAddress = (add_id, add_country, add_state, add_city, add_area, add_postal_code, add_type) => {
    setAddressActionType('update');
    setValue2('add_id', Number(add_id));
    setValue2('add_country', add_country);
    setValue2('add_state', add_state);
    setValue2('add_city', add_city);
    setValue2('add_area', add_area);
    setValue2('add_postal_code', Number(add_postal_code));
    setValue2('add_type', add_type);
    openAddAddressDialog(addressActionTypeRef.current);
  };

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

  const deleteUserAddress = async() => {
    console.log('here');
    const addId = getValuse2('add_id');
    console.log(addId);
    await axiosInstance({
      method: 'delete',
      url: `${USER_ADDRESS}/${addId}`
    }).then(res => {
      toast.success(res.data.message)
      setDeleteAddressDialogOpen(false);
      getUserAddresses();
    }).catch((err) => {
      toast.error(err);
    })
  };

  const onSubmit = async(formData:any) => {
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

  const updateUserAddress = async(data:any) => {
    await axiosInstance({
      method: 'post',
      url: UPDATE_USER_ADDRESS,
      data: {
        ...data,
        user_id: userData.user_id
      },
    }).then(res => {
      if(res.data.type === 'success') {
        toast.success(res.data.message);
        closeAddAddressDialog('add');
        getUserAddresses();
        reset2()
      }
    }).catch(err =>{
      toast.error(err);
    })
  }

  const calculateTotalCartAmount = (quantity:string[], price) => {
    const totalQuantity = quantity.reduce((a, b) => Number(a)+Number(b), 0);
    let totalAmount = (Number((totalQuantity * Number(price)).toFixed(2)));
    setValue('cart_amount', totalAmount);
  }

  const getCartDetails = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_CART_DETAILS}?user_id=${userData.user_id}`
    }).then(res => {
      setCartDetails(res.data);
      calculateOrderAmountQuantity();
    })
  }

  const getUserAddresses = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${USER_ADDRESS}/${userData.user_id}`
    }).then(res => {``
      setUserAddresses(res.data.data);
    })
  }

  const addUserAddress = async(data:any) => {
    await axiosInstance({
      method: 'post',
      url: USER_ADDRESS,
      data: {
        ...data,
        user_id: userData.user_id
      },
    }).then((res:any) => {
      if(res.data.type === 'success'){
        toast.success(res.data.message);
        closeAddAddressDialog('add');
        getUserAddresses();
        reset2();
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  }

  const calculateOrderAmountQuantity = async() => {
    let amount:number = 0;
    let quantity:any = 0;
    const totalAmount = cartDetailsRef.current.map((item, index) => {
      amount = Number(amount)+Number(item.cart_amount);
      const quantityArray = item.quantity.split(',');
      quantity += quantityArray.reduce((a, b) => Number(a)+Number(b), 0)
    })
    setTotalAmount(amount);
    setTotalQuantity(quantity);
  }

  const confirmOrder = async() => {
    if(!selectUserAddresses){
      toast.error('Select Shipping Address');
      return;
    }
    await axiosInstance({
      method: 'post',
      url: ORDER_API,
      data: {
        cart_items: cartDetailsRef.current,
        user_id: userData.user_id,
        add_id: selectUserAddressesRef.current,
        total_amount: totalAmount,
        total_quantity: totalQuantity,
        order_status: ORDER_STATUS.PAYMENT_PENDING
      }
    }).then(res => {
      if(res.data.type ==='success'){
        closeConfirmOrderDialog();
        router.push(`${ORDER_PLACED}?order_no=${res.data.order_no}`);
      }
    }).catch((err) => {
      toast.error(err);
    })
  };

  return (
    <div className="page-content px-2">
      <h1 className="text-center mb-5">Checkout</h1>
      { cartDetails && cartDetails.length > 0 &&
        <div key={3}>
          <div className="col-12 mb-5">
            <h3 className="section-heading m-0">Order Details</h3>
            <div className="card">
              <div className="card-body row">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="col">Article#</th>
                      <th className="col">Details</th>
                      <th className="col">Sizes</th>
                      <th className="col">Quantity</th>
                      <th className="col">Amount</th>
                      <th className="col text-center">Actions</th>
                    </tr>
                  </thead>
                  {cartDetails.map((cart, index) => {
                    return (
                      <Fragment key={index}>
                        <tbody>
                          <tr>
                            <td>{cart.article_no}</td>
                            <td>{cart.slug}</td>
                            <td><span>{cart.cart_sizes}</span></td>
                            <td><span>{cart.quantity}</span></td>
                            <td>${parseInt(cart.cart_amount).toFixed(2)}</td>
                            <td>
                              <div className="row">
                                <Link 
                                  href={`/${cart.dept}/${cart.category}/${cart.p_id}`} 
                                  className="btn col-4" 
                                  target="_blank" title="View Item">
                                  <FontAwesomeIcon icon={faEye} className="fas fa-eye" />
                                </Link>
                                <button type="button" className="btn col-4" title="Edit Item" 
                                  onClick={() => 
                                    openEditCartDialog(cart.cart_id, cart.user_id, cart.cart_sizes, cart.quantity, cart.instructions, cart.document_link, cart.cart_amount)}>
                                  <FontAwesomeIcon icon={faEdit} className="fas fa-edit" />
                                </button>
                                <button type="button" className="btn col-4" onClick={openDeleteCartDialog} title="Delete Item">
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
                                    onKeyUp={() => {calculateTotalCartAmount(getValues('quantity'), cart.price)}} 
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
                                    onKeyUp={() => {calculateTotalCartAmount(getValues('quantity'), cart.price)}}
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
                                    onKeyUp={() => {calculateTotalCartAmount(getValues('quantity'), cart.price)}}  
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
                                    onKeyUp={() => {calculateTotalCartAmount(getValues('quantity'), cart.price)}}  
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
                      </Fragment>
                      )
                    })}
                </table>
              </div>
            </div>
          </div>
          <div className="col-12 mb-5">
            <h3 className="section-heading m-0">Shipping Address</h3>
            <div className="card">
              <div className="card-body row">
                {userAddresses && userAddresses.length > 0 && 
                  <Fragment key={6}>
                    {userAddresses?.map((address, index) => {
                      return (
                        <div 
                          className={cls(isActive === index ? styles.addressCardSelected: styles.addressCard, 'col-lg-3 col-md-6 p-3 col-12 mb-3')} 
                          key={index}
                          ref={addressBtnRef}>
                          <address
                            onClick={() => {
                            setSelectUserAddresses(address.add_id)
                            toggle(index)
                          }}>
                            <span className="text-capitalize">{address.add_area}</span> <br />
                            <span className="text-capitalize">{address.add_city} </span><br />
                            <span className="text-capitalize">{address.add_country}, </span> 
                            <span>{address.add_postal_code}</span> 
                          </address>
                          <div className="mb-3">
                            <IconButton 
                              aria-label="edit"
                              onClick={
                                () => editUserAddress(address.add_id, address.add_country, address.add_state, address.add_city, address.add_area, address.add_postal_code, address.add_type)
                              }
                              title="Edit Address">
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              aria-label="delete"
                              onClick={
                                () => openDeleteAddressDialog(address.add_id)
                              }
                              color="error"
                              title="Delete Address">
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      )
                    })}
                  </Fragment>
                }
                {userAddresses && userAddresses.length === 0 && 
                  <div className="mb-3 text-center text-danger">
                    <p>No Address Found</p>
                  </div>
                }
              </div>
              <div className="col-12 text-center mt-2 mb-5">
                <Button variant="outlined" onClick={() => {openAddAddressDialog(addressActionTypeRef.current)}}>Add New Address</Button>
              </div>
            </div>
          </div>
          <div className="col-12 mb-5">
            <h3 className="section-heading m-0">Order Summary</h3>
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Total Quantity</td>
                      <td>{totalQuantity} Pcs</td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td>USD ${totalAmount}</td>
                    </tr>
                    <tr>
                      <td>Delivery</td>
                      <td>30 days</td>
                    </tr>
                    <tr>
                      <td>Payment</td>
                      <td>Advance - Bank Transfer</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-12 text-end mb-3">
            <Button variant="contained" onClick={() => {openConfirmOrderDialog()}}>Confirm Order</Button>
          </div>
        </div>
        }
        {cartDetails && cartDetails.length === 0 && 
          <h2 className="text-danger text-center mt-5 mb-5">No item found in cart</h2>
        }
      <Dialog onClose={() => closeAddAddressDialog('add')} aria-labelledby="customized-dialog-title" open={addAddressOpen}>
        <form onSubmit={handleSubmit2(addressActionTypeRef.current ==='add'? addUserAddress : updateUserAddress)} autoComplete="off">
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Enter Address</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => closeAddAddressDialog ('add')}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className='row justify-content-center'>
            <div className='mb-3'>
              <select className="select-input" {...register2('add_country', {required: 'Required'})}>
                <option defaultValue={''} >Select Country</option>
                {ALLOWED_COUNTRIES.map((country, index) => {
                  return(
                    <option value={country.toLocaleLowerCase()} key={index}>{country}</option>
                  )
                })}
              </select>
              <ErrorMessage errors={errors2} name="add_country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register2('add_state', {required: 'Required'})} placeholder='State' className='form-control' />
              <ErrorMessage errors={errors2} name="add_state" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register2('add_city', {required: 'Required'})} placeholder='City' className='form-control' />
              <ErrorMessage errors={errors2} name="add_city" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register2('add_area', {required: 'Required'})} placeholder='Street/Area/Town' className='form-control' />
              <ErrorMessage errors={errors2} name="add_area" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="number"  {...register2('add_postal_code', {required: 'Required'})} placeholder='Postal Code' className='form-control' />
              <ErrorMessage errors={errors2} name="add_postal_code" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <select className="select-input" {...register2('add_type', {required: 'Required'})}>
                <option>Select address type</option>
                <option value={'home'}>Home</option>
                <option value={'work'}>Work</option>
              </select>
              <ErrorMessage errors={errors2} name="add_type" as={<small className="text-danger"></small>} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
        {addressActionTypeRef.current === 'add' &&
          <Button type="submit" variant="contained">Add Address</Button>
        }
        {addressActionTypeRef.current === 'update' &&
          <Button type="submit" variant="contained">Update Address</Button>
        }
        </DialogActions>
        </form>
      </Dialog>
      <Dialog onClose={closeDeleteAddressDialog} aria-labelledby="customized-dialog-title" open={deleteAddressDialogOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Delete Address</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDeleteAddressDialog}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <p>Are you sure you want to delete this address?</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={()=> deleteUserAddress()}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={closeConfirmOrderDialog} fullWidth aria-labelledby="customized-dialog-title" open={confirmOrderDialogOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Confirm Order</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeConfirmOrderDialog}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <p>I agree with 
            <Link href={'/terms-conditions'}> Terms &amp; Conditions</Link>
            <span className="mx-1">and</span>
            <Link href={'/return-policy'}>Return Policy</Link>.
          </p>
        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button variant="contained" color="error" onClick={()=> closeConfirmOrderDialog()}>Don&apos;t Agree</Button>
          <Button variant="contained" color="success" onClick={()=> confirmOrder()}>Agree</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  )
}

export default CheckoutComp;