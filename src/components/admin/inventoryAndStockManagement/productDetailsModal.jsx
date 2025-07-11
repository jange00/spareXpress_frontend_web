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
                      // src={isEditMode ? editedProduct.image : product.image}
                      src={isEditMode ? editedProduct.image : `https://localhost:3000${product.image}`}
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
                        <p className="text-sm text-gray-900">{product.categoryId.title}</p>
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
                        <p className="text-sm text-gray-900">{product.brandId.title}</p>
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
                        // <p className="text-sm text-gray-900">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-900">Npr.{product.price}</p>
                      )}
                    </div>
                  </div>
                </div>
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
