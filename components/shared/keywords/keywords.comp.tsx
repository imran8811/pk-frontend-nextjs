import { FC } from "react";
import Link from "next/link";

const Keywords: FC = () => {
  return (
    <div className="row p-5 border-top border-info">
      <ul className="col-lg-3 col-md-6 mb-3">
        <li><Link href="bulk-jeans">Bulk Jeans</Link></li>
        <li><Link href="buy-jeans-in-bulk">Buy Jeans in Bulk</Link></li>
        <li><Link href="cheap-mens-jeans-wholesale">Cheap Mens Jeans Wholesale</Link></li>
        <li><Link href="denim-manufacturers">Denim Manufacturers</Link></li>
        <li><Link href="denim-wholesale">Denim Wholesale</Link></li>
      </ul>
      <ul className="col-lg-3 col-md-6 mb-3">
        <li><Link href="denim-jeans-manufacturer">Denim Jeans Manufacturer</Link></li>
        <li><Link href="jeans-manufacturers">Jeans Manufacturers</Link></li>
        <li><Link href="jeans-manufacturer">Jeans Manufacturer</Link></li>
        <li><Link href="jeans-pants-wholesale">Jeans Pants Wholesale</Link></li>
        <li><Link href="jeans-factory">Jeans Factory</Link></li>
      </ul>
      <ul className="col-lg-3 col-md-6 mb-3">
        <li><Link href="jeans-pants-wholesale">Jeans Pant Wholesale</Link></li>
        <li><Link href="jean-manufacturers">Jean Manufacturers</Link></li>
        <li><Link href="jeans-supplier">Jeans Supplier</Link></li>
        <li><Link href="jeans-wholesale">Jeans Wholesale</Link></li>
        <li><Link href="wholesale-denim-jeans">Wholesale Denim Jeans</Link></li>
      </ul>
      <ul className="col-lg-3 col-md-6 mb-3">
        <li><Link href="wholesale-jeans-bulk">Wholesale Jeans Bulk</Link></li>
        <li><Link href="wholesale-jeans-mens">Wholesale Jeans Mens</Link></li>
        <li><Link href="wholesale-jeans-online">Wholesale Jeans Online</Link></li>
        <li><Link href="wholesale-jeans-suppliers">Wholesale Jeans Suppliers</Link></li>
        <li><Link href="wholesale-jeans">Wholesale Jeans</Link></li>
      </ul>
    </div>
  )
}

export default Keywords;