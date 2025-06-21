import { useState } from "react"
import { Button } from "../../UIs/orderUi/Button1"
import { PrinterIcon, TruckIcon, RefreshIcon } from "../../icons/Icons"
// import {
//   sampleUsers,
//   sampleProducts,
//   sampleShippingAddresses,
//   samplePayments,
//   printInvoice,
//   generateTrackingId,
// } from "../sampleData1"

// API mutation hook
import { useGetAllOrder } from "../../../../hook/admin/useOrder/useGetAllOrder"

export const OrderDetailsModal = ({ order, onClose, onUpdate, onDelete }) => {
  // console.log(order)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }



  // Initialize product mutation
  const { data: orders = [] } = useGetAllOrder();
  // console.log(orders)

  // Helper functions to get referenced data
  const getUser = (userId) => sampleUsers.find((user) => user._id === userId)
  const getProduct = (productId) => sampleProducts.find((product) => product._id === productId)
  const getShippingAddress = (addressId) => sampleShippingAddresses.find((addr) => addr._id === addressId)
  const getPayment = (paymentId) => samplePayments.find((payment) => payment._id === paymentId)

  const user = getUser(order.userId)
  const shippingAddress = getShippingAddress(order.shippingAddressId)
  const payment = getPayment(order.paymentId)

  // Button handlers
  const handlePrintInvoice = () => {
    setIsLoading(true)
    try {
      printInvoice(order, user, sampleProducts, shippingAddress, payment)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error printing invoice:", error)
      alert("Failed to print invoice. Please try again.")
      setIsLoading(false)
    }
  }

  const handleTrackPackage = () => {
    setIsLoading(true)
    try {
      const trackingId = generateTrackingId(order._id)
      // Simulate opening tracking page
      const trackingUrl = `https://example-courier.com/track/${trackingId}`
      window.open(trackingUrl, "_blank")

      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error tracking package:", error)
      alert("Failed to open tracking page. Please try again.")
      setIsLoading(false)
    }
  }

  const handleRefreshOrder = () => {
    setIsLoading(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false)
      alert("Order details refreshed successfully!")
    }, 800)
  }

  const handleUpdateOrder = () => {
    setIsLoading(true)
    setTimeout(() => {
      onUpdate(order._id)
      setIsLoading(false)
      alert("Order updated successfully!")
    }, 600)
  }

  const handleDeleteOrder = () => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      setIsLoading(true)
      setTimeout(() => {
        onDelete(order._id)
        setIsLoading(false)
        alert("Order deleted successfully!")
        onClose()
      }, 500)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Order Details: {order._id}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={handleRefreshOrder} disabled={isLoading}>
              <RefreshIcon className="w-4 h-4 mr-1" />
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="secondary" size="sm" onClick={handlePrintInvoice} disabled={isLoading}>
              <PrinterIcon className="w-4 h-4 mr-1" />
              {isLoading ? "Printing..." : "Print Invoice"}
            </Button>
          </div>
        </div>

        {/* Order Date */}
        <div className="px-6 py-2 border-b border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            Order created on {formatDate(order.createdAt)}
            {order.updatedAt !== order.createdAt && (
              <span className="ml-2">• Last updated {formatDate(order.updatedAt)}</span>
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { key: "details", label: "Order Details" },
            { key: "items", label: "Order Items" },
            { key: "shipping", label: "Shipping Information" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab.key
                  ? "text-[#FFB800] border-b-2 border-[#FFB800]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Customer Information</h3>
                 
                    <div className="text-sm">
                      <p className="font-medium">Fullname:- {order.userId.fullname}</p>
                      <p>Email:- {order.userId.email}</p>
                      <p>Phone Number:- {order.userId.phoneNumber}</p>
                      {/* <p className="text-gray-500">User ID: {order.userId._id}</p> */}
                    </div>
                  
                    <p className="text-sm text-gray-500">User ID: {order.userId._id}</p>
                  
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Order Summary</h3>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Total Amount:- </span> ${order.Amount}
                    </p>
                    <p>
                      <span className="font-medium">Items Count:- </span> {order.items.length}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Shipping and Payment Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Shipping Address</h3>
                  {shippingAddress ? (
                    <div className="text-sm">
                      <p>{shippingAddress.address}</p>
                      <p className="text-gray-500">Address ID: {order.shippingAddressId}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Address ID: {order.shippingAddressId.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Payment Information</h3>
                  {payment ? (
                    <div className="text-sm">
                      <p>
                        <span className="font-medium">Method:</span> {payment.method}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={
                            payment.status === "completed"
                              ? "text-green-600"
                              : payment.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }
                        >
                          {payment.status}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Amount:</span> ${payment.amount.toFixed(2)}
                      </p>
                      <p className="text-gray-500">Payment ID: {order.paymentId}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Payment ID: {order.paymentId}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "items" && (
            <div className="rounded-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item, index) => {
                    const product = getProduct(item.productId)
                    const unitPrice = product ? product.price : item.total / item.quantity
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product ? product.name : `Product ID: ${item.productId}`}
                          </div>
                          <div className="text-sm text-gray-500">ID: {item.productId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${unitPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      Grand Total:
                    </td>
                    <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">${order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Shipping Address</h3>
                {shippingAddress ? (
                  <p className="text-sm">{shippingAddress.address}</p>
                ) : (
                  <p className="text-sm text-gray-500">Address ID: {order.shippingAddressId}</p>
                )}
              </div>

              <hr className="border-gray-200" />

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Tracking Information</h3>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Tracking ID:</span> {generateTrackingId(order._id)}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> In Transit
                  </p>
                  <p>
                    <span className="font-medium">Estimated Delivery:</span>{" "}
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4">
                  <Button onClick={handleTrackPackage} disabled={isLoading}>
                    <TruckIcon className="w-5 h-5 mr-1" />
                    {isLoading ? "Opening..." : "Track Package"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-gray-200 px-6 py-4">
          <Button variant="danger" onClick={handleDeleteOrder} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Order"}
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleUpdateOrder} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
