import Header from '../components/shared/header/header.comp';
import Footer from '../components/shared/footer/footer.comp';
import HomeComponent from '../components/home/home.comp';
import Keywords from '../components/shared/keywords/keywords.comp';
import RatingReviews from '../components/shared/rating-reviews/rating-reviews.comp';
import FAQS from '../components/shared/faqs/faqs.comp'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title : "Jeans Manufacturer and Wholesale - Jeans Pants Jeans Jackets",
  description : "PK Apparel Specializes in jeans pants manufacturing and wholesale, jeans Jackets wholesale, Jeans Shirt and all other denim products. We stand behind all of the products that we handle and we are the company that stand behind the quality and performance of the products they build",
  keywords : "Jeans pants Manufacturers, Jeans pants Wholesalers, Jeans Pants suppliers"
}

const Page = () => {
  return (
    <>
      <Header />
      <HomeComponent />
      <RatingReviews />
      <FAQS />
      <Keywords />
      <Footer />
    </>
  );
}
export default Page;
