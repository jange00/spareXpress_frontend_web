import { useState, useEffect } from "react"
import {
  SearchIcon,
  PlusIcon,
  UploadIcon,
  DownloadIcon,
  PackageIcon,
  RefreshCwIcon as RefreshIcon,
  WarehouseIcon,
  TrashIcon,
  EyeIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import ProductDetailsModal from "../../components/admin/inventoryAndStockManagement/productDetailsModal"
import RestockModal from "../../components/admin/inventoryAndStockManagement/restockModal"
import AddProductModal from "../../components/admin/inventoryAndStockManagement/addProductModal"
import BulkActionModal from "../../components/admin/inventoryAndStockManagement/bulkActionModal"
import Badge from "../../components/admin/inventoryAndStockManagement/ui/badge"
import { initialInventory, categories, brands, warehouses } from "../../components/admin/inventoryAndStockManagement/sampleData"

const InventoryManagement = () => {
  // ================ STATE MANAGEMENT ================
  // Primary state for inventory data
  const [inventory, setInventory] = useState(initialInventory)
  const [filteredInventory, setFilteredInventory] = useState(initialInventory)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [subcategoryFilter, setSubcategoryFilter] = useState("")
  const [brandFilter, setBrandFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [warehouseFilter, setWarehouseFilter] = useState("")

  // Selection states
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [bulkAction, setBulkAction] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)

  // Available subcategories based on selected category
  const [availableSubcategories, setAvailableSubcategories] = useState([])

  // Available brands based on selected category
  const [availableBrands, setAvailableBrands] = useState(brands)

  // ================ EFFECTS ================
  // Filter inventory based on search and filters
  useEffect(() => {
    let result = [...inventory]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Apply subcategory filter
    if (subcategoryFilter) {
      result = result.filter((product) => product.subcategory === subcategoryFilter)
    }

    // Apply brand filter
    if (brandFilter) {
      result = result.filter((product) => product.brand === brandFilter)
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((product) => product.status === statusFilter)
    }

    // Apply warehouse filter
    if (warehouseFilter) {
      result = result.filter((product) => product.warehouse === warehouseFilter)
    }

    // Sort by stock level (lowest first)
    result.sort((a, b) => a.stockLevel - b.stockLevel)

    setFilteredInventory(result)
  }, [inventory, searchTerm, categoryFilter, subcategoryFilter, brandFilter, statusFilter, warehouseFilter])

  // Update available subcategories when category changes
  useEffect(() => {
    if (categoryFilter) {
      const category = categories.find((cat) => cat.name === categoryFilter)
      setAvailableSubcategories(category ? category.subcategories : [])

      // Reset subcategory filter when category changes
      setSubcategoryFilter("")

      // Filter brands by category
      const categoryId = categories.find((cat) => cat.name === categoryFilter)?.id
      setAvailableBrands(brands.filter((brand) => brand.category === categoryId))

      // Reset brand filter when category changes
      setBrandFilter("")
    } else {
      setAvailableSubcategories([])
      setAvailableBrands(brands)
    }
  }, [categoryFilter])

  // ================ EVENT HANDLERS ================
 
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredInventory.map((product) => product.id))
    }
    setSelectAll(!selectAll)
  }

  /**
   * Handles selecting individual product
   */
  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  /**
   * Opens product details modal for a specific product
   */
  const handleViewProduct = (product, editMode = false) => {
    setCurrentProduct(product)
    setIsProductModalOpen(true)
    setIsEditMode(editMode)
  }

  /**
   * Opens restock modal for a specific product
   */
  const handleRestockProduct = (product) => {
    setCurrentProduct(product)
    setIsRestockModalOpen(true)
  }

  /**
   * Updates the stock level of a product
   */
  const handleUpdateStock = (productId, newStockLevel) => {
    const updatedInventory = inventory.map((product) => {
      if (product.id === productId) {
        const status =
          newStockLevel === 0 ? "out-of-stock" : newStockLevel <= product.minStockLevel ? "low-stock" : "in-stock"

        return {
          ...product,
          stockLevel: newStockLevel,
          status,
          lastRestocked: new Date().toISOString(),
        }
      }
      return product
    })

    setInventory(updatedInventory)

    if (currentProduct && currentProduct.id === productId) {
      const status =
        newStockLevel === 0 ? "out-of-stock" : newStockLevel <= currentProduct.minStockLevel ? "low-stock" : "in-stock"

      setCurrentProduct({
        ...currentProduct,
        stockLevel: newStockLevel,
        status,
        lastRestocked: new Date().toISOString(),
      })
    }
  }

  /**
   * Adds a new product to the inventory
   */
  const handleAddProduct = (newProduct) => {
    // Generate a new product ID
    const productNumber = Math.max(...inventory.map((p) => Number.parseInt(p.id.replace("P", "")))) + 1
    const productId = `P${String(productNumber).padStart(3, "0")}`

    const status =
      newProduct.stockLevel === 0
        ? "out-of-stock"
        : newProduct.stockLevel <= newProduct.minStockLevel
          ? "low-stock"
          : "in-stock"

    const product = {
      ...newProduct,
      id: productId,
      status,
      lastRestocked: new Date().toISOString(),
    }

    setInventory([...inventory, product])
    setIsAddProductOpen(false)
  }

  /**
   * Updates an existing product
   */
  const handleUpdateProduct = (updatedProduct) => {
    const status =
      updatedProduct.stockLevel === 0
        ? "out-of-stock"
        : updatedProduct.stockLevel <= updatedProduct.minStockLevel
          ? "low-stock"
          : "in-stock"

    const product = {
      ...updatedProduct,
      status,
    }

    setInventory(inventory.map((p) => (p.id === product.id ? product : p)))
    setCurrentProduct(product)
    setIsEditMode(false)
  }

  /**
   * Applies bulk action to selected products
   */
  const handleApplyBulkAction = () => {
    if (bulkAction === "update-stock") {
      // This would be handled by the BulkActionModal component
    } else if (bulkAction === "move-warehouse") {
      // This would be handled by the BulkActionModal component
    } else if (bulkAction === "delete") {
      if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
        setInventory(inventory.filter((product) => !selectedProducts.includes(product.id)))
        setSelectedProducts([])
        setSelectAll(false)
      }
    }

    setIsBulkActionOpen(false)
    setBulkAction("")
  }

  /**
   * Exports inventory in the specified format
   */
  const handleExportInventory = (format) => {
    // In a real application, this would generate and download the file
    alert(`Exporting inventory as ${format.toUpperCase()}`)
  }

  /**
   * Handles import inventory (mock function)
   */
  const handleImportInventory = () => {
    alert("Your inventory import has been initiated.")
  }

  // ================ UTILITY FUNCTIONS ================
  /**
   * Formats date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Never"

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  /**
   * Returns appropriate badge component for product status
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case "in-stock":
        return <Badge color="green">In Stock</Badge>
      case "low-stock":
        return <Badge color="yellow">Low Stock</Badge>
      case "out-of-stock":
        return <Badge color="red">Out of Stock</Badge>
      default:
        return <Badge color="gray">{status}</Badge>
    }
  }

  /**
   * Gets warehouse name from ID
   */
  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId)
    return warehouse ? warehouse.name : "Unknown"
  }

  // ================ RENDER FUNCTION ================
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Actions & Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add New Stock
              </button>

              <button
                onClick={handleImportInventory}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <UploadIcon className="w-5 h-5 mr-1" />
                Import Stock Data
              </button>

              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => document.getElementById("exportDropdown").classList.toggle("hidden")}
                >
                  <DownloadIcon className="w-5 h-5 mr-1" />
                  Export Stock Report
                </button>
                <div
                  id="exportDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleExportInventory("csv")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportInventory("excel")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExportInventory("pdf")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className="relative">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition-colors"
                    onClick={() => document.getElementById("bulkActionDropdown").classList.toggle("hidden")}
                  >
                    <PackageIcon className="w-5 h-5 mr-1" />
                    Bulk Actions ({selectedProducts.length})
                  </button>
                  <div
                    id="bulkActionDropdown"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setBulkAction("update-stock")
                          setIsBulkActionOpen(true)
                          document.getElementById("bulkActionDropdown").classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <RefreshIcon className="w-4 h-4 inline mr-2" />
                        Update Stock
                      </button>
                      <button
                        onClick={() => {
                          setBulkAction("move-warehouse")
                          setIsBulkActionOpen(true)
                          document.getElementById("bulkActionDropdown").classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <WarehouseIcon className="w-4 h-4 inline mr-2" />
                        Move to Warehouse
                      </button>
                      <button
                        onClick={() => {
                          setBulkAction("delete")
                          handleApplyBulkAction()
                          document.getElementById("bulkActionDropdown").classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <TrashIcon className="w-4 h-4 inline mr-2" />
                        Delete Products
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
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
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div>
              <select
                value={subcategoryFilter}
                onChange={(e) => setSubcategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                disabled={!categoryFilter}
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Statuses</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* Warehouse Filter */}
            <div>
              <select
                value={warehouseFilter}
                onChange={(e) => setWarehouseFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Warehouses</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock Level
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{product.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md"
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">${product.price.toFixed(2)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                        <div className="text-xs text-gray-500">{product.subcategory}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.brand}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.sku}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.stockLevel} {product.stockLevel === 1 ? "Unit" : "Units"}
                        </div>
                        <div className="text-xs text-gray-500">Min: {product.minStockLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="text-[#FFB800] hover:text-[#FFB800]/80 mr-3"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() =>
                                document.getElementById(`actionDropdown-${product.id}`).classList.toggle("hidden")
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </button>
                            <div
                              id={`actionDropdown-${product.id}`}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleViewProduct(product)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeIcon className="w-4 h-4 inline mr-2" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleViewProduct(product, true)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EditIcon className="w-4 h-4 inline mr-2" />
                                  Edit Product
                                </button>
                                <button
                                  onClick={() => handleRestockProduct(product)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <PlusCircleIcon className="w-4 h-4 inline mr-2" />
                                  Restock
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                  <TrashIcon className="w-4 h-4 inline mr-2" />
                                  Delete Product
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {isProductModalOpen && currentProduct && (
        <ProductDetailsModal
          product={currentProduct}
          isEditMode={isEditMode}
          onClose={() => setIsProductModalOpen(false)}
          onUpdateProduct={handleUpdateProduct}
          onRestock={() => {
            setIsProductModalOpen(false)
            handleRestockProduct(currentProduct)
          }}
          onEdit={() => setIsEditMode(true)}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          getWarehouseName={getWarehouseName}
          categories={categories}
          brands={brands}
          warehouses={warehouses}
        />
      )}

      {/* Restock Modal */}
      {isRestockModalOpen && currentProduct && (
        <RestockModal
          product={currentProduct}
          onClose={() => setIsRestockModalOpen(false)}
          onRestock={(productId, quantity) => {
            const newStockLevel = currentProduct.stockLevel + quantity
            handleUpdateStock(productId, newStockLevel)
            setIsRestockModalOpen(false)
          }}
          warehouses={warehouses}
        />
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <AddProductModal
          onSave={handleAddProduct}
          onClose={() => setIsAddProductOpen(false)}
          categories={categories}
          brands={brands}
          warehouses={warehouses}
        />
      )}

      {/* Bulk Action Modal */}
      {isBulkActionOpen && (
        <BulkActionModal
          action={bulkAction}
          selectedCount={selectedProducts.length}
          onApply={(action, value) => {
            if (action === "update-stock") {
              // Update stock levels for selected products
              const updatedInventory = inventory.map((product) => {
                if (selectedProducts.includes(product.id)) {
                  const newStockLevel = Number.parseInt(value)
                  const status =
                    newStockLevel === 0
                      ? "out-of-stock"
                      : newStockLevel <= product.minStockLevel
                        ? "low-stock"
                        : "in-stock"

                  return {
                    ...product,
                    stockLevel: newStockLevel,
                    status,
                    lastRestocked: new Date().toISOString(),
                  }
                }
                return product
              })

              setInventory(updatedInventory)
            } else if (action === "move-warehouse") {
              // Move selected products to a different warehouse
              const updatedInventory = inventory.map((product) => {
                if (selectedProducts.includes(product.id)) {
                  return {
                    ...product,
                    warehouse: value,
                  }
                }
                return product
              })

              setInventory(updatedInventory)
            }

            setIsBulkActionOpen(false)
            setSelectedProducts([])
            setSelectAll(false)
          }}
          onClose={() => setIsBulkActionOpen(false)}
          warehouses={warehouses}
        />
      )}
    </div>
  )
}

// Icon components
const FileTextIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const PlusCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const EditIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

export default InventoryManagement
