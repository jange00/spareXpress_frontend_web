import { useState, useEffect } from "react"
import { useGetAllProduct } from "./admin/useProduct/useGetAllProduct";

export function useProducts(initialFilters) {
  // const { data: product = [] } = useGetAllProduct();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState(initialFilters)

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      if (filterType === "categories" || filterType === "subcategories" || filterType === "brands") {
        const currentArray = prev[filterType]
        return {
          ...prev,
          [filterType]: currentArray.includes(value)
            ? currentArray.filter((item) => item !== value)
            : [...currentArray, value],
        }
      }

      return {
        ...prev,
        [filterType]: prev[filterType] === value ? "" : value,
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      subcategories: [],
      brands: [],
      priceRange: "",
      rating: "",
      availability: "",
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate sample products
        const sampleProducts = Array.from({ length: 12 }, (_, i) => {
          const isComputerPart = selectedFilters.categories.includes("computer-parts")
          const productCategory = isComputerPart ? "computer-parts" : "vehicle-parts"

          const productSubcategory = isComputerPart
            ? ["processors", "storage", "gpus", "memory", "cooling", "power-supply"][Math.floor(Math.random() * 6)]
            : ["engine-parts", "brakes", "transmission", "suspension", "electrical", "fuel-system"][
                Math.floor(Math.random() * 6)
              ]

          const productBrand = isComputerPart
            ? ["Intel", "AMD", "NVIDIA", "Corsair", "ASUS", "MSI"][Math.floor(Math.random() * 6)]
            : ["Toyota", "Honda", "Ford", "BMW", "Bosch", "Brembo"][Math.floor(Math.random() * 6)]

          return {
            id: i + 1,
            name: `${isComputerPart ? "Computer" : "Vehicle"} ${productSubcategory.replace(/-/g, " ")} ${i + 1}`,
            category: productCategory,
            subcategory: productSubcategory,
            brand: productBrand,
            price: Math.floor(Math.random() * 500) + 50,
            originalPrice: Math.floor(Math.random() * 600) + 100,
            rating: (Math.random() * 2 + 3).toFixed(1),
            reviews: Math.floor(Math.random() * 100) + 10,
            image: "/placeholder.svg?height=300&width=300",
            description: `High-quality ${isComputerPart ? "computer" : "vehicle"} component for optimal performance`,
            stock: Math.floor(Math.random() * 30) + 1,
            discount: Math.floor(Math.random() * 30) + 5,
            inStock: Math.random() > 0.2,
          }
        })

        // Apply filters
        let filteredProducts = sampleProducts

        if (selectedFilters.categories.length > 0) {
          filteredProducts = filteredProducts.filter((product) => selectedFilters.categories.includes(product.category))
        }

        if (selectedFilters.subcategories.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            selectedFilters.subcategories.includes(product.subcategory),
          )
        }

        if (selectedFilters.brands.length > 0) {
          filteredProducts = filteredProducts.filter((product) => selectedFilters.brands.includes(product.brand))
        }

        if (selectedFilters.priceRange) {
          const [min, max] = selectedFilters.priceRange.split("-").map(Number)
          if (selectedFilters.priceRange.includes("plus")) {
            filteredProducts = filteredProducts.filter((product) => product.price >= min)
          } else {
            filteredProducts = filteredProducts.filter((product) => product.price >= min && product.price <= max)
          }
        }

        if (selectedFilters.rating) {
          filteredProducts = filteredProducts.filter(
            (product) => Number(product.rating) >= Number(selectedFilters.rating),
          )
        }

        if (selectedFilters.availability === "In Stock") {
          filteredProducts = filteredProducts.filter((product) => product.inStock)
        }

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedFilters])

  return {
    products,
    loading,
    selectedFilters,
    handleFilterChange,
    clearFilters,
  }
}
