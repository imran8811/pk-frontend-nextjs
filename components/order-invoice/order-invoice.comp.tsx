import { FC } from "react";
import styles from './home.module.css'
import HomeBanner from "../shared/home-banner/home-banner.comp";
import Link from "next/link";

const OrderInvoiceComp : FC = () => {
  return (
    <div className="page-content">
      <h2>Order Invoice</h2>
      <table>
        <thead>
          <th>
            <td>#</td>
            <td>Item</td>
            <td>Amount</td>
            <td>Quantity</td>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>#</td>
            <td>Men Slim fit pant</td>
            <td>15000</td>
            <td>250</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderInvoiceComp;