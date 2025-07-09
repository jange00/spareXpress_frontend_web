import React from "react";
import HeroSection from "../components/LandingPageComponents/heroSection/heroSection";
import FeaturedCategoriesSection from "../components/LandingPageComponents/featureCategorySection/FeaturedCategoriesSection";
import DiscountOffers from "../components/LandingPageComponents/offerDiscountSection/DiscountOffers";
import BlogSection from "../components/LandingPageComponents/blogSection/BlogSection";
import WhyChooseUs from "../components/LandingPageComponents/whyUs/WhyChooseUs";
import NewArrivals from "../components/LandingPageComponents/newArrivals/NewArrivals";
import BestSellingProducts from "../components/LandingPageComponents/bestSelling/BestSellingProducts.js";
import ChatComponent from "../components/chatbot/chatBot";

const LandingPage = () => {

  let isLoggedIn = false;
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    isLoggedIn = token && user && user !== "undefined";
  } catch (error) {
    isLoggedIn = false;
  }

  return (
    <div className="bg-gray-100 font-sans">
      <HeroSection />
      <FeaturedCategoriesSection/>
      <DiscountOffers/>
      <BestSellingProducts/>
      <NewArrivals/>
      <WhyChooseUs/>
      <BlogSection/>

       {/* ✅ Show ChatComponent only if logged in */}
       {isLoggedIn && (
        <div className="fixed bottom-5 right-5 z-50">
          <ChatComponent />
        </div>
      )}

    </div>
  );
};

export default LandingPage;
