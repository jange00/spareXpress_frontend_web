import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, Share2, Star } from "lucide-react";

const ProductCard = ({
  product,
  hoveredProduct,
  setHoveredProduct,
  onClick,
  onAddToCart,
  onWishlist,
  onShare
}) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-yellow-500 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          {product.badge}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            hoveredProduct === product.id ? "opacity-100" : "opacity-0"
          }`}
        >
          <button onClick={(e) => onWishlist(e, product.id)} className="action-btn">
            <Heart className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClick(product); }} className="action-btn">
            <Eye className="w-5 h-5" />
          </button>
          <button onClick={(e) => onShare(e, product.id)} className="action-btn">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-sm text-yellow-500 font-medium">
            {product.category === "auto-parts" ? "Auto Parts" : "Computer Parts"}
          </p>
          <h3 className="text-lg font-bold text-gray-900 hover:text-yellow-500 transition-colors duration-300 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 truncate mt-1">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>

        {/* Stock */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Available Stock:</span>
            <span className={`font-medium ${product.stock < 10 ? "text-red-500" : "text-green-500"}`}>
              {product.stock} units
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-yellow-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(product.stock / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          </div>
          <button
            onClick={(e) => onAddToCart(e, product)}
            className="flex items-center justify-center bg-gray-900 hover:bg-yellow-500 text-white hover:text-gray-900 rounded-full w-10 h-10 transition-all duration-300 transform hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick View */}
      <div className="absolute inset-x-0 -bottom-12 group-hover:bottom-0 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <Link
          to={`/product/${product.id}`}
          state={{ productData: product }}
          className="bg-yellow-500 text-gray-900 w-full py-3 text-center font-semibold hover:bg-yellow-400 transition-colors duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Quick View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
