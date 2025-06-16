export function SyncModal({ isOpen, onClose, onSync }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Sync with External Tools</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Tool</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
            <option value="quickbooks">QuickBooks</option>
            <option value="zoho">Zoho</option>
            <option value="xero">Xero</option>
            <option value="sage">Sage</option>
            <option value="freshbooks">FreshBooks</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sync Options</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="syncSales" className="mr-2" defaultChecked />
              <label htmlFor="syncSales">Sales Data</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="syncExpenses" className="mr-2" defaultChecked />
              <label htmlFor="syncExpenses">Expenses</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="syncCustomers" className="mr-2" defaultChecked />
              <label htmlFor="syncCustomers">Customer Data</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="syncProducts" className="mr-2" defaultChecked />
              <label htmlFor="syncProducts">Product Data</label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sync Frequency</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
            <option value="manual">Manual Only</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="realtime">Real-time</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSync("QuickBooks")}
            className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
          >
            Connect & Sync
          </button>
        </div>
      </div>
    </div>
  )
}
