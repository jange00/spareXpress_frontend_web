import { useState } from "react"
import { XIcon } from "./icons"

/**
 * Bulk Action Modal Component
 *
 * Allows applying bulk actions to multiple selected orders
 *
 * @param {Object} props - Component props
 * @param {number} props.selectedCount - Number of selected orders
 * @param {Function} props.onApply - Function to call when applying the action
 * @param {Function} props.onClose - Function to call when closing the modal
 */
export const BulkActionModal = ({ selectedCount, onApply, onClose }) => {
  const [newStatus, setNewStatus] = useState("")

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Update Order Status ({selectedCount} orders)</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
              >
                <option value="">Select new status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
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
              onClick={() => onApply(newStatus)}
              disabled={!newStatus}
              className={`px-4 py-2 font-medium rounded-md ${
                !newStatus
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFB800] text-black hover:bg-[#FFB800]/90"
              } transition-colors`}
            >
              Update Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
