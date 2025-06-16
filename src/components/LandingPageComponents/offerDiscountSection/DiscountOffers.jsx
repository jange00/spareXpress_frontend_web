import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { IMAGE_PATHS } from "../../../common/imageConstant"
import MainOfferCard from "./MainOfferCard";
import FlashDealCard from "./FlashDealCard";

const DiscountOffers = () => {
  const [showAllFlashDeals, setShowAllFlashDeals] = useState(false);

  const mainOffers = [
    {
      id: 1,
      title: "Vehicle Accessories",
      discount: "30% OFF",
      description: "Premium auto parts and accessories for all models",
      image:IMAGE_PATHS.vehicle,
      bgColor: "from-yellow-500/90 to-yellow-600/90",
      validUntil: "2024-03-30",
      link: "/deals/auto-parts",
    },
    {
      id: 2,
      title: "Computer Components",
      discount: "25% OFF",
      description: "High-performance parts for your ultimate PC build",
      image: IMAGE_PATHS.computer,
      bgColor: "from-gray-800/90 to-gray-900/90",
      validUntil: "2024-03-25",
      link: "/deals/computer-parts",
    },
  ];

  const flashDeals = [
    {
      id: 1,
      title: "Gaming GPUs",
      discount: "15% OFF",
      originalPrice: 799.99,
      discountedPrice: 679.99,
      timeLeft: "48 hours",
      image: IMAGE_PATHS.cartool,
    },
    {
      id: 2,
      title: "Brake Kits",
      discount: "20% OFF",
      originalPrice: 299.99,
      discountedPrice: 239.99,
      timeLeft: "24 hours",
      image: IMAGE_PATHS.cartool,
    },
    {
      id: 3,
      title: "SSDs",
      discount: "25% OFF",
      originalPrice: 199.99,
      discountedPrice: 149.99,
      timeLeft: "72 hours",
      image: IMAGE_PATHS.cartool,
    },
    {
      id: 4,
      title: "SSDs",
      discount: "25% OFF",
      originalPrice: 199.99,
      discountedPrice: 149.99,
      timeLeft: "72 hours",
      image: IMAGE_PATHS.cartool,
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#212121] mb-4">
            Special Offers & Discounts
          </h2>
          <p className="text-lg text-gray-600">
            Incredible deals on auto parts and computer components. Limited time offers!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {mainOffers.map((offer) => (
            <MainOfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#ffc107]" />
              <h3 className="text-2xl font-bold text-[#212121]">Flash Deals</h3>
            </div>
            <button
              onClick={() => setShowAllFlashDeals(true)}
              className="text-[#212121] font-semibold hover:text-[#ffc107] transition-colors duration-300 flex items-center gap-2"
            >
              View All Deals
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(showAllFlashDeals ? flashDeals : flashDeals.slice(0, 3)).map((deal) => (
              <FlashDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountOffers;
