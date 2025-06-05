import { X } from "lucide-react"

export function MobileFiltersModal({ isOpen, onClose, selectedFilters, onFilterChange }) {
  if (!isOpen) return null

  const categories = [
    { id: "vehicle-parts", label: "Vehicle Parts" },
    { id: "computer-parts", label: "Computer Parts" },
  ]

  const subcategories = {
    "vehicle-parts": [
      { id: "engine-parts", label: "Engine Parts" },
      { id: "brakes", label: "Brake Systems" },
      { id: "transmission", label: "Transmission" },
      { id: "suspension", label: "Suspension" },
      { id: "electrical", label: "Electrical" },
      { id: "fuel-system", label: "Fuel System" },
    ],
    "computer-parts": [
      { id: "processors", label: "Processors" },
      { id: "storage", label: "Storage" },
      { id: "gpus", label: "Graphics Cards" },
      { id: "memory", label: "Memory" },
      { id: "cooling", label: "Cooling" },
      { id: "power-supply", label: "Power Supply" },
    ],
  }

  const brands = [
    { id: "Intel", label: "Intel" },
    { id: "AMD", label: "AMD" },
    { id: "NVIDIA", label: "NVIDIA" },
    { id: "Corsair", label: "Corsair" },
    { id: "ASUS", label: "ASUS" },
    { id: "MSI", label: "MSI" },
  ]

  const priceRanges = [
    { id: "0-100", label: "Under $100" },
    { id: "100-300", label: "$100 - $300" },
    { id: "300-500", label: "$300 - $500" },
    { id: "500-plus", label: "$500+" },
  ]

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full pb-32">
          {/* Category Filter */}
          <div className="mb-6 border-b pb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.categories.includes(cat.id)}
                      onChange={() => onFilterChange("categories", cat.id)}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-gray-700">{cat.label}</span>
                  </label>

                  {/* Show subcategories if category is selected */}
                  {selectedFilters.categories.includes(cat.id) && subcategories[cat.id] && (
                    <div className="ml-6 mt-2 space-y-2">
                      {subcategories[cat.id].map((sub) => (
                        <label key={sub.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.subcategories.includes(sub.id)}
                            onChange={() => onFilterChange("subcategories", sub.id)}
                            className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="text-gray-700">{sub.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6 border-b pb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Brand</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.brands.includes(brand.id)}
                    onChange={() => onFilterChange("brands", brand.id)}
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-gray-700">{brand.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6 border-b pb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.id}
                    checked={selectedFilters.priceRange === range.id}
                    onChange={() => onFilterChange("priceRange", range.id)}
                    className="text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button
            onClick={onClose}
            className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
