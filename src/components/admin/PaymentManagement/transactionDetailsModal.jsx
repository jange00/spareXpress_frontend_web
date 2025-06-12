import { useState } from "react"
import { RefundIcon, ReceiptIcon } from "./icons"

export const TransactionDetailsModal = ({
  transaction,
  onClose,
  onViewInvoice,
  onRefund,
  formatDate,
  formatCurrency,
  getStatusBadge,
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("details")

  // Calculate order total
  const calculateTotal = () => {
    return transaction.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between w-full">
            <span>Transaction Details: {transaction.id}</span>
            <div className="flex items-center space-x-2">
              {transaction.status === "successful" && (
                <button
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                  onClick={onRefund}
                >
                  <RefundIcon className="w-4 h-4 mr-1" />
                  Issue Refund
                </button>
              )}
            </div>
          </h2>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "details" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("details")}
          >
            Transaction Details
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "customer" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("customer")}
          >
            Customer Information
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "items" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("items")}
          >
            Order Items
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Transaction Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Transaction Summary</h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-medium">{transaction.id}</p>
                      </div>
                      <div>{getStatusBadge(transaction.status)}</div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{transaction.orderId}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{formatDate(transaction.date)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-xl font-bold">{formatCurrency(transaction.amount)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Payment Information</h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{transaction.paymentMethod}</p>
                      {transaction.paymentType && <p className="text-sm text-gray-500">{transaction.paymentType}</p>}
                    </div>

                    {transaction.gatewayReference && (
                      <div>
                        <p className="text-sm text-gray-500">Gateway Reference</p>
                        <p className="font-medium">{transaction.gatewayReference}</p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={onViewInvoice}
                        className="w-full px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
                      >
                        <ReceiptIcon className="w-5 h-5 inline mr-2" />
                        View Invoice
                      </button>
                    </div>
                  </div>

                  {transaction.notes && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Notes</p>
                      <p className="text-sm text-gray-700">{transaction.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Customer Information Tab */}
          {activeTab === "customer" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Customer Details</h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{transaction.customerName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{transaction.customerEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Address Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium text-gray-900">Billing Address</p>
                      <p className="text-sm">{transaction.billingAddress.street}</p>
                      <p className="text-sm">
                        {transaction.billingAddress.city}, {transaction.billingAddress.state}{" "}
                        {transaction.billingAddress.zip}
                      </p>
                      <p className="text-sm">{transaction.billingAddress.country}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                      <p className="text-sm">{transaction.shippingAddress.street}</p>
                      <p className="text-sm">
                        {transaction.shippingAddress.city}, {transaction.shippingAddress.state}{" "}
                        {transaction.shippingAddress.zip}
                      </p>
                      <p className="text-sm">{transaction.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Items Tab */}
          {activeTab === "items" && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Order Items</h3>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transaction.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900 text-right">
                        {formatCurrency(calculateTotal())}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>

          <button
            onClick={onViewInvoice}
            className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
          >
            <ReceiptIcon className="w-5 h-5 mr-1 inline" />
            View Invoice
          </button>
        </div>
      </div>
    </div>
  )
}
