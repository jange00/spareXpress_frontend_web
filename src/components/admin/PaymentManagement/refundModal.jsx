import { useState } from "react"
import { XIcon, AlertTriangleIcon } from "./icons"

export const RefundModal = ({
  transaction,
  refundAmount,
  setRefundAmount,
  refundReason,
  setRefundReason,
  onClose,
  onRefund,
  formatCurrency,
}) => {
  // State for refund type
  const [refundType, setRefundType] = useState("full")

  // Handle refund type change
  const handleRefundTypeChange = (type) => {
    setRefundType(type)
    if (type === "full") {
      setRefundAmount(transaction.amount)
    } else {
      setRefundAmount(0)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (refundAmount <= 0) {
      alert("Please enter a valid refund amount")
      return
    }

    if (refundAmount > transaction.amount) {
      alert("Refund amount cannot exceed the transaction amount")
      return
    }

    if (!refundReason.trim()) {
      alert("Please enter a reason for the refund")
      return
    }

    onRefund()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Process Refund</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              {/* Transaction Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{transaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Original Amount:</span>
                  <span className="font-medium">{formatCurrency(transaction.amount)}</span>
                </div>
              </div>

              {/* Refund Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Refund Type</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="full-refund"
                      name="refund-type"
                      checked={refundType === "full"}
                      onChange={() => handleRefundTypeChange("full")}
                      className="h-4 w-4 text-[#FFB800] border-gray-300 focus:ring-[#FFB800]"
                    />
                    <label htmlFor="full-refund" className="ml-2 text-sm text-gray-700">
                      Full Refund
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="partial-refund"
                      name="refund-type"
                      checked={refundType === "partial"}
                      onChange={() => handleRefundTypeChange("partial")}
                      className="h-4 w-4 text-[#FFB800] border-gray-300 focus:ring-[#FFB800]"
                    />
                    <label htmlFor="partial-refund" className="ml-2 text-sm text-gray-700">
                      Partial Refund
                    </label>
                  </div>
                </div>
              </div>

              {/* Refund Amount */}
              <div className="space-y-2">
                <label htmlFor="refund-amount" className="block text-sm font-medium text-gray-700">
                  Refund Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    id="refund-amount"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(Number.parseFloat(e.target.value) || 0)}
                    step="0.01"
                    min="0"
                    max={transaction.amount}
                    disabled={refundType === "full"}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                  />
                </div>
              </div>

              {/* Refund Reason */}
              <div className="space-y-2">
                <label htmlFor="refund-reason" className="block text-sm font-medium text-gray-700">
                  Reason for Refund
                </label>
                <textarea
                  id="refund-reason"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                  placeholder="Please provide a reason for this refund"
                  required
                ></textarea>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This action cannot be undone. The customer will be refunded {formatCurrency(refundAmount)}.
                    </p>
                  </div>
                </div>
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
              Process Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
