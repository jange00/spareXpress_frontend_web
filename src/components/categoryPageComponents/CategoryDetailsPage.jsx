import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Breadcrumbs from "./Breadcrumbs"
import Filters from "./Filters"
import ProductsSection from "./ProductsSection"
import MobileFiltersModal from "./MobileFiltersModal"

const CategoryDetailsPage = () => {
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

  // Sample data filters
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

  // Fetch products (simulate API)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        await new Promise((r) => setTimeout(r, 1000))
        const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: `${category === "auto-parts" ? "Auto" : "Computer"} Part ${i + 1}`,
          description: "High-quality component for optimal performance",
          price: Math.floor(Math.random() * 200) + 50,
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviews: Math.floor(Math.random() * 500),
          brand: filters.brands[Math.floor(Math.random() * filters.brands.length)],
          image: `/assets/${category}${i + 1}.png`,
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

  // Handle filters change
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      if (filterType === "brands") {
        const brands = prev.brands.includes(value)
          ? prev.brands.filter((b) => b !== value)
          : [...prev.brands, value]
        return { ...prev, brands }
      }
      return { ...prev, [filterType]: value }
    })
  }

  // Clear filters
  const clearFilters = () => {
    setSelectedFilters({ brands: [], priceRange: "", rating: "", availability: "" })
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (selectedFilters.brands.length && !selectedFilters.brands.includes(product.brand)) return false
      if (selectedFilters.rating && product.rating < Number(selectedFilters.rating)) return false
      if (selectedFilters.availability === "In Stock" && !product.inStock) return false
      if (selectedFilters.availability === "Out of Stock" && product.inStock) return false
      if (selectedFilters.priceRange) {
        const [min, max] = selectedFilters.priceRange.split("-")
        if (max === "plus") {
          if (product.price < Number(min)) return false
        } else if (product.price < Number(min) || product.price > Number(max)) return false
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs category={category} categoryInfo={categoryInfo} />

      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryInfo[category]?.title}</h1>
          <p className="text-gray-600">{categoryInfo[category]?.description}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64">
            <Filters
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              clearFilters={clearFilters}
            />
          </div>

          {/* Products Section */}
          <ProductsSection
            loading={loading}
            products={filteredProducts}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showFilters={() => setShowFilters(true)}
            filteredCount={filteredProducts.length}
          />
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <MobileFiltersModal
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          onClose={() => setShowFilters(false)}
          filteredCount={filteredProducts.length}
        />
      )}
    </div>
  )
}

export default CategoryDetailsPage
