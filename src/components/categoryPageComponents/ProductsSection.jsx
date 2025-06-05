import { useState } from "react"

const ProductsSection = ({
  loading,
  products,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  showFilters,
  filteredCount,
}) => {
  return (
    <div className="flex-1">
      {/* Top controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="lg:hidden px-3 py-2 bg-[#ffc107] text-white rounded-md"
          onClick={showFilters}
          aria-label="Open filters"
        >
          Filters
        </button>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded border ${
                viewMode === "grid" ? "border-[#ffc107]" : "border-transparent"
              }`}
              aria-label="Grid view"
            >
              {/* Icon or text */}
              <span className="text-[#ffc107]">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded border ${
                viewMode === "list" ? "border-[#ffc107]" : "border-transparent"
              }`}
              aria-label="List view"
            >
              <span className="text-[#ffc107]">List</span>
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-1 text-sm"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="text-gray-600 text-sm">{filteredCount} items found</div>
      </div>

      {/* Product list */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-[#ffc107] font-bold">${product.price}</div>
                <div className="text-yellow-500 text-sm">
                  ★ {product.rating} ({product.reviews})
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-24 w-24 object-contain"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="text-[#ffc107] font-bold mt-auto">${product.price}</div>
              </div>
              <div className="text-yellow-500 text-sm">
                ★ {product.rating} ({product.reviews})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsSection
