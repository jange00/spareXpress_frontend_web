import { useState, useMemo } from "react"
import { Formik, Form } from "formik"
import { Button } from "../../components/admin/UIs/addBrandUi/Button"
import { Input } from "../../components/admin/UIs/addBrandUi/Input"
import { Select } from "../../components/admin/UIs/addBrandUi/Select"
import { AddBrandModal } from "../../components/admin/addBrand/AddBrandModal"
import { EditBrandModal } from "../../components/admin/addBrand/EditBrandModal"
import { BrandDetailsModal } from "../../components/admin/addBrand/BrandDetailsModal"
import { brandFilterSchema } from "../../components/admin/utils/addBrand/brandValidation"
import { Search, Plus, Download, Eye, Edit, Trash2, X, Grid, List, Package } from "lucide-react"

// Mock data - replace with your actual data
const mockCategories = [
  { _id: "cat_1", name: "Electronics", icon: "🔌" },
  { _id: "cat_2", name: "Clothing", icon: "👕" },
  { _id: "cat_3", name: "Home & Garden", icon: "🏠" },
  { _id: "cat_4", name: "Sports & Outdoors", icon: "⚽" },
]

const mockSubcategories = [
  { _id: "subcat_1", categoryId: "cat_1", title: "Smartphones", icon: "📱" },
  { _id: "subcat_2", categoryId: "cat_1", title: "Laptops", icon: "💻" },
  { _id: "subcat_3", categoryId: "cat_1", title: "Audio Equipment", icon: "🎧" },
  { _id: "subcat_4", categoryId: "cat_2", title: "Men's Clothing", icon: "👔" },
  { _id: "subcat_5", categoryId: "cat_2", title: "Women's Clothing", icon: "👗" },
  { _id: "subcat_6", categoryId: "cat_2", title: "Shoes", icon: "👟" },
  { _id: "subcat_7", categoryId: "cat_3", title: "Furniture", icon: "🪑" },
  { _id: "subcat_8", categoryId: "cat_3", title: "Kitchen Appliances", icon: "🍳" },
  { _id: "subcat_9", categoryId: "cat_4", title: "Fitness Equipment", icon: "🏋️" },
  { _id: "subcat_10", categoryId: "cat_4", title: "Outdoor Gear", icon: "🏕️" },
]

const mockBrands = [
  {
    _id: "brand_1",
    title: "Apple",
    count: 150,
    model: "iPhone 15 Series",
    categoryId: mockCategories[0],
    subcategoryId: mockSubcategories[0],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "brand_2",
    title: "Samsung",
    count: 200,
    model: "Galaxy S24",
    categoryId: mockCategories[0],
    subcategoryId: mockSubcategories[0],
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    _id: "brand_3",
    title: "Dell",
    count: 75,
    model: "XPS Series",
    categoryId: mockCategories[0],
    subcategoryId: mockSubcategories[1],
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    _id: "brand_4",
    title: "Nike",
    count: 300,
    model: "Air Max",
    categoryId: mockCategories[1],
    subcategoryId: mockSubcategories[5],
    createdAt: "2024-01-18T11:45:00Z",
    updatedAt: "2024-01-18T11:45:00Z",
  },
  {
    _id: "brand_5",
    title: "Sony",
    count: 120,
    model: "WH-1000XM5",
    categoryId: mockCategories[0],
    subcategoryId: mockSubcategories[2],
    createdAt: "2024-01-19T16:30:00Z",
    updatedAt: "2024-01-19T16:30:00Z",
  },
]

const formatDate = (dateString) => {
  if (!dateString) return "N/A"
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

const filterBrands = (brands, filters) => {
  let result = [...brands]

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase()
    result = result.filter(
      (brand) =>
        brand.title.toLowerCase().includes(searchLower) ||
        brand.model?.toLowerCase().includes(searchLower) ||
        (typeof brand.categoryId === "object" && brand.categoryId.name?.toLowerCase().includes(searchLower)) ||
        (typeof brand.subcategoryId === "object" && brand.subcategoryId.title?.toLowerCase().includes(searchLower)),
    )
  }

  if (filters.categoryId) {
    result = result.filter((brand) => {
      const categoryId = typeof brand.categoryId === "object" ? brand.categoryId._id : brand.categoryId
      return categoryId === filters.categoryId
    })
  }

  if (filters.subcategoryId) {
    result = result.filter((brand) => {
      const subcategoryId = typeof brand.subcategoryId === "object" ? brand.subcategoryId._id : brand.subcategoryId
      return subcategoryId === filters.subcategoryId
    })
  }

  if (filters.countRange.min || filters.countRange.max) {
    result = result.filter((brand) => {
      const count = brand.count
      const min = filters.countRange.min ? Number.parseInt(filters.countRange.min) : 0
      const max = filters.countRange.max ? Number.parseInt(filters.countRange.max) : Number.POSITIVE_INFINITY
      return count >= min && count <= max
    })
  }

  if (filters.dateRange.start && filters.dateRange.end) {
    const startDate = new Date(filters.dateRange.start)
    const endDate = new Date(filters.dateRange.end)
    endDate.setHours(23, 59, 59, 999)

    result = result.filter((brand) => {
      const brandDate = new Date(brand.createdAt)
      return brandDate >= startDate && brandDate <= endDate
    })
  }

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return result
}

