import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

import { ICart } from "../../models/cart.model";
import axiosInstance from "../../interceptors/axios.interceptor";
import { DELETE_CART_ITEM, GET_CART_DETAILS, NEW_ORDER, ORDER_CONFIRMED, WHOLESALE_SHOP } from "../../endpoints";
import { Button, Modal } from 'antd';
import styles from './checkout.module.css';
import cls from 'classnames';
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CheckoutComp: FC = () => {
  const [cartDetails, setCartDetails, cartDetailsRef] = useState<ICart[]>([]);
  const router = useRouter();
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    getCartDetails();
  }, [])

  const [isDeleteCartItemModalOpen, setIsDeleteCartItemModalOpen] = useState(false);
  const [confirmOrderModalOpen, setConfirmOrderModalOpen] = useState(false);

  const deleteCartItemConfirmation = () => {
    setIsDeleteCartItemModalOpen(true);
  };

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
  };

  const getCartDetails = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_CART_DETAILS}?userId=${userData.userId}`
    }).then(res => {
      setCartDetails(res.data);
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
            <h3>Shipping Details</h3>
            <div className="card mb-3">
              <div className="card-body">
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
                  <li>
                    <span>Carton Dimensions</span>
                    <span>24 x 24 x 40</span>
                  </li>
                </ul>
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
                  <span>1500</span> 
                </li>
                <li>
                  <span>Total Amount</span> 
                  <span>$15000</span> 
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
      <ToastContainer />
    </>
  )
}

export default CheckoutComp;