import { useState } from "react"
import { Star, ShoppingCart, Heart, Share2, Plus, Minus, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { usePostCart } from "../../hook/admin/useCart/usePostCart"

export default function ProductInfo({ product, onBuyNow }) {
  console.log(product?._id)
  const [quantity, setQuantity] = useState(1)

  const {mutate}=usePostCart()

  const addtocart=()=>{
    mutate({"productId":product?._id})

    
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }
  const originalPrice = product.price;
const discount = product.discount || 0;
const discountedPrice = originalPrice - (originalPrice * discount) / 100;


  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          {/* <span className="text-sm text-gray-600">SKU: 20</span> */}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-gray-600">Brand:</span>
          <Link to={`/products?brand=${product.brandId.title}`} className="font-medium hover:text-yellow-500">
            {product.brand}
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">Model:</span>
          {/* <span className="font-medium">20</span> */}
        </div>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Rating */}
      {/* <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">({product.reviews} reviews)</span>
      </div> */}

      {/* Price */}
      <div className="space-y-2">
  <div className="flex items-center space-x-4">
    <span className="text-3xl font-bold text-gray-900">
      Rs.{discount > 0 ? discountedPrice.toFixed(2) : originalPrice.toFixed(2)}
    </span>
    {discount > 0 && (
      <>
        <span className="text-xl text-gray-500 line-through">Rs.{originalPrice.toFixed(2)}</span>
        <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          Save {discount}%
        </span>
      </>
    )}
  </div>
  <p className="text-green-500 flex items-center">
    <Check className="w-4 h-4 mr-1" />
    In stock ({product.stock} units)
  </p>
</div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Quantity:</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 border-x">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={quantity >= product.stock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button onClick={addtocart} className="flex-1 bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-yellow-600 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={() => onBuyNow(quantity)}
          className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Buy Now
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
