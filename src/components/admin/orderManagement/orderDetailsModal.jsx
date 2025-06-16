import { useState } from "react"
import { PrinterIcon, MailIcon, TruckIcon } from "./icons"

/**
 * Order Details Modal Component
 *
 * Displays detailed information about an order including:
 * - Customer information
 * - Order status
 * - Payment details
 * - Order items
 * - Shipping information
 *
 * @param {Object} props - Component props
 * @param {Object} props.order - Order object to display
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {Function} props.onUpdateStatus - Function to call when updating order status
 * @param {Function} props.formatDate - Function to format date strings
 * @param {Function} props.getStatusBadge - Function to get status badge component
 * @param {Function} props.getPaymentMethodLabel - Function to get payment method label
 */
export const OrderDetailsModal = ({
  order,
  onClose,
  onUpdateStatus,
  formatDate,
  getStatusBadge,
  getPaymentMethodLabel,
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between w-full">
            <span>Order Details: {order.id}</span>
            <div className="flex items-center space-x-2">
              <button
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => alert("Invoice generated")}
              >
                <PrinterIcon className="w-4 h-4 mr-1" />
                Print Invoice
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => alert("Email sent")}
              >
                <MailIcon className="w-4 h-4 mr-1" />
                Send Email
              </button>
            </div>
          </h2>
        </div>

        <div className="px-6 py-2 border-b border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">Order placed on {formatDate(order.date)}</p>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "details" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("details")}
          >
            Order Details
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "items" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("items")}
          >
            Order Items
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "shipping" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping Info
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Order Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Customer Information</h3>
                  <div className="text-sm">
                    <p className="font-medium">{order.customer.name}</p>
                    <p>{order.customer.email}</p>
                    <p>{order.customer.phone}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Order Status</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(order.status)}
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                      className="ml-2 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Payment Information</h3>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Method:</span> {getPaymentMethodLabel(order.paymentMethod)}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {order.paymentStatus === "paid" ? (
                        <span className="text-green-600">Paid</span>
                      ) : order.paymentStatus === "refunded" ? (
                        <span className="text-orange-600">Refunded</span>
                      ) : (
                        <span className="text-gray-600">Pending</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Order Notes</h3>
                  <div className="text-sm">
                    {order.notes ? <p>{order.notes}</p> : <p className="text-gray-500">No notes for this order</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Items Tab */}
          {activeTab === "items" && (
            <div className="rounded-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
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
                      Quantity
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
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      Grand Total:
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">${order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Shipping Info Tab */}
          {activeTab === "shipping" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Shipping Address</h3>
                <p className="text-sm">{order.shipping.address}</p>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Courier Information</h3>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Courier:</span> {order.shipping.courier}
                    </p>
                    <p>
                      <span className="font-medium">Tracking ID:</span>{" "}
                      {order.shipping.trackingId !== "Pending" ? (
                        <span className="text-blue-600">{order.shipping.trackingId}</span>
                      ) : (
                        <span className="text-gray-500">Pending</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Delivery Information</h3>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {new Date(order.shipping.estimatedDelivery).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {getStatusBadge(order.status)}
                    </p>
                  </div>
                </div>
              </div>

              {order.status === "shipped" && (
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors">
                    <TruckIcon className="w-5 h-5 mr-1" />
                    Track Package
                  </button>
                </div>
              )}
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
            className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            onClick={() => {
              // Update status to the next logical step
              const statusFlow = ["pending", "processing", "shipped", "delivered"]
              const currentIndex = statusFlow.indexOf(order.status)
              if (currentIndex >= 0 && currentIndex < statusFlow.length - 1) {
                onUpdateStatus(order.id, statusFlow[currentIndex + 1])
              }
            }}
            disabled={order.status === "delivered" || order.status === "cancelled"}
          >
            <TruckIcon className="w-5 h-5 mr-1 inline" />
            {order.status === "pending"
              ? "Process Order"
              : order.status === "processing"
                ? "Mark as Shipped"
                : order.status === "shipped"
                  ? "Mark as Delivered"
                  : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  )
}
