import { ChevronRight, Shield, Clock } from "lucide-react"

export const CartSummary = ({ cartItems, onClose }) => {
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    // In a real app, this would navigate to the checkout page
    window.location.href = "/checkout"
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium">
            {shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Tax:</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base pt-2 border-t border-gray-200">
          <span className="font-bold text-[#212121]">Total:</span>
          <span className="font-bold text-[#212121]">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-[#212121] text-white font-bold rounded-full hover:bg-[#424242] transition-colors shadow-md flex items-center justify-center"
        >
          Checkout <ChevronRight className="w-4 h-4 ml-1" />
        </button>
        <button
          onClick={onClose}
          className="w-full py-2 border border-gray-300 text-[#212121] font-medium rounded-full hover:bg-gray-100 transition-colors"
        >
          Continue Shopping
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex items-center">
          <Shield className="w-3 h-3 mr-1" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>24/7 Customer Support</span>
        </div>
      </div>
    </div>
  )
}
