import { Heart, Trash2, Plus, Minus } from "lucide-react"

export const CartItem = ({ item, onQuantityChange, onRemoveItem, onSaveForLater }) => {
  return (
    <div className="flex border-b border-gray-200 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
        <img
          src={item.image || "/placeholder.svg?height=80&width=80"}
          alt={item.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-[#212121] line-clamp-2 hover:text-[#ffc107] cursor-pointer transition-colors">
            {item.name}
          </h4>
          <div className="flex space-x-1">
            <button
              onClick={() => onSaveForLater(item)}
              className="text-gray-400 hover:text-[#ffc107] transition-colors p-1 hover:bg-gray-100 rounded-full"
              title="Save for later"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-gray-100 rounded-full"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-2">{item.variant || ""}</div>

        <div className="flex justify-between items-center">
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="p-1 bg-gray-100 text-[#212121] hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="p-1 bg-gray-100 text-[#212121] hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="font-bold text-[#212121]">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
