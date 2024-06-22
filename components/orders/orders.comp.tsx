import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

import { ICart } from "../../models/cart.model";
import axiosInstance from "../../interceptors/axios.interceptor";
import { DELETE_CART_ITEM, GET_CART_DETAILS, GET_ORDERS, NEW_ORDER, ORDER_CONFIRMED, WHOLESALE_SHOP } from "../../endpoints";
import { Button, Modal } from 'antd';
import styles from './orders.module.css';
import cls from 'classnames';
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkUserSession } from "../../services/auth.service";
import { IOrder } from "../../models/order.model";

const OrdersComp: FC = () => {
  const [orders, setOrders, ordersRef] = useState<IOrder[]>([]);
  const router = useRouter();
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    if(!checkUserSession()){
      router.push('/login?next=wholesale-shop/checkout')
    }
    getOrders();
  }, [])

  const [isDeleteCartItemModalOpen, setIsDeleteCartItemModalOpen] = useState(false);
  const [confirmOrderModalOpen, setConfirmOrderModalOpen] = useState(false);

  const deleteCartItemConfirmation = () => {
    setIsDeleteCartItemModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteCartItemModalOpen(false);
    setConfirmOrderModalOpen(false);
  };

  const getOrders = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_ORDERS}?userId=${userData.userId}`
    }).then(res => {
      setOrders(res.data);
    })
  }

  const openConfirmOderPopup = async() => {
    setConfirmOrderModalOpen(true);
  }

  return (
    <>
      <h1 className="text-center">Orders Details</h1>
      {orders && 
      <div className="row align-items-stretch">
        <div className="col-12">
          <h4 className="text-success">Products</h4>
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
                {orders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{order.items[index].productDetails.slug}</td>
                      <td>
                        <span>{order.items[index].sizes.map(size => size.concat('-'))}</span><br></br>
                      </td>
                      <td>
                        <span>{order.items[index].quantity.map(qty => qty.concat('-'))}</span>
                      </td>
                      <td>${parseInt(order.items[index].amount).toFixed(2)}</td>
                      <td>{order.items[index].instructions}</td>
                      <td>
                        <div className="row">
                          <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={() => {router.push(`/order/edit/${order.items[index].productId}`)}}>
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
          {orders.map((order) => {
            return (
              <>
                <div className="col-12">
                  <h4 className="text-success">Shipping Address</h4>
                  <div className="card mb-3">
                    <div className="card-body">
                      {order.shippingAddress}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                <h4 className="text-success">Order Summary</h4>
                <div className={cls('card mb-3', styles.heightFull)}>
                  <div className="card-body">
                    <ul>
                      <li>
                        <span>Total Quantity</span> 
                        <span>{order.totalQuantity}</span> 
                      </li>
                      <li>
                        <span>Total Amount</span> 
                        <span>{order.orderAmount}</span> 
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              </>
            )}
          )}
        </div>
      </div>
      }
      {/* <Modal title="Delete Cart Item" open={isDeleteCartItemModalOpen} onOk={deleteCartItem} onCancel={handleCancel}>
        <p>Want to delete cart item?</p>
      </Modal>
      <Modal open={confirmOrderModalOpen} onOk={confirmOrder} onCancel={handleCancel}>
        <p>Confirm Order?</p>
        <Link href={"/return-policy"}>Return Policy</Link>
      </Modal> */}
      <ToastContainer />
    </>
  )
}

export default OrdersComp;