import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import axiosInstance from "../../interceptors/axios.interceptor";
import { GET_ORDERS } from "../../endpoints";
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
      <h1 className="text-center">Orders</h1>
      <div className="row">
        <div className="product-tabs">
        <Tabs>
          <TabList>
            <Tab>Payment Pending (0)</Tab>
            <Tab>In Process (0)</Tab>
            <Tab>Shipped (0)</Tab>
          </TabList>
          <TabPanel>
            {orders && 
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
                        {orders.map((order, index) => {
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
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
        </Tabs>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default OrdersComp;