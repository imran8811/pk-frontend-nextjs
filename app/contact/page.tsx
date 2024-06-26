import { Metadata } from 'next';
import Header from '../../components/shared/header/header.comp';
import Footer from '../../components/shared/footer/footer.comp';
import ContactComp from '../../components/static/contact/contact.comp';

export const metadata: Metadata = {
  title: "Contact Us - PK Apparel",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const Contact = () => {
  return (
    <>
      <Header></Header>
      <ContactComp></ContactComp>
      <Footer></Footer>
    </>
  )
}

export default Contact;