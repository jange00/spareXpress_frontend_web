import { useState, useEffect } from "react"
import ActionBar from "../../components/admin/ProductManagement/actionBar"
import FilterBar from "../../components/admin/productManagement/filterBar"
import ProductTable from "../../components/admin/productManagement/productTable"
import ProductModal from "../../components/admin/ProductManagement/productModal"
import BulkActionModal from "../../components/admin/productManagement/bulkActionModal"
import { initialProducts } from "../../components/admin/productManagement/sampleData"

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [brandFilter, setBrandFilter] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState("")
  const [bulkValue, setBulkValue] = useState("")
  const [selectAll, setSelectAll] = useState(false)

  // Get unique categories and brands for filters
  const categories = [...new Set(products.map((product) => product.category))]
  const brands = [...new Set(products.map((product) => product.brand))]

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Apply brand filter
    if (brandFilter) {
      result = result.filter((product) => product.brand === brandFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      if (sortBy === "price") {
        comparison = a.price - b.price
      } else if (sortBy === "stock") {
        comparison = a.stock - b.stock
      } else if (sortBy === "popularity") {
        comparison = b.reviews - a.reviews
      } else {
        comparison = a.name.localeCompare(b.name)
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredProducts(result)
  }, [products, searchTerm, categoryFilter, brandFilter, sortBy, sortOrder])

  // Handle adding a new product
  const handleAddProduct = () => {
    setCurrentProduct({
      id: products.length + 1,
      name: "",
      category: "",
      subcategory: "",
      brand: "",
      model: "",
      price: 0,
      originalPrice: 0,
      rating: 0,
      reviews: 0,
      image: "/placeholder.svg?height=300&width=300",
      badge: "",
      description: "",
      stock: 0,
      discount: 0,
      inStock: true,
      specifications: {},
      features: [],
      compatibility: [],
    })
    setIsModalOpen(true)
  }

  // Handle editing a product
  const handleEditProduct = (product) => {
    setCurrentProduct({ ...product })
    setIsModalOpen(true)
  }

  // Handle saving a product
  const handleSaveProduct = (formData) => {
    if (formData.id) {
      // Update existing product
      setProducts(products.map((p) => (p.id === formData.id ? formData : p)))
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: products.length + 1,
      }
      setProducts([...products, newProduct])
    }
    setIsModalOpen(false)
  }

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  // Handle bulk selection
  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle bulk actions
  const handleBulkAction = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product")
      return
    }

    setBulkAction("")
    setBulkValue("")
    setIsBulkModalOpen(true)
  }

  // Apply bulk actions
  const applyBulkAction = () => {
    if (bulkAction === "delete") {
      if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
        setProducts(products.filter((p) => !selectedProducts.includes(p.id)))
        setSelectedProducts([])
      }
    } else if (bulkAction === "price") {
      const newPrice = Number.parseFloat(bulkValue)
      if (isNaN(newPrice) || newPrice < 0) {
        alert("Please enter a valid price")
        return
      }

      setProducts(
        products.map((p) => {
          if (selectedProducts.includes(p.id)) {
            return { ...p, price: newPrice }
          }
          return p
        }),
      )
    } else if (bulkAction === "stock") {
      if (bulkValue === "out") {
        setProducts(
          products.map((p) => {
            if (selectedProducts.includes(p.id)) {
              return { ...p, stock: 0, inStock: false }
            }
            return p
          }),
        )
      }
    }

    setIsBulkModalOpen(false)
    setSelectedProducts([])
    setSelectAll(false)
  }

  // Import/Export functions
  const handleImportProducts = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const importedProducts = JSON.parse(event.target.result)
            setProducts([...products, ...importedProducts])
            alert(`Successfully imported ${importedProducts.length} products`)
          } catch (error) {
            alert("Error importing products. Please check the file format.")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleExportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "products.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Actions & Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <ActionBar
            onAddProduct={handleAddProduct}
            onImportProducts={handleImportProducts}
            onExportProducts={handleExportProducts}
            onBulkAction={handleBulkAction}
            selectedCount={selectedProducts.length}
          />

          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            categories={categories}
            brands={brands}
          />
        </div>
      </div>

      {/* Product List Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <ProductTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSelectProduct={handleSelectProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsModalOpen(false)}
          categories={categories}
          brands={brands}
        />
      )}

      {/* Bulk Action Modal */}
      {isBulkModalOpen && (
        <BulkActionModal
          selectedCount={selectedProducts.length}
          onApply={applyBulkAction}
          onClose={() => setIsBulkModalOpen(false)}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          bulkValue={bulkValue}
          setBulkValue={setBulkValue}
        />
      )}
    </div>
  )
}

export default ProductManagement
