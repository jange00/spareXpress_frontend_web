import { useState } from "react"
import { Gift, ChevronUp, ChevronDown, CheckCircle, X } from "lucide-react"

export const CouponSection = ({ coupons, appliedCoupon, isExpanded, onToggle, onApplyCoupon, onRemoveCoupon }) => {
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")

  const handleApplyCoupon = () => {
    const coupon = coupons.find((c) => c.code === couponCode)
    if (!coupon) {
      setCouponError("Invalid coupon code")
      return
    }

    onApplyCoupon(couponCode)
    setCouponError("")
    setCouponCode("")
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Gift className="w-5 h-5 mr-2 text-[#FFB800]" />
          Apply Coupon
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {!appliedCoupon ? (
            <div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-r-md hover:bg-[#FFB800]/90"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="mt-1 text-sm text-red-600">{couponError}</p>}

              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Available Coupons</h3>
                {coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="border border-gray-200 rounded-lg p-3 mb-2 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{coupon.code}</span>
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          {coupon.type === "percentage" ? `${coupon.discount}% OFF` : "FREE SHIPPING"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCouponCode(coupon.code)
                        handleApplyCoupon()
                      }}
                      className="text-[#FFB800] hover:text-[#FFB800]/80 text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">{appliedCoupon.code} applied!</h3>
                  <p className="text-sm text-gray-600">
                    {appliedCoupon.type === "percentage"
                      ? `${appliedCoupon.discount}% discount applied to your order.`
                      : "Free shipping applied to your order."}
                  </p>
                </div>
              </div>
              <button onClick={onRemoveCoupon} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
