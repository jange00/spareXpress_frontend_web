import { useState } from "react"
import { Filter } from "lucide-react"
import { useProducts } from "../hook/useProducts"
import { FilterSidebar } from "../components/productListingComponent/filterSidebar"
import { MobileFiltersModal } from "../components/productListingComponent/mobileFiltersModal"
import { ProductGrid } from "../components/productListingComponent/productGrid"
import { useGetAllProduct } from "../hook/admin/useProduct/useGetAllProduct"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const initialFilters = {
    categories: [],
    subcategories: [],
    brands: [],
    priceRange: "",
    rating: "",
    availability: "",
  }
const { data: product = [] } = useGetAllProduct();

  const { products, loading, selectedFilters, handleFilterChange, clearFilters } = useProducts(initialFilters)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Browse our selection of high-quality products</p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full bg-white shadow rounded-lg p-3 flex items-center justify-center space-x-2 text-gray-700"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid
              products={product}
              loading={loading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}
