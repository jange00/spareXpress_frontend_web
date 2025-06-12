import { useState, useEffect } from "react"
import { PlusCircleIcon } from "lucide-react"
import Badge from "./ui/badge"

const ProductDetailsModal = ({
  product,
  isEditMode,
  onClose,
  onUpdateProduct,
  onRestock,
  onEdit,
  formatDate,
  getStatusBadge,
  getWarehouseName,
  categories,
  brands,
  warehouses,
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("details")

  // State for edited product data
  const [editedProduct, setEditedProduct] = useState({ ...product })

  // Available subcategories based on selected category
  const [availableSubcategories, setAvailableSubcategories] = useState([])

  // Available brands based on selected category
  const [availableBrands, setAvailableBrands] = useState(brands)

  // Update available subcategories when category changes
  useEffect(() => {
    if (isEditMode && editedProduct.category) {
      const category = categories.find((cat) => cat.name === editedProduct.category)
      setAvailableSubcategories(category ? category.subcategories : [])

      // Filter brands by category
      const categoryId = categories.find((cat) => cat.name === editedProduct.category)?.id
      setAvailableBrands(brands.filter((brand) => brand.category === categoryId))
    } else if (product.category) {
      const category = categories.find((cat) => cat.name === product.category)
      setAvailableSubcategories(category ? category.subcategories : [])

      // Filter brands by category
      const categoryId = categories.find((cat) => cat.name === product.category)?.id
      setAvailableBrands(brands.filter((brand) => brand.category === categoryId))
    }
  }, [isEditMode, editedProduct.category, product.category, categories, brands])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "stockLevel" || name === "minStockLevel" || name === "price") {
      setEditedProduct({ ...editedProduct, [name]: Number.parseFloat(value) || 0 })
    } else {
      setEditedProduct({ ...editedProduct, [name]: value })
    }
  }

  // Handle save changes
  const handleSave = () => {
    onUpdateProduct(editedProduct)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between w-full">
            <span>
              {isEditMode ? "Edit Product" : "Product Details"}: {product.name}
            </span>
            <div className="flex items-center space-x-2">
              {!isEditMode && (
                <button
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                  onClick={onRestock}
                >
                  <PlusCircleIcon className="w-4 h-4 mr-1" />
                  Restock
                </button>
              )}
            </div>
          </h2>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "details" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "stock" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("stock")}
          >
            Stock Information
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "history" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("history")}
          >
            Stock History
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Product Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={isEditMode ? editedProduct.image : product.image}
                      alt={isEditMode ? editedProduct.name : product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditMode && <button className="text-sm text-blue-600 hover:text-blue-800">Change Image</button>}
                </div>

                {/* Product Information */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Product Name</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProduct.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{product.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">SKU</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="sku"
                          value={editedProduct.sku}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{product.sku}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      {isEditMode ? (
                        <select
                          name="category"
                          value={editedProduct.category}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm text-gray-900">{product.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                      {isEditMode ? (
                        <select
                          name="subcategory"
                          value={editedProduct.subcategory}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                          disabled={!editedProduct.category}
                        >
                          <option value="">Select Subcategory</option>
                          {availableSubcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                              {subcategory}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm text-gray-900">{product.subcategory}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Brand</label>
                      {isEditMode ? (
                        <select
                          name="brand"
                          value={editedProduct.brand}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        >
                          <option value="">Select Brand</option>
                          {availableBrands.map((brand) => (
                            <option key={brand.id} value={brand.name}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm text-gray-900">{product.brand}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      {isEditMode ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                          <input
                            type="number"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                          />
                        </div>
                      ) : (
                        <p className="text-sm text-gray-900">${product.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Supplier</label>
                    {isEditMode ? (
                      <input
                        type="text"
                        name="supplier"
                        value={editedProduct.supplier}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{product.supplier}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stock Information Tab */}
          {activeTab === "stock" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Current Stock</h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Current Stock Level</p>
                        <div className="flex items-center">
                          <p className="text-2xl font-bold">
                            {isEditMode ? (
                              <input
                                type="number"
                                name="stockLevel"
                                value={editedProduct.stockLevel}
                                onChange={handleChange}
                                min="0"
                                className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                              />
                            ) : (
                              product.stockLevel
                            )}
                          </p>
                          <p className="ml-2 text-gray-500">Units</p>
                        </div>
                      </div>
                      <div>{getStatusBadge(isEditMode ? editedProduct.status : product.status)}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Minimum Stock Level</p>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">
                            {isEditMode ? (
                              <input
                                type="number"
                                name="minStockLevel"
                                value={editedProduct.minStockLevel}
                                onChange={handleChange}
                                min="0"
                                className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                              />
                            ) : (
                              product.minStockLevel
                            )}
                          </p>
                          <p className="ml-2 text-gray-500">Units</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Restocked</p>
                      <p className="text-base">{formatDate(product.lastRestocked)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Warehouse Information</h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Warehouse Location</p>
                      {isEditMode ? (
                        <select
                          name="warehouse"
                          value={editedProduct.warehouse}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        >
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-base font-medium">{getWarehouseName(product.warehouse)}</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Shelf Location</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="shelfLocation"
                          value={editedProduct.shelfLocation || ""}
                          onChange={handleChange}
                          placeholder="e.g., A12-B3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      ) : (
                        <p className="text-base">{product.shelfLocation || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  {!isEditMode && (
                    <div className="mt-4">
                      <button
                        onClick={onRestock}
                        className="w-full px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
                      >
                        <PlusCircleIcon className="w-5 h-5 inline mr-2" />
                        Restock Product
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stock History Tab */}
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Stock Movement History</h3>
              </div>

              {/* This would typically be populated with actual stock movement data */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Warehouse
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample stock movement data - in a real app, this would be fetched */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 8, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color="green">Restock</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+20 Units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Main Warehouse</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 5, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color="red">Removal</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-5 Units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Main Warehouse</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 1, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color="blue">Transfer</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-10 Units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">East Coast Facility</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>

          {isEditMode ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              Edit Product
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsModal
