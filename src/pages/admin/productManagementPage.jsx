import { useState, useEffect } from "react"
import {
  mockProducts,
  mockCategories,
  mockBrands,
  getCategoryName,
  getBrandName,
} from "../../components/admin/ProductManagement/mockData"
import ProductTable from "../../components/admin/ProductManagement/ProductTables"
import Button from "../../components/admin/UIs/productUI/Button"
import Input from "../../components/admin/UIs/productUI/Input"
import Dropdown from "../../components/admin/UIs/productUI/Dropdown"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/admin/UIs/productUI/Card"
import Badge from "../../components/admin/UIs/productUI/Badge"
import AddEditProductModal from "../../components/admin/ProductManagement/modal/add-edit-product-modal"
import ViewProductModal from "../../components/admin/ProductManagement/modal/view-product-modal"
import {
  SearchIcon,
  PlusIcon,
  UploadIcon,
  DownloadIcon,
  FilterIcon,
  PackageIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
} from "../../components/admin/icons/Icons"

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [brandFilter, setBrandFilter] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewingProduct, setViewingProduct] = useState(null)

  // Selection states
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Filter and sort products
  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, categoryFilter, brandFilter, sortBy, sortOrder])

  // Update selectAll state based on filtered products
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const allSelected = filteredProducts.every((product) => selectedProducts.includes(product._id))
      setSelectAll(allSelected)
    } else {
      setSelectAll(false)
    }
  }, [selectedProducts, filteredProducts])

  const filterAndSortProducts = () => {
    let result = [...products]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getCategoryName(product.categoryId).toLowerCase().includes(searchTerm.toLowerCase()) ||
          getBrandName(product.brandId).toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((product) => product.categoryId === categoryFilter)
    }

    // Apply brand filter
    if (brandFilter) {
      result = result.filter((product) => product.brandId === brandFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "price":
          comparison = a.price - b.price
          break
        case "stock":
          comparison = a.stock - b.stock
          break
        case "createdAt":
          comparison = new Date(a.createdAt) - new Date(b.createdAt)
          break
        case "name":
        default:
          comparison = a.name.localeCompare(b.name)
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredProducts(result)
  }

  // Product CRUD operations
  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsFormModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsFormModalOpen(true)
  }

  const handleViewProduct = (product) => {
    setViewingProduct(product)
    setIsViewModalOpen(true)
  }

  const handleSaveProduct = async (formData) => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      if (editingProduct) {
        // Update existing product
        const updatedProduct = {
          ...editingProduct,
          ...formData,
          updatedAt: new Date().toISOString(),
        }
        setProducts(products.map((p) => (p._id === editingProduct._id ? updatedProduct : p)))
      } else {
        // Create new product
        const newProduct = {
          ...formData,
          _id: `prod${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        setProducts([...products, newProduct])
        console.log(products)
      }
      setIsFormModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p._id !== productId))
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  // Selection handlers
  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p._id))
    }
  }

  // Bulk operations
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setProducts(products.filter((p) => !selectedProducts.includes(p._id)))
      setSelectedProducts([])
    }
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
            const newProducts = importedProducts.map((product) => ({
              ...product,
              _id: `prod${Date.now()}_${Math.random()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }))
            setProducts([...products, ...newProducts])
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

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", `products_${new Date().toISOString().split("T")[0]}.json`)
    linkElement.click()
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("")
    setBrandFilter("")
    setSortBy("name")
    setSortOrder("asc")
  }

  // Prepare dropdown options
  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...mockCategories.map((cat) => ({
      value: cat._id,
      label: cat.name,
    })),
  ]

  const brandOptions = [
    { value: "", label: "All Brands" },
    ...mockBrands.map((brand) => ({
      value: brand._id,
      label: brand.name,
    })),
  ]

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
    { value: "stock-asc", label: "Stock (Low to High)" },
    { value: "stock-desc", label: "Stock (High to Low)" },
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
  ]

  // Calculate statistics
  const stats = {
    total: products.length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  }

  const hasActiveFilters = searchTerm || categoryFilter || brandFilter || sortBy !== "name" || sortOrder !== "asc"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your product inventory and details</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAddProduct}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Product
              </Button>
              <Button variant="secondary" onClick={handleImportProducts}>
                <UploadIcon className="w-5 h-5 mr-2" />
                Import
              </Button>
              <Button variant="secondary" onClick={handleExportProducts}>
                <DownloadIcon className="w-5 h-5 mr-2" />
                Export
              </Button>
              {selectedProducts.length > 0 && (
                <Button variant="danger" onClick={handleBulkDelete}>
                  Delete Selected ({selectedProducts.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PackageIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangleIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUpIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                Filters & Search
              </CardTitle>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<SearchIcon className="w-5 h-5 text-gray-400" />}
              />

              <Dropdown
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="Filter by Category"
              />

              <Dropdown
                options={brandOptions}
                value={brandFilter}
                onChange={setBrandFilter}
                placeholder="Filter by Brand"
              />

              <Dropdown
                options={sortOptions}
                value={`${sortBy}-${sortOrder}`}
                onChange={(value) => {
                  const [newSortBy, newSortOrder] = value.split("-")
                  setSortBy(newSortBy)
                  setSortOrder(newSortOrder)
                }}
                placeholder="Sort by"
              />
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && <Badge variant="primary">Search: "{searchTerm}"</Badge>}
                {categoryFilter && <Badge variant="primary">Category: {getCategoryName(categoryFilter)}</Badge>}
                {brandFilter && <Badge variant="primary">Brand: {getBrandName(brandFilter)}</Badge>}
                {(sortBy !== "name" || sortOrder !== "asc") && (
                  <Badge variant="primary">
                    Sort: {sortOptions.find((opt) => opt.value === `${sortBy}-${sortOrder}`)?.label}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedProducts.length > 0 && <span className="ml-2">• {selectedProducts.length} selected</span>}
          </p>
        </div>

        {/* Product Table */}
        <ProductTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onViewProduct={handleViewProduct}
          selectAll={selectAll}
        />
      </div>

      {/* Add/Edit Product Modal */}
      <AddEditProductModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        editingProduct={editingProduct}
        onSave={handleSaveProduct}
        isLoading={loading}
      />

      {/* View Product Modal */}
      <ViewProductModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        product={viewingProduct}
        onEdit={handleEditProduct}
      />
    </div>
  )
}

export default ProductManagement
