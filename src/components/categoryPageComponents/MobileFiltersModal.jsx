const MobileFiltersModal = ({
    filters,
    selectedFilters,
    onFilterChange,
    clearFilters,
    onClose,
    filteredCount,
  }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
        <div className="bg-white flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-[#ffc107]"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
  
        <div className="p-4 overflow-y-auto flex-grow space-y-6">
          {/* Brands */}
          <div>
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
  
          {/* Price Range */}
          <div>
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
  
          {/* Rating */}
          <div>
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
  
          {/* Availability */}
          <div>
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
  
        <div className="p-4 border-t bg-white flex justify-between items-center">
          <button
            onClick={clearFilters}
            className="text-sm text-[#ffc107] hover:text-[#ffcd38]"
            disabled={
              !(
                selectedFilters.brands.length ||
                selectedFilters.priceRange ||
                selectedFilters.rating ||
                selectedFilters.availability
              )
            }
          >
            Clear Filters
          </button>
          <div>{filteredCount} items found</div>
          <button
            onClick={onClose}
            className="bg-[#ffc107] text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Apply
          </button>
        </div>
      </div>
    )
  }
  
  export default MobileFiltersModal
  