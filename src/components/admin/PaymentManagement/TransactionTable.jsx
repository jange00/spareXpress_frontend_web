import {
  Eye,
  MoreHorizontal,
  Receipt,
  RotateCcw,
  RefreshCw,
  X,
} from "lucide-react";
import { formatDate, formatCurrency } from "../utils/payment/formatters";
import StatusBadge from "../UIs/paymentUi/StatusBadge";

export default function TransactionTable({
  transactions,
  selectedTransactions,
  selectAll,
  onSelectAll,
  onSelectTransaction,
  onViewTransaction,
  onViewInvoice,
  onRefundTransaction,
  onRetryPayment,
  onCancelPayment,
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={onSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transaction ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Method
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map(
                (transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(
                          transaction._id
                        )}
                        onChange={() => onSelectTransaction(transaction._id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction._id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.orderId?._id || transaction.orderId || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.userId?.fullname || " N / A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.userId?.email || " N / A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.paymentMethod}
                      </div>
                      {transaction.paymentType && (
                        <div className="text-xs text-gray-500">
                          {transaction.paymentType}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(transaction.createdAt).split(",")[0]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(transaction.createdAt).split(",")[1]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={transaction.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onViewTransaction(transaction)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() =>
                              document
                                .getElementById(
                                  `actionDropdown-${transaction._id}`
                                )
                                ?.classList.toggle("hidden")
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          <div
                            id={`actionDropdown-${transaction._id}`}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                          >
                            <div className="py-1">
                              <button
                                onClick={() => onViewTransaction(transaction)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4 inline mr-2" />
                                View Details
                              </button>
                              <button
                                onClick={() => onViewInvoice(transaction)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Receipt className="w-4 h-4 inline mr-2" />
                                View Invoice
                              </button>

                              {transaction.status === "successful" && (
                                <button
                                  onClick={() =>
                                    onRefundTransaction(transaction)
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <RotateCcw className="w-4 h-4 inline mr-2" />
                                  Process Refund
                                </button>
                              )}

                              {transaction.status === "failed" && (
                                <button
                                  onClick={() =>
                                    onRetryPayment(transaction._id)
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <RefreshCw className="w-4 h-4 inline mr-2" />
                                  Retry Payment
                                </button>
                              )}

                              {transaction.status === "pending" && (
                                <button
                                  onClick={() =>
                                    onCancelPayment(transaction._id)
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  <X className="w-4 h-4 inline mr-2" />
                                  Cancel Payment
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
