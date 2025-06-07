import { useState, useEffect } from "react"
import { OrderDetailsModal } from "../../components/admin/orderManagement/orderDetailsModal"
import { AddOrderModal } from "../../components/admin/orderManagement/addOrderModal"
import { BulkActionModal } from "../../components/admin/orderManagement/bulkActionModal"
import { Badge } from "../../components/admin/orderManagement/ui/badgeCustom"
import { initialOrders } from "../../components/admin/orderManagement/sampleData"
import {
  SearchIcon,
  PlusIcon,
  ExportIcon,
  PackageIcon,
  CalendarIcon,
  ChevronDownIcon,
  EyeIcon,
  MoreHorizontalIcon,
  RefreshIcon,
  PrinterIcon,
  TrashIcon,
  XIcon,
} from "../../components/admin/orderManagement/icons"

/**
 * OrderManagement Component
 *
 * A comprehensive order management interface for e-commerce applications.
 * Features include:
 * - Order listing with advanced filtering and sorting
 * - Order details viewing
 * - Order status management
 * - Add new manual orders
 * - Bulk actions for multiple orders
 * - Export functionality
 */
const OrderManagement = () => {
  // ================ STATE MANAGEMENT ================
  // Primary state for orders data
  const [orders, setOrders] = useState(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState(initialOrders)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: "", end: "" })

  // Selection states
  const [selectedOrders, setSelectedOrders] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Modal states
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState("")

  // ================ EFFECTS ================
  // Debug orders state changes
  useEffect(() => {
    console.log("Orders state updated:", orders)
  }, [orders])

  // Filter orders based on search, status, payment method, and date range
  useEffect(() => {
    let result = [...orders]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Apply payment method filter
    if (paymentMethodFilter) {
      result = result.filter((order) => order.paymentMethod === paymentMethodFilter)
    }

    // Apply date range filter
    if (dateRangeFilter.start && dateRangeFilter.end) {
      const startDate = new Date(dateRangeFilter.start)
      const endDate = new Date(dateRangeFilter.end)
      endDate.setHours(23, 59, 59, 999) // Set to end of day

      result = result.filter((order) => {
        const orderDate = new Date(order.date)
        return orderDate >= startDate && orderDate <= endDate
      })
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setFilteredOrders(result)
  }, [orders, searchTerm, statusFilter, paymentMethodFilter, dateRangeFilter])

  // ================ EVENT HANDLERS ================
  /**
   * Handles selecting all orders
   * Toggles between selecting all filtered orders and deselecting all
   */
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
    setSelectAll(!selectAll)
  }

  /**
   * Handles selecting individual order
   * @param {string} id - Order ID to toggle selection
   */
  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  /**
   * Opens order details modal for a specific order
   * @param {Object} order - Order object to view
   */
  const handleViewOrder = (order) => {
    setCurrentOrder(order)
    setIsOrderDetailsOpen(true)
  }

  /**
   * Updates the status of an order
   * @param {string} orderId - ID of the order to update
   * @param {string} newStatus - New status to set
   */
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder({ ...currentOrder, status: newStatus })
    }
  }

  /**
   * Adds a new order to the system
   * @param {Object} newOrder - New order data
   */
  const handleAddOrder = (newOrder) => {
    // Generate a new order ID
    const orderNumber = Math.max(...orders.map((o) => Number.parseInt(o.id.split("-")[1]))) + 1
    const orderId = `ORD-${orderNumber}`

    const order = {
      ...newOrder,
      id: orderId,
      date: new Date().toISOString(),
    }

    setOrders([order, ...orders])
    setIsAddOrderOpen(false)
  }

  /**
   * Applies bulk action to selected orders
   */
  const handleApplyBulkAction = () => {
    if (bulkAction === "status-update") {
      // This would be handled by the BulkActionModal component
    } else if (bulkAction === "cancel") {
      if (window.confirm(`Are you sure you want to cancel ${selectedOrders.length} orders?`)) {
        setOrders(
          orders.map((order) => (selectedOrders.includes(order.id) ? { ...order, status: "cancelled" } : order)),
        )
        setSelectedOrders([])
        setSelectAll(false)
      }
    } else if (bulkAction === "generate-invoices") {
      alert(`Generating invoices for ${selectedOrders.length} orders`)
      // In a real application, this would trigger invoice generation
    }

    setIsBulkActionOpen(false)
    setBulkAction("")
  }

  /**
   * Exports orders in the specified format
   * @param {string} format - Export format (csv, excel, pdf)
   */
  const handleExportOrders = (format) => {
    // In a real application, this would generate and download the file
    alert(`Exporting orders as ${format.toUpperCase()}`)
  }

  // ================ UTILITY FUNCTIONS ================
  /**
   * Formats date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
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

  /**
   * Returns appropriate badge component for order status
   * @param {string} status - Order status
   * @returns {JSX.Element} Status badge component
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge color="yellow">Pending</Badge>
      case "processing":
        return <Badge color="blue">Processing</Badge>
      case "shipped":
        return <Badge color="indigo">Shipped</Badge>
      case "delivered":
        return <Badge color="green">Delivered</Badge>
      case "cancelled":
        return <Badge color="red">Cancelled</Badge>
      default:
        return <Badge color="gray">{status}</Badge>
    }
  }

  /**
   * Returns human-readable payment method label
   * @param {string} method - Payment method code
   * @returns {string} Human-readable payment method
   */
  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case "credit-card":
        return "Credit Card"
      case "paypal":
        return "PayPal"
      case "bank-transfer":
        return "Bank Transfer"
      case "cash-on-delivery":
        return "Cash on Delivery"
      default:
        return method
    }
  }

  // ================ RENDER FUNCTION ================
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Actions & Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsAddOrderOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add Manual Order
              </button>

              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => document.getElementById("exportDropdown").classList.toggle("hidden")}
                >
                  <ExportIcon className="w-5 h-5 mr-1" />
                  Export Orders
                </button>
                <div
                  id="exportDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleExportOrders("csv")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportOrders("excel")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExportOrders("pdf")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              {selectedOrders.length > 0 && (
                <div className="relative">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition-colors"
                    onClick={() => document.getElementById("bulkActionDropdown").classList.toggle("hidden")}
                  >
                    <PackageIcon className="w-5 h-5 mr-1" />
                    Bulk Actions ({selectedOrders.length})
                  </button>
                  <div
                    id="bulkActionDropdown"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setBulkAction("status-update")
                          setIsBulkActionOpen(true)
                          document.getElementById("bulkActionDropdown").classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <RefreshIcon className="w-4 h-4 inline mr-2" />
                        Update Status
                      </button>
                      <button
                        onClick={() => {
                          setBulkAction("cancel")
                          handleApplyBulkAction()
                          document.getElementById("bulkActionDropdown").classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <XIcon className="w-4 h-4 inline mr-2" />
                        Cancel Orders
                      </button>
                      <button
                        onClick={() => {
                          setBulkAction("generate-invoices")
                          handleApplyBulkAction()
                          document.getElementById("bulkActionDropdown").classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <PrinterIcon className="w-4 h-4 inline mr-2" />
                        Generate Invoices
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              />
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                onClick={() => document.getElementById("dateRangeDropdown").classList.toggle("hidden")}
              >
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  {dateRangeFilter.start && dateRangeFilter.end ? (
                    <span>
                      {new Date(dateRangeFilter.start).toLocaleDateString()} -{" "}
                      {new Date(dateRangeFilter.end).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-gray-500">Select date range</span>
                  )}
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </button>
              <div
                id="dateRangeDropdown"
                className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg hidden z-10 p-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="block text-sm font-medium text-gray-700">From</label>
                    <input
                      type="date"
                      value={dateRangeFilter.start}
                      onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <input
                      type="date"
                      value={dateRangeFilter.end}
                      onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        setDateRangeFilter({ start: "", end: "" })
                        document.getElementById("dateRangeDropdown").classList.add("hidden")
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("dateRangeDropdown").classList.add("hidden")
                      }}
                      className="px-3 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Payment Methods</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="cash-on-delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Order List Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
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
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                      />
                    </div>
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
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
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
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(order.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getPaymentMethodLabel(order.paymentMethod)}</div>
                        <div className="text-sm text-gray-500">
                          {order.paymentStatus === "paid" ? (
                            <span className="text-green-600">Paid</span>
                          ) : order.paymentStatus === "refunded" ? (
                            <span className="text-orange-600">Refunded</span>
                          ) : (
                            <span className="text-gray-600">Pending</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="text-[#FFB800] hover:text-[#FFB800]/80 mr-3"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() =>
                                document.getElementById(`actionDropdown-${order.id}`).classList.toggle("hidden")
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </button>
                            <div
                              id={`actionDropdown-${order.id}`}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeIcon className="w-4 h-4 inline mr-2" />
                                  View Order
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(order.id, "processing")}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <RefreshIcon className="w-4 h-4 inline mr-2" />
                                  Update Status
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <PrinterIcon className="w-4 h-4 inline mr-2" />
                                  Print Invoice
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                  <TrashIcon className="w-4 h-4 inline mr-2" />
                                  Cancel Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {isOrderDetailsOpen && currentOrder && (
        <OrderDetailsModal
          order={currentOrder}
          onClose={() => setIsOrderDetailsOpen(false)}
          onUpdateStatus={handleUpdateStatus}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          getPaymentMethodLabel={getPaymentMethodLabel}
        />
      )}

      {/* Add Order Modal */}
      {isAddOrderOpen && <AddOrderModal onSave={handleAddOrder} onClose={() => setIsAddOrderOpen(false)} />}

      {/* Bulk Action Modal */}
      {isBulkActionOpen && bulkAction === "status-update" && (
        <BulkActionModal
          selectedCount={selectedOrders.length}
          onApply={(newStatus) => {
            setOrders(
              orders.map((order) => (selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order)),
            )
            setIsBulkActionOpen(false)
            setSelectedOrders([])
            setSelectAll(false)
          }}
          onClose={() => setIsBulkActionOpen(false)}
        />
      )}
    </div>
  )
}

// File Text Icon Component
const FileTextIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

export default OrderManagement
