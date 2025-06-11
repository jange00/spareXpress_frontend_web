import { SearchIcon } from "./icons"

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  brandFilter,
  setBrandFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  categories,
  brands,
}) => {
  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-")
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        />
      </div>

      {/* Category Filter */}
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category === "auto-parts" ? "Auto Parts" : "Computer Parts"}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        >
          <option value="">All Brands</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div>
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={handleSortChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="stock-asc">Stock (Low to High)</option>
          <option value="stock-desc">Stock (High to Low)</option>
          <option value="popularity-desc">Popularity (High to Low)</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
