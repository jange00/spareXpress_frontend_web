import { Star, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function RelatedProducts({ products }) {
  console.log(products);
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            state={{ productData: product }}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <img
                src={product.image || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 hover:text-yellow-500 transition-colors">{product.name}</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <button
                  className="bg-gray-900 text-white p-2 rounded-full hover:bg-yellow-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    // Add to cart logic
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
