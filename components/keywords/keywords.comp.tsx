import { FC } from "react";
import Link from "next/link";

const Keywords: FC = () => {
  return (
    <div className="row mb-5 pt-5 border-top border-info">
      <ul className="col-lg-3">
        <li><Link href="/men/jeans-pants/bulk-jeans">Bulk Jeans</Link></li>
        <li><Link href="/men/jeans-pants/buy-jeans-in-bulk">Buy Jeans in Bulk</Link></li>
        <li><Link href="/men/jeans-pants/cheap-mens-jeans-wholesale">Cheap Mens Jeans Wholesale</Link></li>
        <li><Link href="/men/jeans-pants/denim-manufacturers">Denim Manufacturers</Link></li>
        <li><Link href="/men/jeans-pants/denim-wholesale">Denim Wholesale</Link></li>
      </ul>
      <ul className="col-lg-3">
        <li><Link href="/men/jeans-pants/denim-jeans-manufacturer">Denim Jeans Manufacturer</Link></li>
        <li><Link href="/men/jeans-pants/jeans-manufacturers">Jeans Manufacturers</Link></li>
        <li><Link href="/men/jeans-pants/jeans-manufacturer">Jeans Manufacturer</Link></li>
        <li><Link href="/men/jeans-pants/jeans-pants-wholesale">Jeans Pants Wholesale</Link></li>
        <li><Link href="/men/jeans-pants/jeans-factory">Jeans Factory</Link></li>
      </ul>
      <ul className="col-lg-3">
        <li><Link href="/men/jeans-pants/jeans-pants-wholesale">Jeans Pant Wholesale</Link></li>
        <li><Link href="/men/jeans-pants/jean-manufacturers">Jean Manufacturers</Link></li>
        <li><Link href="/men/jeans-pants/jeans-supplier">Jeans Supplier</Link></li>
        <li><Link href="/men/jeans-pants/jeans-wholesale">Jeans Wholesale</Link></li>
        <li><Link href="/men/jeans-pants/wholesale-denim-jeans">Wholesale Denim Jeans</Link></li>
      </ul>
      <ul className="col-lg-3">
        <li><Link href="/men/jeans-pants/wholesale-jeans-bulk">Wholesale Jeans Bulk</Link></li>
        <li><Link href="/men/jeans-pants/wholesale-jeans-mens">Wholesale Jeans Mens</Link></li>
        <li><Link href="/men/jeans-pants/wholesale-jeans-online">Wholesale Jeans Online</Link></li>
        <li><Link href="/men/jeans-pants/wholesale-jeans-suppliers">Wholesale Jeans Suppliers</Link></li>
        <li><Link href="/men/jeans-pants/wholesale-jeans">Wholesale Jeans</Link></li>
      </ul>
    </div>
  )
}

export default Keywords;