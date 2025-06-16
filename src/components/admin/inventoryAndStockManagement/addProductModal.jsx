import { useState, useEffect } from "react"
import { XIcon, CheckIcon } from "lucide-react"

const AddProductModal = ({ onSave, onClose, categories, brands, warehouses }) => {
  // Initial form data
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    price: 0,
    stockLevel: 0,
    minStockLevel: 0,
    warehouse: warehouses[0]?.id || "",
    supplier: "",
    image: "/placeholder.svg?height=80&width=80",
  })

  // Available subcategories based on selected category
  const [availableSubcategories, setAvailableSubcategories] = useState([])

  // Available brands based on selected category
  const [availableBrands, setAvailableBrands] = useState([])

  // Update available subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const category = categories.find((cat) => cat.name === formData.category)
      setAvailableSubcategories(category ? category.subcategories : [])

      // Filter brands by category
      const categoryId = categories.find((cat) => cat.name === formData.category)?.id
      setAvailableBrands(brands.filter((brand) => brand.category === categoryId))

      // Reset subcategory and brand when category changes
      setFormData((prevFormData) => ({
        ...prevFormData,
        subcategory: "",
        brand: "",
      }))
    } else {
      setAvailableSubcategories([])
      setAvailableBrands([])
    }
  }, [formData.category, categories, brands])

  /**
   * Handles form field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "stockLevel" || name === "minStockLevel" || name === "price") {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md  bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Product image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => alert("Upload functionality would be implemented here")}
                  >
                    Upload Image
                  </button>
                </div>

                {/* Product Information */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Product Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">SKU*</label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Category*</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Subcategory*</label>
                      <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        required
                        disabled={!formData.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      >
                        <option value="">Select Subcategory</option>
                        {availableSubcategories.map((subcategory) => (
                          <option key={subcategory} value={subcategory}>
                            {subcategory}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Brand*</label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        disabled={!formData.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      >
                        <option value="">Select Brand</option>
                        {availableBrands.map((brand) => (
                          <option key={brand.id} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Price*</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          required
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Stock Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Initial Stock*</label>
                    <input
                      type="number"
                      name="stockLevel"
                      value={formData.stockLevel}
                      onChange={handleChange}
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Minimum Stock Level*</label>
                    <input
                      type="number"
                      name="minStockLevel"
                      value={formData.minStockLevel}
                      onChange={handleChange}
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Warehouse*</label>
                    <select
                      name="warehouse"
                      value={formData.warehouse}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    >
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              <CheckIcon className="w-5 h-5 mr-1 inline" />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
