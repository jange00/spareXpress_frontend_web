import { DollarSign, Settings, PlusCircle } from "lucide-react"

export const DeliveryCostSection = ({ pricingRules, handleTogglePricingRule, setIsAddingPricingRule }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Delivery Cost Management</h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">Configure pricing rules for different delivery scenarios</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {pricingRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex-1">
                <h4 className="font-medium">{rule.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {rule.type === "flat" && `Flat rate: $${rule.basePrice.toFixed(2)}`}
                  {rule.type === "distance" &&
                    `Base: $${rule.basePrice.toFixed(2)} + $${rule.additionalPrice?.toFixed(2)} per mile`}
                  {rule.type === "value" &&
                    rule.threshold &&
                    (rule.basePrice === 0
                      ? `Free shipping on orders over $${rule.threshold.toFixed(2)}`
                      : `$${rule.basePrice.toFixed(2)} shipping on orders over $${rule.threshold.toFixed(2)}`)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`rule-${rule.id}`}
                    checked={rule.active}
                    onChange={() => handleTogglePricingRule(rule.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`rule-${rule.id}`} className="ml-2 text-sm text-gray-700">
                    {rule.active ? "Active" : "Inactive"}
                  </label>
                </div>
                <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={() => setIsAddingPricingRule(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          Add Pricing Rule
        </button>
      </div>
    </div>
  )
}
