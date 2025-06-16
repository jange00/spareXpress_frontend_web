import { Grid, List } from "lucide-react"
import { ProductCard } from "./ProductCard"
import { LoadingSkeleton } from "./loadingSkeleton"

export function ProductGrid({ products, loading, viewMode, onViewModeChange, onClearFilters }) {
  if (loading) {
    return <LoadingSkeleton />
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium" onClick={onClearFilters}>
          Clear All Filters
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-gray-100 text-yellow-500" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-gray-100 text-yellow-500" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <span className="text-gray-600">
            Showing <span className="font-medium">{products.length}</span> products
          </span>
        </div>
        <select className="border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-sm">
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Rated</option>
          <option>Newest</option>
        </select>
      </div>

      {/* Products */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>
    </>
  )
}
