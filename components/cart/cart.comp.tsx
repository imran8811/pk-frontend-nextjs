import { FC, useEffect } from "react";
import useState from 'react-usestateref'

import { ICart } from "../../models/cart.model";
import axios from "axios";
import { GET_CART_DETAILS } from "../../endpoints";
import Link from "next/link";

const CartComp: FC = () => {
  const [cartDetails, setCartDetails, cartDetailsRef] = useState<ICart[]>();
  const userData = JSON.parse(localStorage.getItem('userData')!);

  useEffect(() => {
    getCartDetails();
  }, [])

  const getCartDetails = async () => {
    const res = await axios({
      method: "get",
      url: `${GET_CART_DETAILS}?userId=${userData.userId}`
    }).then(res => {
      setCartDetails(res.data);
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-9 col-12">
        <h1 className="text-center">Cart Details</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="col">Item</th>
              <th className="col">Details</th>
              <th className="col">Sizes</th>
              <th className="col">Quantity</th>
              <th className="col">Amount</th>
            </tr>
          </thead>
          <tbody>
          {cartDetails && cartDetails.map((cart, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{cart.productDetails.slug}</td>
                <td>
                  <span>{cart.sizes.map(size => size.concat('-'))}</span><br></br>
                </td>
                <td>
                  <span>{cart.quantity.map(qty => qty.concat('-'))}</span>
                </td>
                <td>${cart.amount}</td>
              </tr>
            )
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-end">
              <Link href={'/wholesale-shop/checkout'} className="btn btn-success">Checkout </Link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CartComp;