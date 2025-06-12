import { useState } from "react"
import { XIcon } from "lucide-react"

const BulkActionModal = ({ action, selectedCount, onApply, onClose, warehouses }) => {
  const [value, setValue] = useState("")

  let actionTitle = ""
  let actionLabel = ""
  let inputType = "text"

  if (action === "update-stock") {
    actionTitle = "Update Stock Levels"
    actionLabel = "New Stock Level"
    inputType = "number"
  } else if (action === "move-warehouse") {
    actionTitle = "Move to Warehouse"
    actionLabel = "Select Warehouse"
    inputType = "select"
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md  bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">
            {actionTitle} ({selectedCount} products)
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{actionLabel}</label>

              {inputType === "number" ? (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                />
              ) : (
                <select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                >
                  <option value="">Select warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onApply(action, value)}
              disabled={!value}
              className={`px-4 py-2 font-medium rounded-md ${
                !value
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFB800] text-black hover:bg-[#FFB800]/90"
              } transition-colors`}
            >
              Apply to Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkActionModal
