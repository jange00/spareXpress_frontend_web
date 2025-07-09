import { Truck, ChevronUp, ChevronDown, Clock } from "lucide-react"

export const ShippingMethodComponent = ({
  shippingMethods,
  selectedShipping,
  isExpanded,
  onToggle,
  onShippingSelect,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-[#FFB800]" />
          Shipping Method
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              className={`border ${selectedShipping.id === method.id ? "border-[#FFB800]" : "border-gray-200"} rounded-lg p-4 mb-3 relative cursor-pointer`}
              onClick={() => onShippingSelect(method)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedShipping.id === method.id}
                    onChange={() => onShippingSelect(method)}
                    className="h-4 w-4 text-[#FFB800] focus:ring-[#FFB800]"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <div className="flex items-center mt-1 text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">{method.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    {method.price === 0 ? "Free" : `Rs. ${method.price.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
