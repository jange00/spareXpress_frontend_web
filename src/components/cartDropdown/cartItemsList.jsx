import { Truck } from "lucide-react"
import { CartItem } from "./cartItem"
import { RecommendedProducts } from "./recommendedProducts"

export const CartItemsList = ({ cartItems, onQuantityChange, onRemoveItem, onSaveForLater }) => {
  // Get estimated delivery date (3-5 business days from now)
  const getEstimatedDelivery = () => {
    const today = new Date()
    const minDelivery = new Date(today)
    minDelivery.setDate(today.getDate() + 3)

    const maxDelivery = new Date(today)
    maxDelivery.setDate(today.getDate() + 5)

    const options = { month: "short", day: "numeric" }
    return `${minDelivery.toLocaleDateString("en-US", options)} - ${maxDelivery.toLocaleDateString("en-US", options)}`
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemoveItem={onRemoveItem}
          onSaveForLater={onSaveForLater}
        />
      ))}

      {/* Estimated Delivery */}
      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Truck className="w-4 h-4 mr-2 text-[#ffc107]" />
        <div>
          <span className="font-medium">Estimated Delivery:</span> {getEstimatedDelivery()}
        </div>
      </div>

      {/* Recommended Products */}
      {cartItems.length > 0 && <RecommendedProducts />}
    </div>
  )
}
