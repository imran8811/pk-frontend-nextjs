import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import ManageAccountComp from '../../components/manage-account/manage-account.comp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manage Account - Wholesale shop PK Apparel",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Factories",
  description: "We offer top-notch jeans at amazing prices to customers who need a real blend of quality and style. So, place your order with a renowned jeans manufacturer."
}

const Orders = () => {
  return (
    <>
      <Header></Header>
      <ManageAccountComp></ManageAccountComp>
      <Footer></Footer>
    </>
  )
}

export default Orders;