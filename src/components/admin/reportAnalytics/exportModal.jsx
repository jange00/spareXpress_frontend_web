export function ExportModal({ isOpen, onClose, onExport }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Export Reports</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Include</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="includeSales" className="mr-2" defaultChecked />
              <label htmlFor="includeSales">Sales Data</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="includeCustomers" className="mr-2" defaultChecked />
              <label htmlFor="includeCustomers">Customer Data</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="includeProducts" className="mr-2" defaultChecked />
              <label htmlFor="includeProducts">Product Data</label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onExport("pdf")}
            className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  )
}
