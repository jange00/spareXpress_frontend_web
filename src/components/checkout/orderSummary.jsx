import { useState } from "react"
import { ShoppingBag, ChevronUp, ChevronDown, PlusCircle, Info, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { StarRating } from "./starRating"

export const OrderSummaryComponent = ({
  cartItems,
  orderSummary,
  isExpanded,
  onToggle,
  onQuantityChange,
  onRemoveItem,
  onAddMoreItems,
  onContinueShopping,
}) => {
  const [showProductDetails, setShowProductDetails] = useState(null)

  const toggleProductDetails = (productId) => {
    setShowProductDetails(showProductDetails === productId ? null : productId)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2 text-[#FFB800]" />
          Order Summary ({orderSummary.itemCount} {orderSummary.itemCount === 1 ? "item" : "items"})
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {cartItems.length > 0 ? (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={onAddMoreItems}
                  className="flex items-center text-[#FFB800] hover:text-[#FFB800]/80 font-medium"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Add More Items
                </button>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="mb-6 last:mb-0">
                  <div className="flex items-start">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.brand} • {item.model}
                          </p>
                          <div className="mt-1">
                            <StarRating rating={item.rating} />
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-2 py-1 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="block text-sm text-gray-500 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-2">
                        <button
                          onClick={() => toggleProductDetails(item.id)}
                          className="text-sm text-[#FFB800] hover:text-[#FFB800]/80 flex items-center"
                        >
                          <Info className="w-4 h-4 mr-1" />
                          {showProductDetails === item.id ? "Hide details" : "View details"}
                        </button>
                      </div>

                      {showProductDetails === item.id && (
                        <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm">
                          <p className="text-gray-700 mb-2">{item.description}</p>

                          <div className="mb-2">
                            <h4 className="font-medium text-gray-900 mb-1">Specifications:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                              {Object.entries(item.specifications).map(([key, value]) => (
                                <li key={key} className="text-gray-600">
                                  <span className="font-medium">{key}:</span> {value}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-2">
                            <h4 className="font-medium text-gray-900 mb-1">Features:</h4>
                            <ul className="list-disc list-inside">
                              {item.features.map((feature, index) => (
                                <li key={index} className="text-gray-600">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Compatible with:</h4>
                            <p className="text-gray-600">{item.compatibility.join(", ")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {item !== cartItems[cartItems.length - 1] && <hr className="my-4 border-gray-200" />}
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${orderSummary.subtotal}</span>
                </div>
                {Number.parseFloat(orderSummary.discount) > 0 && (
                  <div className="flex justify-between py-2 text-green-600">
                    <span>Discount</span>
                    <span>-${orderSummary.discount}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {Number.parseFloat(orderSummary.shipping) === 0 ? "Free" : `$${orderSummary.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="text-gray-900">${orderSummary.tax}</span>
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200 mt-2">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">${orderSummary.total}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
              <p className="text-gray-600 mb-4">Looks like you haven't added any items to your cart yet.</p>
              <button
                onClick={onContinueShopping}
                className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
