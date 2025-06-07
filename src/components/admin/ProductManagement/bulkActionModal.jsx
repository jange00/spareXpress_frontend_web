import { XIcon } from "./icons"

const BulkActionModal = ({ selectedCount, onApply, onClose, bulkAction, setBulkAction, bulkValue, setBulkValue }) => {
  const isDisabled = !bulkAction || (bulkAction === "price" && !bulkValue) || (bulkAction === "stock" && !bulkValue)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Bulk Actions ({selectedCount} products)</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
            >
              <option value="">Select Action</option>
              <option value="price">Update Price</option>
              <option value="stock">Mark as Out of Stock</option>
              <option value="delete">Delete Products</option>
            </select>
          </div>

          {bulkAction === "price" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Price</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={bulkValue}
                  onChange={(e) => setBulkValue(e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                />
              </div>
            </div>
          )}

          {bulkAction === "stock" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
              <select
                value={bulkValue}
                onChange={(e) => setBulkValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
              >
                <option value="">Select Status</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          )}

          {bulkAction === "delete" && (
            <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
              <p>Warning: This action will permanently delete the selected products and cannot be undone.</p>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onApply}
              disabled={isDisabled}
              className={`px-4 py-2 font-medium rounded-md ${
                isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : bulkAction === "delete"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-[#FFB800] text-black hover:bg-[#FFB800]/90"
              } transition-colors`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkActionModal
