import { ShoppingCart } from "lucide-react"

export const EmptyCart = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-[#212121] mb-2">Your cart is empty</h3>
      <p className="text-gray-500 mb-6">{"Looks like you haven't added any items to your cart yet."}</p>
      <button
        onClick={onClose}
        className="px-6 py-2 bg-[#ffc107] text-[#212121] font-bold rounded-full hover:bg-yellow-600 transition-colors shadow-md"
      >
        Continue Shopping
      </button>
    </div>
  )
}
