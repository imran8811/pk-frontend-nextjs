import Header from '../components/shared/header/header.comp';
import Footer from '../components/shared/footer/footer.comp';
import HomeComponent from '../components/home/home.comp';
import Keywords from '../components/shared/keywords/keywords.comp';
import RatingReviews from '../components/shared/rating-reviews/rating-reviews.comp';
import FAQS from '../components/shared/faqs/faqs.comp'

const Page = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header />
          <HomeComponent />
        </div>
        <RatingReviews />
        <FAQS />
        <Keywords />
      </div>
      <Footer />
    </>
  );
}
export default Page;
