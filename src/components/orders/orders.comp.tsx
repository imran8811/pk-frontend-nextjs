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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../shared/custom-tabs/custom-tabs.comp";
import React from "react";
import Link from "next/link";

const OrdersComp: FC = () => {
  const [orders, setOrders, ordersRef] = useState<IOrder[]>([]);
  const [pendingPaymentOrders, setPendingPaymentOrders, pendingPaymentOrdersRef] = useState<IOrder[]>([]);
  const [inProcessOrders, setInProcessOrders, inProcessOrdersRef] = useState<IOrder[]>([]);
  const [shippedOrders, setShippedOrders, shippedOrdersRef] = useState<IOrder[]>([]);
  const [cancelledOrders, setCancelledOrders, cancelledOrdersRef] = useState<IOrder[]>([]);
  const [value, setValue] = useState(0);
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      url: `${GET_ORDERS}/${userData.user_id}`
    }).then(res => {
      setOrders(res.data);
      setPendingPaymentOrders(res.data.data.filter(order => order.order_status === ORDER_STATUS.PAYMENT_PENDING))
      setInProcessOrders(res.data.data.filter(order => order.order_status === ORDER_STATUS.IN_PROCESS))
      setShippedOrders(res.data.data.filter(order => order.order_status === ORDER_STATUS.SHIPPED))
      setCancelledOrders(res.data.data.filter(order => order.order_status === ORDER_STATUS.CANCELLED))
      console.log(pendingPaymentOrdersRef.current);
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
        <Tabs value={value} onChange={handleChange}>
          <Tab label={ORDER_STATUS.PAYMENT_PENDING} />
          <Tab label={ORDER_STATUS.IN_PROCESS} />
          <Tab label={ORDER_STATUS.SHIPPED} />
          <Tab label={ORDER_STATUS.CANCELLED} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          {pendingPaymentOrders && pendingPaymentOrders.length > 0 &&
            <div className="row align-items-stretch">
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="col">Order#</th>
                          <th className="col">Items</th>
                          <th className="col">Total Quantity</th>
                          <th className="col">Total Amount</th>
                          <th className="col">Shipping Address</th>
                          <th className="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {pendingPaymentOrders.map((order, index) => {
                        return (
                          <tr key={index}>
                            <td>{order.order_no}</td>
                            <td>
                            {JSON.parse(order.cart_items).map((item, index) => {
                              return(
                                <tr key={index}>
                                  <td>{item.slug}</td>
                                </tr>
                              )
                            })}
                            </td>
                            <td>{order.total_quantity}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.shipping_address}</td>
                            <td>
                              <tr className="row">
                                <td className="col-12 mb-1"><Link href={'payment-deposit'}> Confirm Payment Deposit</Link></td>
                                <td className="col-12 mb-1"><Link href={'invoices/'+'invoiceID'}> View Invoice</Link></td>
                                <td className="col-12"><Link href={'order/cancel'} className="text-danger">Cancel</Link></td>
                              </tr>
                            </td>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
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
                            <td>{order.total_amount}</td>
                            <td>{order.total_quantity}</td>
                            <td>{order.shipping_address}</td>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
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
                            <td>{order.total_amount}</td>
                            <td>{order.total_quantity}</td>
                            <td>{order.shipping_address}</td>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
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
                            <td>{order.total_amount}</td>
                            <td>{order.total_quantity}</td>
                            <td>{order.shipping_address}</td>
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
        </CustomTabPanel>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default OrdersComp;