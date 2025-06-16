"use client"

import { useState, useEffect } from "react"
import { OrderDetailsModal } from "../../components/admin/orderManagement/modal/OrderDetailsModal"
import { AddOrderModal } from "../../components/admin/orderManagement/modal/AddOrderModal"
import { Button } from "../../components/admin/UIs/orderUi/Button1"
import { Select } from "../../components/admin/UIs/orderUi/Select"
import { SearchIcon, PlusIcon, ExportIcon, EyeIcon, MoreHorizontalIcon, RefreshIcon, TrashIcon } from "../../components/admin/icons/Icons"
import {
  sampleUsers,
  samplePayments,
  initialOrders,
  exportToCSV,
  downloadFile,
  generateOrderId,
} from "../../components/admin/orderManagement/sampleData1"

export const OrderManagement = () => {
  // State management
  const [orders, setOrders] = useState(initialOrders)
  const [filteredOrders, setFilteredOrders] = useState(initialOrders)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    searchTerm: "",
    userFilter: "",
    amountRangeFilter: { min: "", max: "" },
    dateRangeFilter: { start: "", end: "" },
  })

  // Selection states
  const [selectedOrders, setSelectedOrders] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Modal states
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)

  // Helper functions to get referenced data
  const getUser = (userId) => sampleUsers.find((user) => user._id === userId)
  const getPayment = (paymentId) => samplePayments.find((payment) => payment._id === paymentId)

  // Filter orders effect
  useEffect(() => {
    let result = [...orders]

    // Apply search filter
    if (filters.searchTerm) {
      result = result.filter((order) => {
        const user = getUser(order.userId)
        return (
          order._id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          (user && user.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
          (user && user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()))
        )
      })
    }

    // Apply user filter
    if (filters.userFilter) {
      result = result.filter((order) => order.userId === filters.userFilter)
    }

    // Apply amount range filter
    if (filters.amountRangeFilter.min || filters.amountRangeFilter.max) {
      result = result.filter((order) => {
        const min = filters.amountRangeFilter.min ? Number.parseFloat(filters.amountRangeFilter.min) : 0
        const max = filters.amountRangeFilter.max
          ? Number.parseFloat(filters.amountRangeFilter.max)
          : Number.POSITIVE_INFINITY
        return order.Amount >= min && order.Amount <= max
      })
    }

    // Apply date range filter
    if (filters.dateRangeFilter.start && filters.dateRangeFilter.end) {
      const startDate = new Date(filters.dateRangeFilter.start)
      const endDate = new Date(filters.dateRangeFilter.end)
      endDate.setHours(23, 59, 59, 999)

      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= startDate && orderDate <= endDate
      })
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setFilteredOrders(result)
  }, [orders, filters])

  // Event handlers
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order._id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  const handleViewOrder = (order) => {
    setCurrentOrder(order)
    setIsOrderDetailsOpen(true)
  }

  const handleUpdateOrder = (orderId) => {
    setOrders(
      orders.map((order) => (order._id === orderId ? { ...order, updatedAt: new Date().toISOString() } : order)),
    )
  }

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order._id !== orderId))
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const handleAddOrder = (newOrderData) => {
    const order = {
      ...newOrderData,
      _id: generateOrderId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setOrders([order, ...orders])
    setIsAddOrderOpen(false)
  }

  const handleRefreshOrders = () => {
    setIsLoading(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false)
      alert("Orders refreshed successfully!")
    }, 800)
  }

  const handleExportOrders = (format) => {
    setIsLoading(true)

    setTimeout(() => {
      try {
        const csvContent = exportToCSV(filteredOrders, sampleUsers, [], samplePayments)
        const timestamp = new Date().toISOString().split("T")[0]
        downloadFile(csvContent, `orders_export_${timestamp}.${format}`)
        setIsLoading(false)
      } catch (error) {
        console.error("Error exporting orders:", error)
        alert("Failed to export orders. Please try again.")
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleDeleteSelected = () => {
    if (selectedOrders.length === 0) {
      alert("Please select orders to delete.")
      return
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedOrders.length} selected orders? This action cannot be undone.`,
      )
    ) {
      setIsLoading(true)

      setTimeout(() => {
        setOrders(orders.filter((order) => !selectedOrders.includes(order._id)))
        setSelectedOrders([])
        setSelectAll(false)
        setIsLoading(false)
        alert(`${selectedOrders.length} orders deleted successfully!`)
      }, 500)
    }
  }

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      userFilter: "",
      amountRangeFilter: { min: "", max: "" },
      dateRangeFilter: { start: "", end: "" },
    })
  }

  // Utility functions
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

  const userOptions = [
    { value: "", label: "All Users" },
    ...sampleUsers.map((user) => ({
      value: user._id,
      label: user.name,
    })),
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setIsAddOrderOpen(true)} disabled={isLoading}>
                <PlusIcon className="w-5 h-5 mr-1" />
                Add New Order
              </Button>

              <div className="relative group">
                <Button variant="secondary" disabled={isLoading}>
                  <ExportIcon className="w-5 h-5 mr-1" />
                  Export
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleExportOrders("csv")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportOrders("excel")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExportOrders("pdf")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              <Button variant="secondary" onClick={handleRefreshOrders} disabled={isLoading}>
                <RefreshIcon className="w-5 h-5 mr-1" />
                {isLoading ? "Refreshing..." : "Refresh"}
              </Button>

              {selectedOrders.length > 0 && (
                <Button variant="danger" onClick={handleDeleteSelected} disabled={isLoading}>
                  <TrashIcon className="w-5 h-5 mr-1" />
                  Delete Selected ({selectedOrders.length})
                </Button>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              />
            </div>

            <Select
              value={filters.userFilter}
              onChange={(e) => setFilters({ ...filters, userFilter: e.target.value })}
              options={userOptions}
            />

            <input
              type="number"
              placeholder="Min Amount"
              value={filters.amountRangeFilter.min}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  amountRangeFilter: { ...filters.amountRangeFilter, min: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
            />

            <input
              type="number"
              placeholder="Max Amount"
              value={filters.amountRangeFilter.max}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  amountRangeFilter: { ...filters.amountRangeFilter, max: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
            />

            <input
              type="date"
              value={filters.dateRangeFilter.start}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRangeFilter: { ...filters.dateRangeFilter, start: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
            />

            <Button variant="outline" onClick={handleClearFilters} size="sm">
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Order List Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFB800] mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading...</p>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const user = getUser(order.userId)
                    const payment = getPayment(order.paymentId)
                    return (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => handleSelectOrder(order._id)}
                            className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order._id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user ? (
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">User ID: {order.userId}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${order.Amount.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.items.length} items</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment ? (
                            <div>
                              <div className="text-sm text-gray-900">{payment.method}</div>
                              <div
                                className={`text-sm ${
                                  payment.status === "completed"
                                    ? "text-green-600"
                                    : payment.status === "pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {payment.status}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">Payment ID: {order.paymentId}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewOrder(order)}
                              className="text-[#FFB800] hover:text-[#FFB800]/80"
                              title="View Details"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700"
                              title="More Actions"
                              onClick={() => alert("More actions: Edit, Duplicate, Archive")}
                            >
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isOrderDetailsOpen && currentOrder && (
        <OrderDetailsModal
          order={currentOrder}
          onClose={() => setIsOrderDetailsOpen(false)}
          onUpdate={handleUpdateOrder}
          onDelete={handleDeleteOrder}
        />
      )}

      {isAddOrderOpen && <AddOrderModal onSave={handleAddOrder} onClose={() => setIsAddOrderOpen(false)} />}
    </div>
  )
}
