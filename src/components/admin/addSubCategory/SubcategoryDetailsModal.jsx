import { useState } from "react"
import { Button } from "../UIs/addSubCategoryUi/Button"
import { X, Edit, Trash2, RefreshCw } from "lucide-react"

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

export const SubcategoryDetailsModal = ({ subcategory, onClose, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefreshSubcategory = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Subcategory refreshed")
    }, 800)
  }

  const handleDeleteSubcategory = () => {
    if (window.confirm("Are you sure you want to delete this subcategory? This action cannot be undone.")) {
      onDelete(subcategory._id)
      onClose()
    }
  }

  const handleEditSubcategory = () => {
    onEdit(subcategory)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            {subcategory.icon && <span className="text-2xl">{subcategory.icon}</span>}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{subcategory.title}</h2>
              <p className="text-sm text-gray-600">ID: {subcategory._id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefreshSubcategory} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Title</label>
                  <p className="mt-1 text-sm text-gray-900">{subcategory.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Icon</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {subcategory.icon ? (
                      <span className="flex items-center space-x-2">
                        <span className="text-lg">{subcategory.icon}</span>
                        <span>{subcategory.icon}</span>
                      </span>
                    ) : (
                      "No icon"
                    )}
                  </p>
                </div>
              </div>

              {subcategory.description && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{subcategory.description}</p>
                </div>
              )}
            </div>

            {/* Category Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Category Information</h3>
              {typeof subcategory.categoryId === "object" ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    {subcategory.categoryId.icon && <span className="text-xl">{subcategory.categoryId.icon}</span>}
                    <div>
                      <p className="font-medium text-gray-900">{subcategory.categoryId.name}</p>
                      {subcategory.categoryId.description && (
                        <p className="text-sm text-gray-600">{subcategory.categoryId.description}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Category ID: {subcategory.categoryId._id}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Category ID: {subcategory.categoryId}</p>
              )}
            </div>

            {/* Timestamps */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Timestamps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(subcategory.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(subcategory.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Statistics (Mock data) */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ffc107]">0</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ffc107]">0</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ffc107]">$0</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-gray-200 px-6 py-4">
          <Button variant="destructive" onClick={handleDeleteSubcategory}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Subcategory
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleEditSubcategory}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Subcategory
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
