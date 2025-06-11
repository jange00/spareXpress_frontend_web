import { PlusIcon, ImportIcon, ExportIcon, BulkIcon } from "./icons"

const ActionBar = ({ onAddProduct, onImportProducts, onExportProducts, onBulkAction, selectedCount }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onAddProduct}
          className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add New Product
        </button>
        <button
          onClick={onImportProducts}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ImportIcon className="w-5 h-5 mr-1" />
          Import Products
        </button>
        <button
          onClick={onExportProducts}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ExportIcon className="w-5 h-5 mr-1" />
          Export Products
        </button>
        {selectedCount > 0 && (
          <button
            onClick={onBulkAction}
            className="inline-flex items-center px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition-colors"
          >
            <BulkIcon className="w-5 h-5 mr-1" />
            Bulk Actions ({selectedCount})
          </button>
        )}
      </div>
    </div>
  )
}

export default ActionBar
