import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Breadcrumb from "../components/breadcrumb"
import FilterSidebar from "../components/filter-sidebar"
import Toolbar from "../components/toolbar"
import ProductGrid from "../components/product-grid"
import MobileFiltersModal from "../components/mobile-filters-modal"

export default function CategoryDetailsPage() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    priceRange: "",
    rating: "",
    availability: "",
  })
  const [sortBy, setSortBy] = useState("featured")

  // Sample data - Replace with your actual data
  const filters = {
    brands: ["Toyota", "Honda", "Ford", "BMW", "Intel", "AMD", "Nvidia", "Corsair"],
    priceRanges: [
      { label: "Under $50", value: "0-50" },
      { label: "$50 - $100", value: "50-100" },
      { label: "$100 - $200", value: "100-200" },
      { label: "$200+", value: "200-plus" },
    ],
    ratings: [
      { label: "4★ & above", value: "4" },
      { label: "3★ & above", value: "3" },
      { label: "2★ & above", value: "2" },
    ],
    availability: ["In Stock", "Out of Stock"],
  }

  // Sample products data - Replace with your API call
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Replace this with your actual API call
        const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: `${category === "auto-parts" ? "Auto" : "Computer"} Part ${i + 1}`,
          description: "High-quality component for optimal performance",
          price: Math.floor(Math.random() * 200) + 50,
          rating: Number((Math.random() * 2 + 3).toFixed(1)),
          reviews: Math.floor(Math.random() * 500),
          brand: filters.brands[Math.floor(Math.random() * filters.brands.length)],
          image: `/placeholder.svg?height=200&width=300`,
          inStock: Math.random() > 0.2,
        }))
        setProducts(sampleProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      if (filterType === "brands") {
        const brands = prev.brands.includes(value)
          ? prev.brands.filter((brand) => brand !== value)
          : [...prev.brands, value]
        return { ...prev, brands }
      }
      return { ...prev, [filterType]: value }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      brands: [],
      priceRange: "",
      rating: "",
      availability: "",
    })
  }

  const filteredProducts = products
    .filter((product) => {
      if (selectedFilters.brands.length && !selectedFilters.brands.includes(product.brand)) return false
      if (selectedFilters.rating && product.rating < Number.parseFloat(selectedFilters.rating)) return false
      if (selectedFilters.availability === "In Stock" && !product.inStock) return false
      if (selectedFilters.availability === "Out of Stock" && product.inStock) return false
      if (selectedFilters.priceRange) {
        const [min, max] = selectedFilters.priceRange.split("-").map(Number)
        if (selectedFilters.priceRange.includes("plus")) {
          if (product.price < min) return false
        } else if (product.price < min || product.price > max) return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const categoryInfo = {
    "auto-parts": {
      title: "Auto Parts",
      description: "Find genuine parts for your vehicle",
      breadcrumbs: ["Home", "Categories", "Auto Parts"],
    },
    "computer-parts": {
      title: "Computer Parts",
      description: "Build your perfect PC setup",
      breadcrumbs: ["Home", "Categories", "Computer Parts"],
    },
    "best-sellers": {
      title: "Best Sellers",
      description: "Most popular parts and components",
      breadcrumbs: ["Home", "Categories", "Best Sellers"],
    },
    deals: {
      title: "Special Deals",
      description: "Limited time offers and discounts",
      breadcrumbs: ["Home", "Categories", "Special Deals"],
    },
  }

  const currentCategory = categoryInfo[category] || {}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb items={currentCategory.breadcrumbs || []} />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory.title}</h1>
          <p className="text-gray-600">{currentCategory.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            <Toolbar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onShowFilters={() => setShowFilters(true)}
              productCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <ProductGrid products={filteredProducts} viewMode={viewMode} loading={loading} />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        productCount={filteredProducts.length}
      />
    </div>
  )
}