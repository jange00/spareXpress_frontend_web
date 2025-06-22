import { useState, useMemo } from "react"
import { Formik, Form } from "formik"
import { Button } from "../../components/admin/UIs/addSubCategoryUi/Button"
import { Input } from "../../components/admin/UIs/addSubCategoryUi/Input"
import { Select } from "../../components/admin/UIs/addSubCategoryUi/Select"
import { AddSubcategoryModal } from "../../components/admin/addSubCategory/AddSubcategoryModal"
import { EditSubcategoryModal } from "../../components/admin/addSubCategory/EditSubcategoryModal"
import { SubcategoryDetailsModal } from "../../components/admin/addSubCategory/SubcategoryDetailsModal"
import { subcategoryFilterSchema } from "../../components/admin/utils/addSubCategory/subcategoryValidation"
import { Search, Plus, Download, Eye, Edit, Trash2, X, Grid, List } from "lucide-react"


// Mock data - replace with your actual data
const mockCategories = [
    { _id: "cat_1", name: "Electronics", icon: "🔌" },
    { _id: "cat_2", name: "Clothing", icon: "👕" },
    { _id: "cat_3", name: "Home & Garden", icon: "🏠" },
    { _id: "cat_4", name: "Sports & Outdoors", icon: "⚽" },
  ]
  
  const mockSubcategories = [
    {
      _id: "subcat_1",
      categoryId: mockCategories[0],
      title: "Smartphones",
      description: "Mobile phones and accessories",
      icon: "📱",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      _id: "subcat_2",
      categoryId: mockCategories[0],
      title: "Laptops",
      description: "Portable computers and accessories",
      icon: "💻",
      createdAt: "2024-01-16T14:20:00Z",
      updatedAt: "2024-01-16T14:20:00Z",
    },
    {
      _id: "subcat_3",
      categoryId: mockCategories[1],
      title: "Men's Clothing",
      description: "Clothing items for men",
      icon: "👔",
      createdAt: "2024-01-18T11:45:00Z",
      updatedAt: "2024-01-18T11:45:00Z",
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
  
  const filterSubcategories = (subcategories, filters) => {
    let result = [...subcategories]
  
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      result = result.filter(
        (subcategory) =>
          subcategory.title.toLowerCase().includes(searchLower) ||
          subcategory.description?.toLowerCase().includes(searchLower) ||
          (typeof subcategory.categoryId === "object" &&
            subcategory.categoryId.name?.toLowerCase().includes(searchLower)),
      )
    }
  
    if (filters.categoryId) {
      result = result.filter((subcategory) => {
        const categoryId =
          typeof subcategory.categoryId === "object" ? subcategory.categoryId._id : subcategory.categoryId
        return categoryId === filters.categoryId
      })
    }
  
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      endDate.setHours(23, 59, 59, 999)
  
      result = result.filter((subcategory) => {
        const subcategoryDate = new Date(subcategory.createdAt)
        return subcategoryDate >= startDate && subcategoryDate <= endDate
      })
    }
  
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return result
  }
  
  export const AddSubcategoryManagement = () => {
    // State management
    const [subcategories, setSubcategories] = useState(mockSubcategories)
    const [selectedSubcategories, setSelectedSubcategories] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [viewMode, setViewMode] = useState("table")
  
    // Filter state
    const [filters, setFilters] = useState({
      searchTerm: "",
      categoryId: "",
      dateRange: { start: "", end: "" },
    })
  
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [currentSubcategory, setCurrentSubcategory] = useState(null)
  
    // Filtered subcategories
    const filteredSubcategories = useMemo(() => {
      return filterSubcategories(subcategories, filters)
    }, [subcategories, filters])
  
    // Event handlers
    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedSubcategories([])
      } else {
        setSelectedSubcategories(filteredSubcategories.map((subcategory) => subcategory._id))
      }
      setSelectAll(!selectAll)
    }
  
    const handleSelectSubcategory = (subcategoryId) => {
      setSelectedSubcategories((prev) => {
        if (prev.includes(subcategoryId)) {
          return prev.filter((id) => id !== subcategoryId)
        } else {
          return [...prev, subcategoryId]
        }
      })
    }
  
    const handleAddSubcategory = (subcategoryData) => {
      const newSubcategory = {
        _id: `subcat_${Date.now()}`,
        ...subcategoryData,
        categoryId: mockCategories.find((c) => c._id === subcategoryData.categoryId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setSubcategories((prev) => [newSubcategory, ...prev])
      setIsAddModalOpen(false)
    }
  
    const handleEditSubcategory = (updatedData) => {
      const updatedSubcategory = {
        ...updatedData,
        categoryId: mockCategories.find((c) => c._id === updatedData.categoryId),
      }
      setSubcategories((prev) =>
        prev.map((subcategory) => (subcategory._id === updatedData._id ? updatedSubcategory : subcategory)),
      )
      setIsEditModalOpen(false)
    }
  
    const handleDeleteSubcategory = (subcategoryId) => {
      setSubcategories((prev) => prev.filter((subcategory) => subcategory._id !== subcategoryId))
      setSelectedSubcategories((prev) => prev.filter((id) => id !== subcategoryId))
    }
  
    const handleDeleteSelected = () => {
      if (selectedSubcategories.length === 0) return
      if (window.confirm(`Delete ${selectedSubcategories.length} selected subcategories?`)) {
        setSubcategories((prev) => prev.filter((subcategory) => !selectedSubcategories.includes(subcategory._id)))
        setSelectedSubcategories([])
        setSelectAll(false)
      }
    }
  
    const handleExport = () => {
      const csvContent = [
        ["ID", "Title", "Description", "Category", "Icon", "Created", "Updated"].join(","),
        ...filteredSubcategories.map((sub) =>
          [
            sub._id,
            `"${sub.title}"`,
            `"${sub.description || ""}"`,
            typeof sub.categoryId === "object" ? `"${sub.categoryId.name}"` : sub.categoryId,
            sub.icon || "",
            formatDate(sub.createdAt),
            formatDate(sub.updatedAt),
          ].join(","),
        ),
      ].join("\n")
  
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `subcategories_${new Date().toISOString().split("T")[0]}.csv`
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
  
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Subcategory Management</h1>
                <p className="text-sm text-gray-600 mt-1">Manage product subcategories and their organization</p>
              </div>
  
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subcategory
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                {selectedSubcategories.length > 0 && (
                  <Button variant="destructive" onClick={handleDeleteSelected}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete ({selectedSubcategories.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {/* Filters */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Formik
              initialValues={filters}
              validationSchema={subcategoryFilterSchema}
              onSubmit={() => {}}
              enableReinitialize
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search subcategories..."
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
                        setFilters((prev) => ({ ...prev, categoryId: e.target.value }))
                      }}
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
                        const resetFilters = { searchTerm: "", categoryId: "", dateRange: { start: "", end: "" } }
                        setFilters(resetFilters)
                        setFieldValue("searchTerm", "")
                        setFieldValue("categoryId", "")
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                <h3 className="text-lg font-medium text-gray-900">Subcategories ({filteredSubcategories.length})</h3>
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
                        Subcategory
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
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
                    {filteredSubcategories.map((subcategory) => (
                      <tr key={subcategory._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(subcategory._id)}
                            onChange={() => handleSelectSubcategory(subcategory._id)}
                            className="w-4 h-4 text-[#ffc107] border-gray-300 rounded focus:ring-[#ffc107]"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            {subcategory.icon && <span className="text-xl">{subcategory.icon}</span>}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{subcategory.title}</div>
                              <div className="text-sm text-gray-500">{subcategory._id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {typeof subcategory.categoryId === "object" ? (
                            <div className="flex items-center space-x-2">
                              {subcategory.categoryId.icon && (
                                <span className="text-lg">{subcategory.categoryId.icon}</span>
                              )}
                              <span className="text-sm text-gray-900">{subcategory.categoryId.name}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">ID: {subcategory.categoryId}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {subcategory.description || "No description"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(subcategory.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setCurrentSubcategory(subcategory)
                                setIsDetailsModalOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setCurrentSubcategory(subcategory)
                                setIsEditModalOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSubcategory(subcategory._id)}>
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
              {filteredSubcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {subcategory.icon && <span className="text-2xl">{subcategory.icon}</span>}
                      <div>
                        <h3 className="font-medium text-gray-900">{subcategory.title}</h3>
                        <p className="text-xs text-gray-500">{subcategory._id}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subcategory._id)}
                      onChange={() => handleSelectSubcategory(subcategory._id)}
                      className="w-4 h-4 text-[#ffc107] border-gray-300 rounded focus:ring-[#ffc107]"
                    />
                  </div>
  
                  {subcategory.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subcategory.description}</p>
                  )}
  
                  {typeof subcategory.categoryId === "object" && (
                    <div className="flex items-center space-x-2 mb-4">
                      {subcategory.categoryId.icon && <span className="text-sm">{subcategory.categoryId.icon}</span>}
                      <span className="text-sm text-gray-600">{subcategory.categoryId.name}</span>
                    </div>
                  )}
  
                  <div className="text-xs text-gray-500 mb-4">Created: {formatDate(subcategory.createdAt)}</div>
  
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentSubcategory(subcategory)
                        setIsDetailsModalOpen(true)
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentSubcategory(subcategory)
                        setIsEditModalOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteSubcategory(subcategory._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Modals */}
        {isAddModalOpen && <AddSubcategoryModal onSave={handleAddSubcategory} onClose={() => setIsAddModalOpen(false)} />}
  
        {isEditModalOpen && currentSubcategory && (
          <EditSubcategoryModal
            subcategory={currentSubcategory}
            onSave={handleEditSubcategory}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
  
        {isDetailsModalOpen && currentSubcategory && (
          <SubcategoryDetailsModal
            subcategory={currentSubcategory}
            onClose={() => setIsDetailsModalOpen(false)}
            onEdit={(subcategory) => {
              setCurrentSubcategory(subcategory)
              setIsEditModalOpen(true)
            }}
            onDelete={handleDeleteSubcategory}
          />
        )}
      </div>
    )
  }
  