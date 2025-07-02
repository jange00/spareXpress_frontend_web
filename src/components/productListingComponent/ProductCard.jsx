import React from "react"
import { Star, ShoppingCart } from "lucide-react"
// import { IMAGE_PATHS } from "../../common/imageConstant"
import { Link } from "react-router-dom"

export function ProductCard({ product, viewMode }) {
  return (
    <div
      className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${
        viewMode === "list" ? "flex" : "block"
      }`}
    >
      <div className={`${viewMode === "list" ? "w-48 shrink-0" : ""}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={`http://localhost:3000/${product.image[0]}` || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-yellow-500">{product.brand}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(Number(product.rating)) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-1 text-gray-900 hover:text-yellow-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/product/${product._id}`}
              className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              View Details
            </Link>
            <button
              className="bg-gray-900 text-white p-2 rounded-full hover:bg-yellow-500 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
