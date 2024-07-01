import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

import { ICart } from "../../models/cart.model";
import axiosInstance from "../../interceptors/axios.interceptor";
import { DELETE_CART_ITEM, GET_CART_DETAILS, NEW_ORDER, ORDER_CONFIRMED, USER_ADDRESS, WHOLESALE_SHOP } from "../../endpoints";
import { Button, Modal } from 'antd';
import styles from './checkout.module.css';
import cls from 'classnames';
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkUserSession } from "../../services/auth.service";
import { IUserAddress } from "../../models";
import { ALLOWED_COUNTRIES } from "../../constants";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

const CheckoutComp: FC = () => {
  const [cartDetails, setCartDetails, cartDetailsRef] = useState<ICart[]>([]);
  const [isDeleteCartItemModalOpen, setIsDeleteCartItemModalOpen] = useState(false);
  const [confirmOrderModalOpen, setConfirmOrderModalOpen] = useState(false);
  const [userAddresses, setUserAddresses, userAddressesRef] = useState<IUserAddress[]>();
  const [isCreateAddressModalOpen, setIsCreateAddressModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const router = useRouter();
  const { register, handleSubmit, getValues, setValue, reset, formState: { errors }} = useForm({ criteriaMode: 'all'});
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    if(!checkUserSession()){
      router.push('/login?next=wholesale-shop/checkout')
    } else {
      getCartDetails();
      getUserAddresses();
    }
  }, [])

  const createAddressModalOpen = () => {
    setIsCreateAddressModalOpen(true);
  };

  const deleteCartItemConfirmation = () => {
    setIsDeleteCartItemModalOpen(true);
  };

  const getUserAddresses = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${USER_ADDRESS}/${userData.userId}`
    }).then(res => {
      setUserAddresses(res.data.data);
    })
  }

  const createNewUserAddress = async(data:any) => {
    await axiosInstance({
      method: 'post',
      url: USER_ADDRESS,
      data: {
        ...data,
        userId: userData.userId
      },
    }).then((res:any) => {
      if(res.data.type === 'success'){
        toast.success(res.data.message);
        setIsCreateAddressModalOpen(false);
        getUserAddresses();
        reset();
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    }) ;
  }

  const calculateAmountQuantity = async() => {
    let amount:number = 0;
    let quantity:any = 0;
    const totalAmount = cartDetailsRef.current.map((item, index) => {
      amount = Number(amount)+Number(item.amount);
      quantity += item.quantity.reduce((a, b) => Number(a)+Number(b), 0)
    })
    setTotalAmount(amount);
    setTotalQuantity(quantity);
  }

  const deleteCartItem = async() => {
    await axiosInstance({
      method: 'delete',
      url: `${DELETE_CART_ITEM}/${cartDetails[0]?.productId}`
    }).then(res => {
      console.log(res);
      setIsDeleteCartItemModalOpen(false);
    }).catch((err) => {
      console.log(err);
    })
  };

  const confirmOrder = async() => {
    await axiosInstance({
      method: 'post',
      url: `${NEW_ORDER}`,
      data: {
        items: cartDetailsRef.current,
        userId: userData.userId,
        shippingAddress: "user address",
        orderAmount: '15000'
      }
    }).then(res => {
      setConfirmOrderModalOpen(false);
      router.push(`${ORDER_CONFIRMED}`);
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleCancel = () => {
    setIsDeleteCartItemModalOpen(false);
    setConfirmOrderModalOpen(false);
    setIsCreateAddressModalOpen(false);
    reset();
  };

  const getCartDetails = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_CART_DETAILS}?userId=${userData.userId}`
    }).then(res => {
      setCartDetails(res.data);
      calculateAmountQuantity();
    })
  }

  const openConfirmOderPopup = async() => {
    setConfirmOrderModalOpen(true);
  }

  return (
    <>
      <h1 className="text-center">Checkout</h1>
      <div className="row align-items-stretch">
        <div className="col-md-9">
          <div className="col-12">
            <h3>Order Details</h3>
            <div className="card mb-3">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col">Item</th>
                      <th className="col">Details</th>
                      <th className="col">Sizes</th>
                      <th className="col">Quantity</th>
                      <th className="col">Amount</th>
                      <th className="col">Instructions</th>
                      <th className="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {cartDetails && cartDetails.map((cart, index) => {
                    return (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{cart.productDetails.slug}</td>
                        <td>
                          <span>{cart.sizes.map(size => size.concat('-'))}</span><br></br>
                        </td>
                        <td>
                          <span>{cart.quantity.map(qty => qty.concat('-'))}</span>
                        </td>
                        <td>${parseInt(cart.amount).toFixed(2)}</td>
                        <td>{cart.instructions}</td>
                        <td>
                          <div className="row">
                            <button type="button" className="btn col-6" onClick={() => {router.push(`/cart/edit/${cart.productId}`)}}>
                              <FontAwesomeIcon icon={faEdit} className="fas fa-edit" />
                            </button>
                            <button type="button" className="btn col-6" onClick={deleteCartItemConfirmation}>
                              <FontAwesomeIcon icon={faTrash} className="fas fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-12">
            <h3>Shipping Address</h3>
            <div className="card mb-3">
              <div className="card-body row">
                {userAddresses && userAddresses.length > 0 && 
                  <>
                    {userAddresses?.map((address, index) => {
                      return (
                        <div className={cls(styles.addressList, 'card col-md-5 mb-3')} key={index}>
                          <div className="card-body">
                            <p>{address.addressType}</p>
                            <address>
                              {address.area+', '+address.city+', '+address.country+', '+address.postalCode }
                            </address>
                          </div>
                        </div>
                      )
                    })}
                  </>
                }
                {userAddresses && userAddresses.length === 0 && 
                  <div className="mb-3">
                    <p className="text-danger">No Address Found</p>
                  </div>
                }
                <button type="button" className="btn btn-link" onClick={() => {createAddressModalOpen()}}>Add New Address</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h3>Order Summary</h3>
          <div className={cls('card mb-3', styles.heightFull)}>
            <div className="card-body">
              <ul>
                <li>
                  <span>Total Quantity</span> 
                  <span>{totalQuantity}</span> 
                </li>
                <li>
                  <span>Total Amount</span> 
                  <span>${totalAmount}</span> 
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="col-12 text-end mb-3">
        <button type="button" className="btn btn-success" onClick={() => {openConfirmOderPopup()}}>Confirm Order</button>
      </div>
      <Modal title="Delete Cart Item" open={isDeleteCartItemModalOpen} onOk={deleteCartItem} onCancel={handleCancel}>
        <p>Want to delete cart item?</p>
      </Modal>
      <Modal open={confirmOrderModalOpen} onOk={confirmOrder} onCancel={handleCancel}>
        <p>Confirm Order?</p>
        <Link href={"/return-policy"}>Return Policy</Link>
      </Modal>
      <Modal open={isCreateAddressModalOpen} footer={null} onCancel={handleCancel}>
        <div className='row justify-content-center'>
          <h2 className='text-center mb-3'>Enter Address Details</h2>
          <form onSubmit={handleSubmit(createNewUserAddress)} autoComplete="off" className='col-12'>
            <div className='mb-3'>
              <select className="select-input" {...register('country', {required: 'Required'})}>
                <option value={''} selected>Select Country</option>
                {ALLOWED_COUNTRIES.map((country, index) => {
                  return(
                    <option value={country.toLocaleLowerCase()} key={index}>{country}</option>
                  )
                })}
              </select>
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('state', {required: 'Required'})} placeholder='State' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('city', {required: 'Required'})} placeholder='City' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('area', {required: 'Required'})} placeholder='Street/Area/Town' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <input type="text"  {...register('postalCode', {required: 'Required'})} placeholder='Postal Code' className='form-control' />
              <ErrorMessage errors={errors} name="country" as={<small className="text-danger"></small>} />
            </div>
            <div className='mb-3'>
              <select className="select-input" {...register('addressType', {required: 'Required'})}>
                <option>Select address type</option>
                <option value={'home'}>Home</option>
                <option value={'work'}>Work</option>
              </select>
              <ErrorMessage errors={errors} name="addressType" as={<small className="text-danger"></small>} />
            </div>
            <div className="mb-3 text-end">
              <button type="submit" className='btn btn-primary col-4'>Create</button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default CheckoutComp;