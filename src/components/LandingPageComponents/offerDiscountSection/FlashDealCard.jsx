import { Timer } from "lucide-react";

const FlashDealCard = ({ deal }) => {
  return (
    <div className="group relative bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
      <div className="absolute top-4 right-4">
        <span className="bg-[#ffc107] text-[#212121] text-sm font-bold px-3 py-1 rounded-full">
          {deal.discount}
        </span>
      </div>

      <div className="mb-4">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h4 className="text-xl font-bold text-[#212121] mb-2">{deal.title}</h4>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-[#212121]">${deal.discountedPrice}</span>
        <span className="text-gray-500 line-through">${deal.originalPrice}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-500">
          <Timer className="w-4 h-4" />
          <span className="text-sm font-medium">Ends in {deal.timeLeft}</span>
        </div>
        <button className="bg-[#212121] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ffc107] hover:text-[#212121] transition-colors duration-300">
          Grab Deal
        </button>
      </div>
    </div>
  );
};

export default FlashDealCard;
