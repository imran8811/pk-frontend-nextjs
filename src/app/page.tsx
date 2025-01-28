import Header from '../components/shared/header/header.comp';
import Footer from '../components/shared/footer/footer.comp';
import HomeComponent from '../components/home/home.comp';
import Keywords from '../components/shared/keywords/keywords.comp';
import RatingReviews from '../components/shared/rating-reviews/rating-reviews.comp';
import FAQS from '../components/shared/faqs/faqs.comp'
import { Metadata } from 'next';
import WhyChooseUs from '../components/why-choose-us/why-choose-us.comp';

export const metadata: Metadata = {
  title : "Garments Manufacturer and Wholesaler - Jeans Pants, T-shirts, Hoodie",
  description : "All kind of garments manufacturer and wholesaler including Jeans Pants, T-shirts, Hoodies, Cotton Pants, Cargo Trousers, Chino Pants and Jackets.",
  keywords : "Jeans pants Manufacturers, Jeans pants Wholesalers, Jeans Pants suppliers"
}

const Page = () => {
  return (
    <>
      <Header />
      <HomeComponent />
      <WhyChooseUs />
      <RatingReviews />
      <FAQS />
      {/* <Keywords /> */}
      <Footer />
    </>
  );
}
export default Page;
