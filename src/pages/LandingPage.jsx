import React from "react";
import HeroSection from "../components/LandingPageComponents/heroSection/heroSection";
import FeaturedCategoriesSection from "../components/LandingPageComponents/featureCategorySection/FeaturedCategoriesSection";
import DiscountOffers from "../components/LandingPageComponents/offerDiscountSection/DiscountOffers";
import BlogSection from "../components/LandingPageComponents/blogSection/BlogSection";
import WhyChooseUs from "../components/LandingPageComponents/whyUs/WhyChooseUs";
import NewArrivals from "../components/LandingPageComponents/newArrivals/NewArrivals";
import BestSellingProducts from "../components/LandingPageComponents/bestSelling/BestSellingProducts.js";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 font-sans">
      <HeroSection />
      <FeaturedCategoriesSection/>
      <DiscountOffers/>
      <BestSellingProducts/>
      <NewArrivals/>
      <WhyChooseUs/>
      <BlogSection/>
    </div>
  );
};

export default LandingPage;