export const AddBrandManagement = () => {
  // State management
  const [brands, setBrands] = useState(mockBrands)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [viewMode, setViewMode] = useState("table")

  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: "",
    categoryId: "",
    subcategoryId: "",
    countRange: { min: "", max: "" },
    dateRange: { start: "", end: "" },
  })

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(null)

  // Filtered brands
  const filteredBrands = useMemo(() => {
    return filterBrands(brands, filters)
  }, [brands, filters])

  // Available subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (!filters.categoryId) return mockSubcategories
    return mockSubcategories.filter((sub) => sub.categoryId === filters.categoryId)
  }, [filters.categoryId])

  // Event handlers
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBrands([])
    } else {
      setSelectedBrands(filteredBrands.map((brand) => brand._id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectBrand = (brandId) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId)
      } else {
        return [...prev, brandId]
      }
    })
  }

  const handleAddBrand = (brandData) => {
    const newBrand = {
      _id: `brand_${Date.now()}`,
      ...brandData,
      categoryId: mockCategories.find((c) => c._id === brandData.categoryId),
      subcategoryId: mockSubcategories.find((s) => s._id === brandData.subcategoryId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setBrands((prev) => [newBrand, ...prev])
    setIsAddModalOpen(false)
  }

  const handleEditBrand = (updatedData) => {
    const updatedBrand = {
      ...updatedData,
      categoryId: mockCategories.find((c) => c._id === updatedData.categoryId),
      subcategoryId: mockSubcategories.find((s) => s._id === updatedData.subcategoryId),
    }
    setBrands((prev) => prev.map((brand) => (brand._id === updatedData._id ? updatedBrand : brand)))
    setIsEditModalOpen(false)
  }

  const handleDeleteBrand = (brandId) => {
    setBrands((prev) => prev.filter((brand) => brand._id !== brandId))
    setSelectedBrands((prev) => prev.filter((id) => id !== brandId))
  }

  const handleDeleteSelected = () => {
    if (selectedBrands.length === 0) return
    if (window.confirm(`Delete ${selectedBrands.length} selected brands?`)) {
      setBrands((prev) => prev.filter((brand) => !selectedBrands.includes(brand._id)))
      setSelectedBrands([])
      setSelectAll(false)
    }
  }

  const handleExport = () => {
    const csvContent = [
      ["ID", "Title", "Count", "Model", "Category", "Subcategory", "Created", "Updated"].join(","),
      ...filteredBrands.map((brand) =>
        [
          brand._id,
          `"${brand.title}"`,
          brand.count,
          `"${brand.model || ""}"`,
          typeof brand.categoryId === "object" ? `"${brand.categoryId.name}"` : brand.categoryId,
          typeof brand.subcategoryId === "object" ? `"${brand.subcategoryId.title}"` : brand.subcategoryId,
          formatDate(brand.createdAt),
          formatDate(brand.updatedAt),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `brands_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...mockCategories.map((category) => ({
      value: category._id,
      label: `${category.icon} ${category.name}`,
    })),
  ]

  const subcategoryOptions = [
    { value: "", label: "All Subcategories" },
    ...availableSubcategories.map((subcategory) => ({
      value: subcategory._id,
      label: `${subcategory.icon} ${subcategory.title}`,
    })),
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage product brands and their inventory</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Brand
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              {selectedBrands.length > 0 && (
                <Button variant="destructive" onClick={handleDeleteSelected}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedBrands.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Formik initialValues={filters} validationSchema={brandFilterSchema} onSubmit={() => {}} enableReinitialize>
            {({ values, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search brands..."
                      value={values.searchTerm}
                      onChange={(e) => {
                        setFieldValue("searchTerm", e.target.value)
                        setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
                      }}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    options={categoryOptions}
                    placeholder="Filter by Category"
                    value={values.categoryId}
                    onChange={(e) => {
                      setFieldValue("categoryId", e.target.value)
                      setFieldValue("subcategoryId", "") // Reset subcategory when category changes
                      setFilters((prev) => ({ ...prev, categoryId: e.target.value, subcategoryId: "" }))
                    }}
                  />

                  <Select
                    options={subcategoryOptions}
                    placeholder="Filter by Subcategory"
                    value={values.subcategoryId}
                    onChange={(e) => {
                      setFieldValue("subcategoryId", e.target.value)
                      setFilters((prev) => ({ ...prev, subcategoryId: e.target.value }))
                    }}
                    disabled={!values.categoryId}
                  />

                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant={viewMode === "table" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant={viewMode === "grid" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const resetFilters = {
                        searchTerm: "",
                        categoryId: "",
                        subcategoryId: "",
                        countRange: { min: "", max: "" },
                        dateRange: { start: "", end: "" },
                      }
                      setFilters(resetFilters)
                      setFieldValue("searchTerm", "")
                      setFieldValue("categoryId", "")
                      setFieldValue("subcategoryId", "")
                      setFieldValue("countRange.min", "")
                      setFieldValue("countRange.max", "")
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <Input
                    type="number"
                    placeholder="Min Count"
                    value={values.countRange.min}
                    onChange={(e) => {
                      setFieldValue("countRange.min", e.target.value)
                      setFilters((prev) => ({ ...prev, countRange: { ...prev.countRange, min: e.target.value } }))
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Max Count"
                    value={values.countRange.max}
                    onChange={(e) => {
                      setFieldValue("countRange.max", e.target.value)
                      setFilters((prev) => ({ ...prev, countRange: { ...prev.countRange, max: e.target.value } }))
                    }}
                  />
                  <Input
                    type="date"
                    label="Start Date"
                    value={values.dateRange.start}
                    onChange={(e) => {
                      setFieldValue("dateRange.start", e.target.value)
                      setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))
                    }}
                  />
                  <Input
                    type="date"
                    label="End Date"
                    value={values.dateRange.end}
                    onChange={(e) => {
                      setFieldValue("dateRange.end", e.target.value)
                      setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, end: e.target.value } }))
                    }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {viewMode === "table" ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Brands ({filteredBrands.length})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#ffc107] border-gray-300 rounded focus:ring-[#ffc107]"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subcategory
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBrands.map((brand) => (
                    <tr key={brand._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand._id)}
                          onChange={() => handleSelectBrand(brand._id)}
                          className="w-4 h-4 text-[#ffc107] border-gray-300 rounded focus:ring-[#ffc107]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <Package className="w-5 h-5 text-[#ffc107]" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{brand.title}</div>
                            <div className="text-sm text-gray-500">{brand._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffc107] text-black">
                          {brand.count}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{brand.model || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {typeof brand.categoryId === "object" ? (
                          <div className="flex items-center space-x-2">
                            {brand.categoryId.icon && <span className="text-lg">{brand.categoryId.icon}</span>}
                            <span className="text-sm text-gray-900">{brand.categoryId.name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">ID: {brand.categoryId}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {typeof brand.subcategoryId === "object" ? (
                          <div className="flex items-center space-x-2">
                            {brand.subcategoryId.icon && <span className="text-lg">{brand.subcategoryId.icon}</span>}
                            <span className="text-sm text-gray-900">{brand.subcategoryId.title}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">ID: {brand.subcategoryId}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(brand.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCurrentBrand(brand)
                              setIsDetailsModalOpen(true)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCurrentBrand(brand)
                              setIsEditModalOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteBrand(brand._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Package className="w-6 h-6 text-[#ffc107]" />
                    <div>
                      <h3 className="font-medium text-gray-900">{brand.title}</h3>
                      <p className="text-xs text-gray-500">{brand._id}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand._id)}
                    onChange={() => handleSelectBrand(brand._id)}
                    className="w-4 h-4 text-[#ffc107] border-gray-300 rounded focus:ring-[#ffc107]"
                  />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Count:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffc107] text-black">
                      {brand.count}
                    </span>
                  </div>

                  {brand.model && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Model:</span>
                      <span className="text-sm text-gray-900 font-medium">{brand.model}</span>
                    </div>
                  )}

                  {typeof brand.categoryId === "object" && (
                    <div className="flex items-center space-x-2">
                      {brand.categoryId.icon && <span className="text-sm">{brand.categoryId.icon}</span>}
                      <span className="text-sm text-gray-600">{brand.categoryId.name}</span>
                    </div>
                  )}

                  {typeof brand.subcategoryId === "object" && (
                    <div className="flex items-center space-x-2">
                      {brand.subcategoryId.icon && <span className="text-sm">{brand.subcategoryId.icon}</span>}
                      <span className="text-sm text-gray-600">{brand.subcategoryId.title}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-500 mb-4">Created: {formatDate(brand.createdAt)}</div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentBrand(brand)
                      setIsDetailsModalOpen(true)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentBrand(brand)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteBrand(brand._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {isAddModalOpen && <AddBrandModal onSave={handleAddBrand} onClose={() => setIsAddModalOpen(false)} />}

      {isEditModalOpen && currentBrand && (
        <EditBrandModal brand={currentBrand} onSave={handleEditBrand} onClose={() => setIsEditModalOpen(false)} />
      )}

      {isDetailsModalOpen && currentBrand && (
        <BrandDetailsModal
          brand={currentBrand}
          onClose={() => setIsDetailsModalOpen(false)}
          onEdit={(brand) => {
            setCurrentBrand(brand)
            setIsEditModalOpen(true)
          }}
          onDelete={handleDeleteBrand}
        />
      )}
    </div>
  )
}
