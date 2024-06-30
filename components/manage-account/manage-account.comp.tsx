import { FC, useEffect } from "react";
import useState from 'react-usestateref'
import { useRouter } from "next/navigation";

import axiosInstance from "../../interceptors/axios.interceptor";
import { GET_USER_ACCOUNT } from "../../endpoints";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkUserSession } from "../../services/auth.service";
import { IOrder } from "../../models/order.model";
import { IUser } from "../../models/user.model";

const ManageAccountComp: FC = () => {
  const [userAccount, setUserAccount, userAccountRef] = useState<IUser[]>([]);
  const router = useRouter();
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
  }

  useEffect(() => {
    if(!checkUserSession()){
      router.push('/login?next=wholesale-shop/checkout')
    }
    getUserAccount();
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

  const getUserAccount = async () => {
    const res = await axiosInstance({
      method: "get",
      url: `${GET_USER_ACCOUNT}/${userData.userId}`
    }).then(res => {
      setUserAccount(res.data);
    })
  }

  const openConfirmOderPopup = async() => {
    setConfirmOrderModalOpen(true);
  }

  return (
    <>
      <h1>Manage your account</h1>
      <div className="row">
        <div className="col-md-4">
          <h2>Personal profile</h2>

        </div>
        <div className="col-md-4">
          <h2>Address Book</h2>
        </div>
      </div>
      <div className="row">
        <h2>Recent Orders</h2>
      </div>
      <ToastContainer />
    </>
  )
}

export default ManageAccountComp;