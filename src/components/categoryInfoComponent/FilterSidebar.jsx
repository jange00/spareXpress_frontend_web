export default function FilterSidebar({ filters, selectedFilters, onFilterChange, onClearFilters }) {
  const hasActiveFilters = Object.values(selectedFilters).some((f) => (Array.isArray(f) ? f.length > 0 : f !== ""))

  return (
    <div className="w-64 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <button onClick={onClearFilters} className="text-sm text-[#ffc107] hover:text-[#ffcd38]">
              Clear all
            </button>
          )}
        </div>

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
    </div>
  )
}
