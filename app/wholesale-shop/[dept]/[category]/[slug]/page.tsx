import Header from '../../../../../components/shared/header/header.comp';
import Footer from '../../../../../components/shared/footer/footer.comp';
import ProductDetails from '../../../../../components/product-details/product-details.comp';
import { Metadata, ResolvingMetadata } from "next";
import axiosInstance from '../../../../../interceptors/axios.interceptor';
import { GET_PRODUCT_DETAILS } from '../../../../../endpoints';

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
let slug:any;
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  slug = (await params).slug;
  const article_no = slug.split("-").pop();

  const res = await axiosInstance({
    method: "get",
    url: GET_PRODUCT_DETAILS+"/"+article_no,
  }).then(res => {
    return res.data;
  })
 
  return {
    title: res[0].product_name
  }
}

const ShopPage = () => {
  return (
    <>
      <Header />
      <ProductDetails />
      <Footer />
    </>
  )
}

export default ShopPage;

 

