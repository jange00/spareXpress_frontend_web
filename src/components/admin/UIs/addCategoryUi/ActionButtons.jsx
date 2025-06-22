import { Download, RefreshCw, FileText, Plus, Trash2, Filter } from "lucide-react"
import { useState } from "react"

export default function ActionButtons({
  selectedCategories,
  categories,
  onExport,
  onRefresh,
  onCreateCategory,
  onBulkDelete,
  onClearFilters,
}) {
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false)

  const handleExportClick = (format) => {
    onExport(format)
    setExportDropdownOpen(false)
  }

  return (
    <div className="flex justify-end items-center gap-3 mb-6">
      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        title="Clear all filters"
      >
        <Filter className="w-4 h-4 mr-2" />
        Clear Filters
      </button>

      {/* Bulk Delete Button - Only show when categories are selected */}
      {selectedCategories.length > 0 && (
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${selectedCategories.length} selected categories?`)) {
              onBulkDelete(selectedCategories)
            }
          }}
          className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
          title={`Delete ${selectedCategories.length} selected categories`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete ({selectedCategories.length})
        </button>
      )}

      {/* Export Dropdown */}
      <div className="relative">
        <button
          className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
          onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
          title="Export categories"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>

        {exportDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
            <div className="py-1">
              <button
                onClick={() => handleExportClick("csv")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export as CSV
              </button>
              <button
                onClick={() => handleExportClick("excel")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export as Excel
              </button>
              <button
                onClick={() => handleExportClick("pdf")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export as PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        className="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors"
        title="Refresh categories"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </button>

      {/* Add Category Button */}
      <button
        onClick={onCreateCategory}
        className="inline-flex items-center px-4 py-2 bg-[#ffc107] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
        title="Add new category"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </button>
    </div>
  )
}
