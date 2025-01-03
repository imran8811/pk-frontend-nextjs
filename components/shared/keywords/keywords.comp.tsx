import { FC } from "react";
import Link from "next/link";

const Keywords: FC = () => {
  return (
      <div className="row p-5 border-bottom border-info">
        <ul className="col-12 col-md-6 col-lg-3 mb-3">
          <li><Link href="men/jeans-pants">Men Jeans Pants</Link></li>
          <li><Link href="women/jeans-pants">Women Jeans Pants</Link></li>
          <li><Link href="men/t-shirts">Men T-shirts</Link></li>
          <li><Link href="girls/jeans-pants">Girls Jeans Pants</Link></li>
          <li><Link href="men/chino-pants">Men Chino Pants</Link></li>
        </ul>
        <ul className="col-12 col-md-6 col-lg-3 mb-3">
          <li><Link href="bulk-jeans">Bulk Jeans</Link></li>
          <li><Link href="jeans-manufacturers">Jeans Manufacturers</Link></li>
          <li><Link href="jeans-pants-manufacturers">Jeans Pants Manufacturers</Link></li>
          <li><Link href="jeans-wholesale">Jeans Wholesale</Link></li>
        </ul>
        <ul className="col-12 col-md-6 col-lg-3 mb-3">
          <li><Link href="jeans-manufacturing-cost">Jeans Manufacturing Cost</Link></li>
          <li><Link href="wholesale-denim-jeans-suppliers">Wholesale Denim Jeans Suppliers</Link></li>
          <li><Link href="wholesale-jeans-manufacturers">Wholesale Jeans Manufacturers</Link></li>
          <li><Link href="wholesale-jeans-suppliers">Wholesale Jeans Suppliers</Link></li>
        </ul>
        <ul className="col-12 col-md-6 col-lg-3 mb-3">
          <li><Link href="motorcycle-jeans-manufacturers">Motorcycle Jeans Manufacturers</Link></li>
          <li><Link href="wholesale-women-jeans">Wholesale Women Jeans</Link></li>
          <li><Link href="wholesale-jeans-bulk">Wholesale Jeans Bulk</Link></li>
        </ul>
      </div>
  )
}

export default Keywords;