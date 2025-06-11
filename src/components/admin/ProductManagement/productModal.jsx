import { useState } from "react"
import { XIcon } from "./icons"

const ProductModal = ({ product, onSave, onClose, categories, brands }) => {
  const [formData, setFormData] = useState(product)
  const [activeTab, setActiveTab] = useState("basic")
  const [featureInput, setFeatureInput] = useState("")
  const [compatibilityInput, setCompatibilityInput] = useState("")
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const checked = e.target.checked

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    }
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number.parseFloat(value) || 0,
    })
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      })
      setFeatureInput("")
    }
  }

  const removeFeature = (index) => {
    const newFeatures = [...formData.features]
    newFeatures.splice(index, 1)
    setFormData({
      ...formData,
      features: newFeatures,
    })
  }

  const addCompatibility = () => {
    if (compatibilityInput.trim()) {
      setFormData({
        ...formData,
        compatibility: [...formData.compatibility, compatibilityInput.trim()],
      })
      setCompatibilityInput("")
    }
  }

  const removeCompatibility = (index) => {
    const newCompatibility = [...formData.compatibility]
    newCompatibility.splice(index, 1)
    setFormData({
      ...formData,
      compatibility: newCompatibility,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.brand) newErrors.brand = "Brand is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">{product.id ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "basic" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Info
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "details" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("details")}
          >
            Details & Specs
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "features" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("features")}
          >
            Features & Compatibility
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <form onSubmit={handleSubmit}>
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category === "auto-parts" ? "Auto Parts" : "Computer Parts"}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                    <input
                      type="text"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.brand ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]`}
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                    <select
                      name="badge"
                      value={formData.badge}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    >
                      <option value="">No Badge</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="Hot Deal">Hot Deal</option>
                      <option value="New">New</option>
                      <option value="Top Rated">Top Rated</option>
                      <option value="Popular">Popular</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleNumberChange}
                        step="0.01"
                        min="0"
                        className={`w-full pl-8 pr-3 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]`}
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleNumberChange}
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleNumberChange}
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleNumberChange}
                      min="0"
                      className={`w-full px-3 py-2 border ${errors.stock ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]`}
                    />
                    {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleNumberChange}
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label>
                    <input
                      type="number"
                      name="reviews"
                      value={formData.reviews}
                      onChange={handleNumberChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                  ></textarea>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                  />
                  <label className="ml-2 block text-sm text-gray-700">In Stock</label>
                </div>
              </div>
            )}

            {/* Details & Specs Tab */}
            {activeTab === "details" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>

                  {formData.category === "auto-parts" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                        <input
                          type="text"
                          name="specifications.material"
                          value={formData.specifications.material || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <input
                          type="text"
                          name="specifications.position"
                          value={formData.specifications.position || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fitment</label>
                        <input
                          type="text"
                          name="specifications.fitment"
                          value={formData.specifications.fitment || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                        <input
                          type="text"
                          name="specifications.warranty"
                          value={formData.specifications.warranty || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                        <input
                          type="text"
                          name="specifications.dimensions"
                          value={formData.specifications.dimensions || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                        <input
                          type="text"
                          name="specifications.weight"
                          value={formData.specifications.weight || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Memory</label>
                        <input
                          type="text"
                          name="specifications.memory"
                          value={formData.specifications.memory || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Interface</label>
                        <input
                          type="text"
                          name="specifications.interface"
                          value={formData.specifications.interface || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ports</label>
                        <input
                          type="text"
                          name="specifications.ports"
                          value={formData.specifications.ports || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Power Requirement</label>
                        <input
                          type="text"
                          name="specifications.powerRequirement"
                          value={formData.specifications.powerRequirement || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                        <input
                          type="text"
                          name="specifications.dimensions"
                          value={formData.specifications.dimensions || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cooling</label>
                        <input
                          type="text"
                          name="specifications.cooling"
                          value={formData.specifications.cooling || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features & Compatibility Tab */}
            {activeTab === "features" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Add a feature"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-r-md hover:bg-[#FFB800]/90 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                        <span className="flex-1">{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Compatibility</h3>
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={compatibilityInput}
                      onChange={(e) => setCompatibilityInput(e.target.value)}
                      placeholder="Add compatibility"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                    <button
                      type="button"
                      onClick={addCompatibility}
                      className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-r-md hover:bg-[#FFB800]/90 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {formData.compatibility.map((item, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                        <span className="flex-1">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeCompatibility(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
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
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
