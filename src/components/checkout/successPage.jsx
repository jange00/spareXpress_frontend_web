import { CheckCircle, Mail, Truck, AlertCircle } from "lucide-react"

export const SuccessPage = ({
  orderNumber,
  orderSummary,
  selectedShipping,
  onContinueShopping,
  onViewOrderDetails,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>

      <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Order Number:</span>
          <span className="font-medium text-gray-900">{orderNumber}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Order Date:</span>
          <span className="font-medium text-gray-900">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-medium text-gray-900">${orderSummary.total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Delivery:</span>
          <span className="font-medium text-gray-900">{selectedShipping.estimatedDelivery}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Email Confirmation</h3>
            <p className="text-sm text-gray-600">We've sent a confirmation to your email address.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Track Your Order</h3>
            <p className="text-sm text-gray-600">You'll receive tracking information soon.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Need Help?</h3>
            <p className="text-sm text-gray-600">Contact our support team for assistance.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={onContinueShopping}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Continue Shopping
        </button>
        <button
          onClick={onViewOrderDetails}
          className="px-6 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90"
        >
          View Order Details
        </button>
      </div>
    </div>
  )
}
