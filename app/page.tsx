"use client";
import Header from '../components/header/header.comp';
import Footer from '../components/footer/footer.comp';
import HomeComponent from '../components/home/home.comp';
import Keywords from '../components/keywords/keywords.comp';
import RatingReviews from '../components/rating-reviews/rating-reviews.comp';
import FAQS from '../components/faqs/faqs.comp'

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
