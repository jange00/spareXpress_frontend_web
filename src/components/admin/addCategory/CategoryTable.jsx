import { useState, useEffect, useRef } from "react"
import { Edit, Trash2, Package, MoreVertical } from "lucide-react"
import { formatDate } from "../utils/addCategory/category-utils"
import StatusBadge from "../UIs/addCategoryUi/StatusBadge"

export default function CategoryTable({ categories, onEdit, onDelete, selectedCategories, onSelectionChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(categories.map((cat) => cat._id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectCategory = (categoryId, checked) => {
    if (checked) {
      onSelectionChange([...selectedCategories, categoryId])
    } else {
      onSelectionChange(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleEdit = (category) => {
    onEdit(category)
    setDropdownOpen(null)
  }

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.title}"?`)) {
      onDelete(category._id)
    }
    setDropdownOpen(null)
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-12 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500">Get started by adding your first category using the button above.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Categories ({categories.length})</h3>
          </div>
          {selectedCategories.length > 0 && (
            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
              {selectedCategories.length} selected
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === categories.length && categories.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#ffc107] focus:ring-yellow-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr
                  key={category._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-yellow-50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={(e) => handleSelectCategory(category._id, e.target.checked)}
                      className="rounded border-gray-300 text-[#ffc107] focus:ring-yellow-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-[#ffc107] bg-opacity-20 flex items-center justify-center">
                          <Package className="h-4 w-4 text-[#ffc107]" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{category.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status="active" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(category.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(category.updatedAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === category._id ? null : category._id)}
                        className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                        title="More actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {dropdownOpen === category._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                          <div className="py-1">
                            <button
                              onClick={() => handleEdit(category)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Category
                            </button>
                            <button
                              onClick={() => handleDelete(category)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Category
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
