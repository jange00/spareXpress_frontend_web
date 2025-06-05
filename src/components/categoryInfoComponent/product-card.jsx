import { Link } from "react-router-dom"
import { Star } from "lucide-react"

export default function ProductCard({ product, viewMode }) {
  return (
    <div
      className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "aspect-w-4 aspect-h-3"}`}>
          <img
            src={product.image || "/placeholder.svg?height=200&width=300"}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-[#ffc107] fill-[#ffc107]" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            <button className="bg-[#ffc107] text-gray-900 px-4 py-2 rounded-lg hover:bg-[#ffcd38] transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
