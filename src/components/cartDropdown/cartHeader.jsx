import { ShoppingCart, X } from "lucide-react"

export const CartHeader = ({ cartItemsCount, onClose }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#ffc107]">
      <div className="flex items-center">
        <ShoppingCart className="w-6 h-6 text-[#212121] mr-2" />
        <h2 className="text-xl font-bold text-[#212121]">Your Cart ({cartItemsCount})</h2>
      </div>
      <button
        onClick={onClose}
        className="text-[#212121] hover:text-[#424242] transition-colors p-1 hover:bg-yellow-200 rounded-full"
        aria-label="Close cart"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  )
}