import { Filter, Grid, List } from "lucide-react"

export default function Toolbar({ viewMode, onViewModeChange, onShowFilters, productCount, sortBy, onSortChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onShowFilters}
            className="lg:hidden flex items-center space-x-1 text-gray-600 hover:text-gray-900"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-gray-100 text-[#ffc107]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-gray-100 text-[#ffc107]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{productCount}</span> products
          </p>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border-gray-300 rounded-lg focus:ring-[#ffc107] focus:border-[#ffc107]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  )
}
