import { X, PlusCircle } from "lucide-react"

export const AddPricingRuleModal = ({ isAddingPricingRule, setIsAddingPricingRule, handleAddPricingRule }) => {
  if (!isAddingPricingRule) {
    return null
  }

  return (
    <div className="fixed inset-0 black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add Pricing Rule</h2>
          <button onClick={() => setIsAddingPricingRule(false)} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const name = formData.get("name")
            const type = formData.get("type")
            const basePrice = Number.parseFloat(formData.get("basePrice"))
            const additionalPrice = type === "distance" ? Number.parseFloat(formData.get("additionalPrice")) : undefined
            const threshold = type === "value" ? Number.parseFloat(formData.get("threshold")) : undefined

            handleAddPricingRule({
              name,
              type,
              basePrice,
              additionalPrice,
              threshold,
              active: true,
            })
          }}
        >
          <div className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Rule Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g., Standard Shipping"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Pricing Type
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  defaultValue="flat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="flat">Flat Rate</option>
                  <option value="distance">Distance-based</option>
                  <option value="value">Order Value-based</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
                  Base Price ($)
                </label>
                <input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">
                  For flat rate, this is the fixed shipping cost. For distance-based, this is the starting price. For
                  value-based, set to 0 for free shipping.
                </p>
              </div>

              <div className="space-y-2" id="additionalPriceField">
                <label htmlFor="additionalPrice" className="block text-sm font-medium text-gray-700">
                  Additional Price per Mile ($)
                </label>
                <input
                  id="additionalPrice"
                  name="additionalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">Only applicable for distance-based pricing.</p>
              </div>

              <div className="space-y-2" id="thresholdField">
                <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
                  Order Value Threshold ($)
                </label>
                <input
                  id="threshold"
                  name="threshold"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="50.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">
                  Only applicable for order value-based pricing. The minimum order value for this rule to apply.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() => setIsAddingPricingRule(false)}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
