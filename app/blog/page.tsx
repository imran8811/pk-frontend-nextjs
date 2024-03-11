import { Metadata } from 'next';
import Header from '../../components/header/header.comp';
import Footer from '../../components/footer/footer.comp';
import BlogComp from '../../components/blog/blog.comp';

export const metadata: Metadata = {
  title: "Blog - PK Apparel",
  keywords:  "Jeans manufacturers, Jeans Pants Manufacturers, Jeans Wholesale",
  description: "Manufacturer and exporter of denim products, jeans pants, jeans jackets, jeans shorts for men, women and kids"
}

const Blog = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header></Header>
          <BlogComp></BlogComp>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Blog;