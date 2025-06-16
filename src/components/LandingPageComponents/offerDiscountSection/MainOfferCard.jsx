import { Link } from "react-router-dom";
import { Tag, Timer, ArrowRight } from "lucide-react";

const MainOfferCard = ({ offer }) => {
  return (
    <Link
      to={offer.link}
      className="group relative overflow-hidden rounded-2xl h-[300px]"
    >
      <div className="absolute inset-0">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${offer.bgColor}`} />
      </div>

      <div className="relative h-full p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-[#ffc107]" />
            <span className="text-white/90 font-medium">Limited Time Offer</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{offer.title}</h3>
          <p className="text-5xl font-extrabold text-[#ffc107] mb-4">{offer.discount}</p>
          <p className="text-white/90 text-lg max-w-md">{offer.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90">
            <Timer className="w-5 h-5" />
            <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
          </div>
          <button className="bg-white text-[#212121] px-6 py-2 rounded-full font-semibold flex items-center gap-2 group-hover:bg-[#ffc107] transition-colors duration-300">
            Shop Now
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MainOfferCard;
