"use client";
import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
// import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import axiosInstance from "../../interceptors/axios.interceptor";
import { GET_ORDERS } from "../../endpoints";
import { checkUserSession } from "../../services/auth.service";
import { IOrder } from "../../models/order.model";
import { ORDER_STATUS } from "../../constants";

const OrdersComp: FC = () => {
  const [orders, setOrders, ordersRef] = useState<IOrder[]>([]);
  const [pendingPaymentOrders, setPendingPaymentOrders, pendingPaymentOrdersRef] = useState<IOrder[]>([]);
  const [inProcessOrders, setInProcessOrders, inProcessOrdersRef] = useState<IOrder[]>([]);
  const [shippedOrders, setShippedOrders, shippedOrdersRef] = useState<IOrder[]>([]);
  const [cancelledOrders, setCancelledOrders, cancelledOrdersRef] = useState<IOrder[]>([]);
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
      setPendingPaymentOrders(res.data.filter(order => order.status === ORDER_STATUS.PAYMENT_PENDING))
      setInProcessOrders(res.data.filter(order => order.status === ORDER_STATUS.IN_PROCESS))
      setShippedOrders(res.data.filter(order => order.status === ORDER_STATUS.SHIPPED))
      setCancelledOrders(res.data.filter(order => order.status === ORDER_STATUS.CANCELLED))
    })
  }

  const openConfirmOderPopup = async() => {
    setConfirmOrderModalOpen(true);
  }

  return (
    <div className="page-content">
      <h1 className="text-center">Orders</h1>
      <div className="row">
        <div className="product-tabs">
        {/* <Tabs>
          <TabList>
            <Tab>Payment Pending ({pendingPaymentOrders.length})</Tab>
            <Tab>In Process ({inProcessOrders.length})</Tab>
            <Tab>Shipped ({shippedOrders.length})</Tab>
            <Tab>Cancelled ({cancelledOrders.length})</Tab>
          </TabList>
          <TabPanel>
            {pendingPaymentOrders && 
              <div className="row align-items-stretch">
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="col">Order#</th>
                            <th className="col">Amount</th>
                            <th className="col">Quantity</th>
                            <th className="col">Shipping Address</th>
                          </tr>
                        </thead>
                        <tbody>
                        {pendingPaymentOrders.map((order, index) => {
                          return (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{order.totalAmount}</td>
                              <td>{order.totalQuantity}</td>
                              <td>{order.shippingAddress}</td>
                            </tr>
                          )})}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            }
            {pendingPaymentOrders.length === 0 &&
              <h3 className="text-danger text-center p-5">No Pending Payment Order(s) Found</h3>
            }
          </TabPanel>
          <TabPanel>
            {inProcessOrders.length > 0 && 
                <div className="row align-items-stretch">
                  <div className="col-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="col">Order#</th>
                              <th className="col">Amount</th>
                              <th className="col">Quantity</th>
                              <th className="col">Shipping Address</th>
                            </tr>
                          </thead>
                          <tbody>
                          {inProcessOrders.map((order, index) => {
                            return (
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{order.totalAmount}</td>
                                <td>{order.totalQuantity}</td>
                                <td>{order.shippingAddress}</td>
                              </tr>
                            )})}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {inProcessOrders.length === 0 &&
                <h3 className="text-danger text-center p-5">No In Process Order(s) Found</h3>
              }
          </TabPanel>
          <TabPanel>
            {shippedOrders.length > 0 && 
              <div className="row align-items-stretch">
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="col">Order#</th>
                            <th className="col">Amount</th>
                            <th className="col">Quantity</th>
                            <th className="col">Shipping Address</th>
                          </tr>
                        </thead>
                        <tbody>
                        {shippedOrders.map((order, index) => {
                          return (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{order.totalAmount}</td>
                              <td>{order.totalQuantity}</td>
                              <td>{order.shippingAddress}</td>
                            </tr>
                          )})}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            }
            {shippedOrders.length === 0 &&
              <h3 className="text-danger text-center p-5">No Shipped Order(s) Found</h3>
            }
          </TabPanel>
          <TabPanel>
            {cancelledOrders.length > 0 && 
              <div className="row align-items-stretch">
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="col">Order#</th>
                            <th className="col">Amount</th>
                            <th className="col">Quantity</th>
                            <th className="col">Shipping Address</th>
                          </tr>
                        </thead>
                        <tbody>
                        {cancelledOrders.map((order, index) => {
                          return (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{order.totalAmount}</td>
                              <td>{order.totalQuantity}</td>
                              <td>{order.shippingAddress}</td>
                            </tr>
                          )})}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            }
            {cancelledOrders.length === 0 &&
              <h3 className="text-danger text-center p-5">No Cancelled Order(s) Found</h3>
            }
          </TabPanel>
        </Tabs> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default OrdersComp;