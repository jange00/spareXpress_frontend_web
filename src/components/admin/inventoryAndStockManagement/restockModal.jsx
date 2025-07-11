import { useState } from "react"
import { XIcon, CheckIcon } from "lucide-react"

const RestockModal = ({ product, onClose, onRestock, warehouses }) => {
  // State for restock form
  const [restockAmount, setRestockAmount] = useState(1)
  const [warehouseId, setWarehouseId] = useState(product.warehouse)
  const [restockDate, setRestockDate] = useState(new Date().toISOString().split("T")[0])
  const [supplierNotes, setSupplierNotes] = useState("")

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    onRestock(product.id, Number.parseInt(restockAmount))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Restock Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
            <div className="space-y-6">
              {/* Product Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Product Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Product Name</p>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm text-gray-500">SKU</p>
                    <p className="font-medium">{product.sku}</p>
                  </div> */}
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">
                      {product.categoryId.title} &gt; {product.subcategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium">{product.brandId.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Stock</p>
                    <p className="font-medium">{product.stock} Units</p>
                  </div>
                </div>
              </div>

              {/* Restock Details */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Restock Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Restock Amount*</label>
                    <input
                      type="number"
                      value={restockAmount}
                      onChange={(e) => setRestockAmount(e.target.value)}
                      min="1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Restock Date*</label>
                    <input
                      type="date"
                      value={restockDate}
                      onChange={(e) => setRestockDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Supplier Notes (Optional)</label>
                  <textarea
                    value={supplierNotes}
                    onChange={(e) => setSupplierNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="Enter any notes about the supplier or delivery"
                  ></textarea>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              <CheckIcon className="w-5 h-5 mr-1 inline" />
              Confirm Restock
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RestockModal
