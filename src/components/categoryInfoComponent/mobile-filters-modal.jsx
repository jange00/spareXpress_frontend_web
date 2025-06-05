import { X } from "lucide-react"

export default function MobileFiltersModal({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onFilterChange,
  productCount,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto h-full pb-32">
          {/* Brand Filter */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Brands</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filters.brands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.brands.includes(brand)}
                    onChange={() => onFilterChange("brands", brand)}
                    className="rounded border-gray-300 text-[#ffc107] focus:ring-[#ffc107]"
                  />
                  <span className="text-sm text-gray-600">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="space-y-2">
              {filters.priceRanges.map((range) => (
                <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={selectedFilters.priceRange === range.value}
                    onChange={(e) => onFilterChange("priceRange", e.target.value)}
                    className="text-[#ffc107] focus:ring-[#ffc107]"
                  />
                  <span className="text-sm text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Rating</h3>
            <div className="space-y-2">
              {filters.ratings.map((rating) => (
                <label key={rating.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={selectedFilters.rating === rating.value}
                    onChange={(e) => onFilterChange("rating", e.target.value)}
                    className="text-[#ffc107] focus:ring-[#ffc107]"
                  />
                  <span className="text-sm text-gray-600">{rating.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Availability</h3>
            <div className="space-y-2">
              {filters.availability.map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={status}
                    checked={selectedFilters.availability === status}
                    onChange={(e) => onFilterChange("availability", e.target.value)}
                    className="text-[#ffc107] focus:ring-[#ffc107]"
                  />
                  <span className="text-sm text-gray-600">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#ffc107] text-gray-900 py-2 rounded-lg hover:bg-[#ffcd38] transition-colors"
          >
            Show Results ({productCount})
          </button>
        </div>
      </div>
    </div>
  )
}
