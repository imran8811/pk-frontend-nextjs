import { FC, useEffect } from "react";
import useState from 'react-usestateref'

import { ICart } from "../../models/cart.model";
import axiosInstance from "../../interceptors/axios.interceptor";
import { DELETE_CART_ITEM, GET_CART_DETAILS } from "../../endpoints";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

const CartComp: FC = () => {
  const [cartDetails, setCartDetails, cartDetailsRef] = useState<ICart[]>([]);
  const router = useRouter();
  let userData;
  if (typeof localStorage !== 'undefined') {
    userData = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      router.push('/login');
    }
  }
  const [isDeleteCartItemModalOpen, setIsDeleteCartItemModalOpen] = useState(false);
  const [confirmOrderModalOpen, setConfirmOrderModalOpen] = useState(false);

  useEffect(() => {
    getCartDetails();
  }, [])


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
      router.refresh();
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

  return (
    <div className="row justify-content-center">
      <div className="col-lg-9 col-12">
      { cartDetails &&
        <>
        <h1 className="text-center m-4">Cart Details</h1>
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
            { cartDetails.map((cart, index) => {
            return (
                <>
                  <tbody>
                    <tr>
                      <td>{cart.productDetails.articleNo}</td>
                      <td>{cart.productDetails.slug}</td>
                      <td>
                        <span>{cart.sizes.map(size => size.concat('-'))}</span><br></br>
                      </td>
                      <td>
                        <span>{cart.quantity.map(qty => qty.concat('-'))}</span>
                      </td>
                      <td>${parseInt(cart.amount).toFixed(2)}</td>
                      <td>
                        <div  className="row">
                          <button type="button" className="btn col-6" onClick={() => {router.push(`/cart/edit/${cart.productId}`)}}>
                            <FontAwesomeIcon icon={faEdit} className="fas fa-edit" />
                          </button>
                          <button type="button" className="btn col-6" onClick={deleteCartItemConfirmation}>
                            <FontAwesomeIcon icon={faTrash} className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </>
              )})}
          </table>
        <div className="mb-5 justify-content-end d-flex">
          <Link href={'/wholesale-shop/checkout'} className="btn btn-success">Checkout </Link>
        </div>
        </>
        }
        {cartDetails?.length === 0 && 
          <h2 className="text-danger text-center mt-5 mb-5">No item found in cart</h2>
        }
      </div>
      <Modal title="Delete Cart Item" open={isDeleteCartItemModalOpen} onOk={deleteCartItem} onCancel={handleCancel}>
        <p>Want to delete cart item?</p>
      </Modal>
    </div>
  )
}

export default CartComp;