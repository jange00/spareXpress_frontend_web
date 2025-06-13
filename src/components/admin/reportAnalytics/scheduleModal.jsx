export function ScheduleModal({ isOpen, onClose, onSchedule }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Schedule Automated Reports</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
            <option value="sales">Sales Report</option>
            <option value="customers">Customer Report</option>
            <option value="products">Product Report</option>
            <option value="comprehensive">Comprehensive Report</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Recipients</label>
          <input
            type="text"
            placeholder="Enter email addresses (comma separated)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSchedule("weekly")}
            className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  )
}
