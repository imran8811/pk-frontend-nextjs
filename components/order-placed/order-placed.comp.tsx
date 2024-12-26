"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const OrderPlacedComp : FC = () => {
  const [orderFound, setOrderFound] = useState<boolean>();
  const searchParam = useSearchParams();
  const order_no = searchParam.get('order_no')
  
  useEffect(() => {
    order_no? setOrderFound(true) : setOrderFound(false);
  }, [orderFound])

  return (
    <div className="page-content px-5">
      {orderFound &&
        <>
          <h1 className="mb-4">New order has been placed and order number is {order_no}</h1>
          <p>An invoice has been generated and email to you as an attachment.</p>
          <p className="text-danger">Please bank transfer the invoice amount ASAP and confirm your deposit here:  
            <Link href={'/confirm-deposit'}> Confirm Deposit </Link>
          </p>
          <p>Once deposit has been verified, order processing will be started immediately.</p>
          <p>You can also view and download your invoices here: <Link href={'/order/invoices'}>View Invoices</Link></p>
          <p>You can view orders here: <Link href={'/orders'}>View Orders</Link></p>
          <p>You can track your order here: <Link href={'/track-order'}>Track Order</Link></p>
        </>
      }
      {!orderFound &&
        <h2 className="text-danger text-center mt-5 mb-5">No order Found</h2>
      }
    </div>
  )
}

export default OrderPlacedComp;