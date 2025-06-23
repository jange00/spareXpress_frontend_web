import { useState } from "react"
import { Button } from "../UIs/addBrandUi/Button"
import { X, Edit, Trash2, RefreshCw, Package } from "lucide-react"

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

export const BrandDetailsModal = ({ brand, onClose, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefreshBrand = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Brand refreshed")
    }, 800)
  }

  const handleDeleteBrand = () => {
    if (window.confirm("Are you sure you want to delete this brand? This action cannot be undone.")) {
      onDelete(brand._id)
      onClose()
    }
  }

  const handleEditBrand = () => {
    onEdit(brand)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-[#ffc107]" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{brand.title}</h2>
              <p className="text-sm text-gray-600">ID: {brand._id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefreshBrand} disabled={isLoading}>
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
              <h3 className="font-medium text-gray-900 mb-3">Brand Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Title</label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">{brand.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Count</label>
                  <p className="mt-1 text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffc107] text-black">
                      {brand.count} items
                    </span>
                  </p>
                </div>
              </div>

              {brand.model && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500">Model</label>
                  <p className="mt-1 text-sm text-gray-900">{brand.model}</p>
                </div>
              )}
            </div>

            {/* Category Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Category Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Category</label>
                  {typeof brand.categoryId === "object" ? (
                    <div className="mt-1 flex items-center space-x-2">
                      {brand.categoryId.icon && <span className="text-lg">{brand.categoryId.icon}</span>}
                      <span className="text-sm text-gray-900 font-medium">{brand.categoryId.name}</span>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">Category ID: {brand.categoryId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Subcategory</label>
                  {typeof brand.subcategoryId === "object" ? (
                    <div className="mt-1 flex items-center space-x-2">
                      {brand.subcategoryId.icon && <span className="text-lg">{brand.subcategoryId.icon}</span>}
                      <span className="text-sm text-gray-900 font-medium">{brand.subcategoryId.title}</span>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">Subcategory ID: {brand.subcategoryId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Timestamps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(brand.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(brand.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Statistics (Mock data) */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ffc107]">{brand.count}</p>
                  <p className="text-sm text-gray-600">Total Items</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ffc107]">0</p>
                  <p className="text-sm text-gray-600">Active Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ffc107]">$0</p>
                  <p className="text-sm text-gray-600">Total Value</p>
                </div>
              </div>
            </div>

            {/* Brand Hierarchy */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Brand Hierarchy</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {typeof brand.categoryId === "object" && (
                  <>
                    <span className="flex items-center space-x-1">
                      {brand.categoryId.icon && <span>{brand.categoryId.icon}</span>}
                      <span>{brand.categoryId.name}</span>
                    </span>
                    <span>→</span>
                  </>
                )}
                {typeof brand.subcategoryId === "object" && (
                  <>
                    <span className="flex items-center space-x-1">
                      {brand.subcategoryId.icon && <span>{brand.subcategoryId.icon}</span>}
                      <span>{brand.subcategoryId.title}</span>
                    </span>
                    <span>→</span>
                  </>
                )}
                <span className="font-medium text-gray-900">{brand.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-gray-200 px-6 py-4">
          <Button variant="destructive" onClick={handleDeleteBrand}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Brand
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleEditBrand}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Brand
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
