import { useState, useEffect } from "react"
import { Badge } from "../../components/admin/PaymentManagement/ui/badge"
import { TransactionDetailsModal } from "../../components/admin/PaymentManagement/transactionDetailsModal"
import { InvoiceModal } from "../../components/admin/PaymentManagement/invoiceModal"
import { RefundModal } from "../../components/admin/PaymentManagement/refundModal"
import {
  SearchIcon,
  DownloadIcon,
  ReceiptIcon,
  RefreshIcon,
  CalendarIcon,
  ChevronDownIcon,
  EyeIcon,
  MoreHorizontalIcon,
  XIcon,
  RefundIcon,
  FileTextIcon,
} from "../../components/admin/PaymentManagement/icons"

const PaymentManagement = () => {
  // ================ SAMPLE DATA ================
  // Sample payment methods
  const paymentMethods = [
    { id: "credit-card", name: "Credit Card", types: ["Visa", "Mastercard", "American Express"] },
    { id: "paypal", name: "PayPal", types: [] },
    { id: "cash", name: "Cash on Delivery", types: [] },
    { id: "bank", name: "Bank Transfer", types: [] },
  ]

  // Sample payment statuses
  const paymentStatuses = [
    { id: "successful", name: "Successful", color: "green" },
    { id: "pending", name: "Pending", color: "yellow" },
    { id: "failed", name: "Failed", color: "red" },
    { id: "refunded", name: "Refunded", color: "blue" },
  ]

  // Sample transaction data
  const initialTransactions = [
    {
      id: "TXN001",
      orderId: "ORD123",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      paymentMethod: "Credit Card",
      paymentType: "Visa",
      amount: 250.0,
      date: "2025-03-09T14:30:00",
      status: "successful",
      items: [
        { name: "Engine Oil", quantity: 2, price: 29.99 },
        { name: "Oil Filter", quantity: 1, price: 12.99 },
        { name: "Brake Pads", quantity: 1, price: 89.99 },
        { name: "Wiper Blades", quantity: 2, price: 43.99 },
      ],
      billingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      gatewayReference: "ch_1NpQwXJHD8z5KLjZ1Qaz9Y7q",
      notes: "",
    },
    {
      id: "TXN002",
      orderId: "ORD124",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      paymentMethod: "PayPal",
      paymentType: "",
      amount: 120.5,
      date: "2025-03-08T09:15:00",
      status: "pending",
      items: [
        { name: "Spark Plugs", quantity: 4, price: 15.99 },
        { name: "Air Filter", quantity: 1, price: 24.99 },
        { name: "Coolant", quantity: 1, price: 19.99 },
      ],
      billingAddress: {
        street: "456 Oak Ave",
        city: "Boston",
        state: "MA",
        zip: "02108",
        country: "USA",
      },
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Boston",
        state: "MA",
        zip: "02108",
        country: "USA",
      },
      gatewayReference: "PAY-1AB23456CD789012E",
      notes: "Customer requested express shipping",
    },
    {
      id: "TXN003",
      orderId: "ORD125",
      customerName: "Alex Brown",
      customerEmail: "alex.brown@example.com",
      paymentMethod: "Cash on Delivery",
      paymentType: "",
      amount: 75.0,
      date: "2025-03-07T16:45:00",
      status: "failed",
      items: [
        { name: "Headlight Bulbs", quantity: 2, price: 22.5 },
        { name: "Windshield Washer Fluid", quantity: 1, price: 8.99 },
        { name: "Car Wax", quantity: 1, price: 19.99 },
      ],
      billingAddress: {
        street: "789 Pine Blvd",
        city: "Chicago",
        state: "IL",
        zip: "60007",
        country: "USA",
      },
      shippingAddress: {
        street: "789 Pine Blvd",
        city: "Chicago",
        state: "IL",
        zip: "60007",
        country: "USA",
      },
      gatewayReference: "",
      notes: "Customer not available at delivery time",
    },
    {
      id: "TXN004",
      orderId: "ORD126",
      customerName: "Emily Johnson",
      customerEmail: "emily.johnson@example.com",
      paymentMethod: "Credit Card",
      paymentType: "Mastercard",
      amount: 349.95,
      date: "2025-03-06T11:20:00",
      status: "refunded",
      items: [
        { name: "Car Battery", quantity: 1, price: 129.99 },
        { name: "Jump Starter", quantity: 1, price: 89.99 },
        { name: "Battery Charger", quantity: 1, price: 49.99 },
        { name: "Battery Terminal Cleaner", quantity: 1, price: 7.99 },
        { name: "Battery Cables", quantity: 1, price: 19.99 },
      ],
      billingAddress: {
        street: "101 Maple Dr",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "USA",
      },
      shippingAddress: {
        street: "101 Maple Dr",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "USA",
      },
      gatewayReference: "ch_2NpQwXJHD8z5KLjZ2Qaz9Y7q",
      notes: "Customer received defective battery",
    },
    {
      id: "TXN005",
      orderId: "ORD127",
      customerName: "Michael Wilson",
      customerEmail: "michael.wilson@example.com",
      paymentMethod: "Bank Transfer",
      paymentType: "",
      amount: 189.75,
      date: "2025-03-05T15:10:00",
      status: "successful",
      items: [
        { name: "Tire Pressure Gauge", quantity: 1, price: 12.99 },
        { name: "Floor Mats", quantity: 1, price: 59.99 },
        { name: "Car Cover", quantity: 1, price: 89.99 },
        { name: "Steering Wheel Cover", quantity: 1, price: 24.99 },
      ],
      billingAddress: {
        street: "222 Cedar St",
        city: "Miami",
        state: "FL",
        zip: "33101",
        country: "USA",
      },
      shippingAddress: {
        street: "222 Cedar St",
        city: "Miami",
        state: "FL",
        zip: "33101",
        country: "USA",
      },
      gatewayReference: "TRF-987654321",
      notes: "",
    },
    {
      id: "TXN006",
      orderId: "ORD128",
      customerName: "Sarah Martinez",
      customerEmail: "sarah.martinez@example.com",
      paymentMethod: "Credit Card",
      paymentType: "American Express",
      amount: 425.5,
      date: "2025-03-04T10:05:00",
      status: "successful",
      items: [
        { name: "Car Stereo", quantity: 1, price: 299.99 },
        { name: "Speaker Set", quantity: 1, price: 89.99 },
        { name: "Installation Kit", quantity: 1, price: 35.99 },
      ],
      billingAddress: {
        street: "333 Birch Ave",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "USA",
      },
      shippingAddress: {
        street: "333 Birch Ave",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "USA",
      },
      gatewayReference: "ch_3NpQwXJHD8z5KLjZ3Qaz9Y7q",
      notes: "",
    },
    {
      id: "TXN007",
      orderId: "ORD129",
      customerName: "David Lee",
      customerEmail: "david.lee@example.com",
      paymentMethod: "PayPal",
      paymentType: "",
      amount: 59.99,
      date: "2025-03-03T13:40:00",
      status: "successful",
      items: [
        { name: "Car Phone Mount", quantity: 1, price: 24.99 },
        { name: "USB Car Charger", quantity: 1, price: 14.99 },
        { name: "Charging Cable", quantity: 1, price: 9.99 },
        { name: "Car Air Freshener", quantity: 2, price: 4.99 },
      ],
      billingAddress: {
        street: "444 Elm Ct",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
      },
      shippingAddress: {
        street: "444 Elm Ct",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
      },
      gatewayReference: "PAY-2AB23456CD789012F",
      notes: "",
    },
    {
      id: "TXN008",
      orderId: "ORD130",
      customerName: "Jennifer Garcia",
      customerEmail: "jennifer.garcia@example.com",
      paymentMethod: "Cash on Delivery",
      paymentType: "",
      amount: 149.95,
      date: "2025-03-02T17:25:00",
      status: "pending",
      items: [
        { name: "Dash Cam", quantity: 1, price: 99.99 },
        { name: "SD Card", quantity: 1, price: 19.99 },
        { name: "Dash Cam Mount", quantity: 1, price: 14.99 },
        { name: "Power Adapter", quantity: 1, price: 12.99 },
      ],
      billingAddress: {
        street: "555 Spruce Rd",
        city: "San Francisco",
        state: "CA",
        zip: "94101",
        country: "USA",
      },
      shippingAddress: {
        street: "555 Spruce Rd",
        city: "San Francisco",
        state: "CA",
        zip: "94101",
        country: "USA",
      },
      gatewayReference: "",
      notes: "Delivery scheduled for next week",
    },
  ]

  // ================ STATE MANAGEMENT ================
  // Primary state for transaction data
  const [transactions, setTransactions] = useState(initialTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all") // all, transaction, order, customer
  const [dateRangeFilter, setDateRangeFilter] = useState("all") // all, 7days, 30days, custom
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Selection states
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Modal states
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const [refundAmount, setRefundAmount] = useState(0)
  const [refundReason, setRefundReason] = useState("")

  // ================ EFFECTS ================
  // Filter transactions based on search and filters
  useEffect(() => {
    let result = [...transactions]

    // Apply search filter
    if (searchTerm) {
      result = result.filter((transaction) => {
        if (searchType === "all") {
          return (
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
          )
        } else if (searchType === "transaction") {
          return transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
        } else if (searchType === "order") {
          return transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase())
        } else if (searchType === "customer") {
          return (
            transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        return true
      })
    }

    // Apply date range filter
    if (dateRangeFilter !== "all") {
      const now = new Date()
      let startDate

      if (dateRangeFilter === "7days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
      } else if (dateRangeFilter === "30days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
      } else if (dateRangeFilter === "custom" && customDateRange.start && customDateRange.end) {
        startDate = new Date(customDateRange.start)
        const endDate = new Date(customDateRange.end)
        endDate.setHours(23, 59, 59, 999) // Set to end of day

        result = result.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate >= startDate && transactionDate <= endDate
        })
      }

      if (dateRangeFilter !== "custom") {
        result = result.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate >= startDate
        })
      }
    }

    // Apply payment method filter
    if (paymentMethodFilter) {
      result = result.filter((transaction) => transaction.paymentMethod === paymentMethodFilter)
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((transaction) => transaction.status === statusFilter)
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setFilteredTransactions(result)
  }, [transactions, searchTerm, searchType, dateRangeFilter, customDateRange, paymentMethodFilter, statusFilter])

  // ================ EVENT HANDLERS ================
  /**
   * Handles selecting all transactions
   * Toggles between selecting all filtered transactions and deselecting all
   */
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(filteredTransactions.map((transaction) => transaction.id))
    }
    setSelectAll(!selectAll)
  }

  /**
   * Handles selecting individual transaction
   */
  const handleSelectTransaction = (id) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter((transactionId) => transactionId !== id))
    } else {
      setSelectedTransactions([...selectedTransactions, id])
    }
  }

  /**
   * Opens transaction details modal for a specific transaction
   */
  const handleViewTransaction = (transaction) => {
    setCurrentTransaction(transaction)
    setIsTransactionModalOpen(true)
  }

  /**
   * Opens invoice modal for a specific transaction
   */
  const handleViewInvoice = (transaction) => {
    setCurrentTransaction(transaction)
    setIsInvoiceModalOpen(true)
  }

  /**
   * Opens refund modal for a specific transaction
   */
  const handleRefundTransaction = (transaction) => {
    setCurrentTransaction(transaction)
    setRefundAmount(transaction.amount)
    setIsRefundModalOpen(true)
  }

  /**
   * Processes a refund for a transaction
   */
  const processRefund = (transactionId, amount, reason) => {
    // In a real application, this would call an API to process the refund
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === transactionId) {
        return {
          ...transaction,
          status: "refunded",
          notes: transaction.notes
            ? `${transaction.notes}; Refunded: $${amount} - ${reason}`
            : `Refunded: $${amount} - ${reason}`,
        }
      }
      return transaction
    })

    setTransactions(updatedTransactions)
    setIsRefundModalOpen(false)
    alert(`Refund of $${amount} processed successfully for transaction ${transactionId}`)
  }

  /**
   * Retries a failed payment
   */
  const handleRetryPayment = (transactionId) => {
    // In a real application, this would call an API to retry the payment
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === transactionId) {
        return {
          ...transaction,
          status: "pending",
          notes: transaction.notes ? `${transaction.notes}; Payment retry initiated` : "Payment retry initiated",
        }
      }
      return transaction
    })

    setTransactions(updatedTransactions)
    alert(`Payment retry initiated for transaction ${transactionId}`)
  }

  /**
   * Cancels a pending payment
   */
  const handleCancelPayment = (transactionId) => {
    // In a real application, this would call an API to cancel the payment
    if (window.confirm("Are you sure you want to cancel this payment?")) {
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id === transactionId) {
          return {
            ...transaction,
            status: "failed",
            notes: transaction.notes
              ? `${transaction.notes}; Payment cancelled by admin`
              : "Payment cancelled by admin",
          }
        }
        return transaction
      })

      setTransactions(updatedTransactions)
      alert(`Payment cancelled for transaction ${transactionId}`)
    }
  }

  /**
   * Exports transactions in the specified format
   */
  const handleExportTransactions = (format) => {
    // In a real application, this would generate and download the file
    alert(`Exporting transactions as ${format.toUpperCase()}`)
  }

  /**
   * Refreshes payment statuses from payment gateway
   */
  const handleRefreshPayments = () => {
    // In a real application, this would call an API to refresh payment statuses
    alert("Refreshing payment statuses from payment gateway...")
    // Simulate a status update for a pending payment
    setTimeout(() => {
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id === "TXN002") {
          return {
            ...transaction,
            status: "successful",
            notes: transaction.notes
              ? `${transaction.notes}; Payment confirmed by gateway`
              : "Payment confirmed by gateway",
          }
        }
        return transaction
      })

      setTransactions(updatedTransactions)
      alert("Payment statuses refreshed successfully")
    }, 1500)
  }

  // ================ UTILITY FUNCTIONS ================
  /**
   * Formats date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"

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
   * Formats currency for display
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  /**
   * Returns appropriate badge component for transaction status
   */
  const getStatusBadge = (status) => {
    const statusObj = paymentStatuses.find((s) => s.id === status)
    if (statusObj) {
      return <Badge color={statusObj.color}>{statusObj.name}</Badge>
    }
    return <Badge color="gray">{status}</Badge>
  }

  /**
   * Generates a unique invoice number
   */
  const generateInvoiceNumber = (transactionId) => {
    return `INV-${transactionId.replace("TXN", "")}-${new Date().getFullYear()}`
  }

  // ================ RENDER FUNCTION ================
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Actions & Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Payment & Transaction Management</h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => document.getElementById("exportDropdown")?.classList.toggle("hidden")}
                >
                  <DownloadIcon className="w-5 h-5 mr-1" />
                  Export Transaction Data
                </button>
                <div
                  id="exportDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleExportTransactions("csv")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportTransactions("excel")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExportTransactions("pdf")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedTransactions.length === 1) {
                    const transaction = transactions.find((t) => t.id === selectedTransactions[0])
                    if (transaction) handleViewInvoice(transaction)
                  } else {
                    alert("Please select a single transaction to generate an invoice")
                  }
                }}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ReceiptIcon className="w-5 h-5 mr-1" />
                Generate Invoice
              </button>

              <button
                onClick={handleRefreshPayments}
                className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
              >
                <RefreshIcon className="w-5 h-5 mr-1" />
                Refresh Payments
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              />
            </div>

            {/* Search Type */}
            <div>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="all">All Fields</option>
                <option value="transaction">Transaction ID</option>
                <option value="order">Order ID</option>
                <option value="customer">Customer Name/Email</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                onClick={() => document.getElementById("dateRangeDropdown")?.classList.toggle("hidden")}
              >
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  {dateRangeFilter === "all" && <span className="text-gray-500">All Dates</span>}
                  {dateRangeFilter === "7days" && <span>Last 7 Days</span>}
                  {dateRangeFilter === "30days" && <span>Last 30 Days</span>}
                  {dateRangeFilter === "custom" && customDateRange.start && customDateRange.end && (
                    <span>
                      {new Date(customDateRange.start).toLocaleDateString()} -{" "}
                      {new Date(customDateRange.end).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </button>
              <div
                id="dateRangeDropdown"
                className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg hidden z-10 p-4"
              >
                <div className="grid gap-2">
                  <button
                    onClick={() => {
                      setDateRangeFilter("all")
                      document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                    }}
                    className={`text-left px-3 py-2 rounded-md ${dateRangeFilter === "all" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    All Dates
                  </button>
                  <button
                    onClick={() => {
                      setDateRangeFilter("7days")
                      document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                    }}
                    className={`text-left px-3 py-2 rounded-md ${dateRangeFilter === "7days" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => {
                      setDateRangeFilter("30days")
                      document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                    }}
                    className={`text-left px-3 py-2 rounded-md ${dateRangeFilter === "30days" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Last 30 Days
                  </button>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <p className="text-sm font-medium mb-2">Custom Range</p>
                    <div className="grid gap-2">
                      <div className="grid gap-1">
                        <label className="block text-xs text-gray-700">Start Date</label>
                        <input
                          type="date"
                          value={customDateRange.start}
                          onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                      <div className="grid gap-1">
                        <label className="block text-xs text-gray-700">End Date</label>
                        <input
                          type="date"
                          value={customDateRange.end}
                          onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => {
                        setCustomDateRange({ start: "", end: "" })
                        setDateRangeFilter("all")
                        document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        if (customDateRange.start && customDateRange.end) {
                          setDateRangeFilter("custom")
                        }
                        document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                      }}
                      className="px-3 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Filter */}
            <div>
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Payment Methods</option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.name}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Statuses</option>
                {paymentStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
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
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedTransactions.includes(transaction.id)}
                          onChange={() => handleSelectTransaction(transaction.id)}
                          className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.customerName}</div>
                        <div className="text-xs text-gray-500">{transaction.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.paymentMethod}</div>
                        {transaction.paymentType && (
                          <div className="text-xs text-gray-500">{transaction.paymentType}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(transaction.date).split(",")[0]}</div>
                        <div className="text-xs text-gray-500">{formatDate(transaction.date).split(",")[1]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(transaction.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewTransaction(transaction)}
                            className="text-[#FFB800] hover:text-[#FFB800]/80 mr-3"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() =>
                                document.getElementById(`actionDropdown-${transaction.id}`)?.classList.toggle("hidden")
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </button>
                            <div
                              id={`actionDropdown-${transaction.id}`}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleViewTransaction(transaction)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeIcon className="w-4 h-4 inline mr-2" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleViewInvoice(transaction)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <ReceiptIcon className="w-4 h-4 inline mr-2" />
                                  View Invoice
                                </button>

                                {transaction.status === "successful" && (
                                  <button
                                    onClick={() => handleRefundTransaction(transaction)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <RefundIcon className="w-4 h-4 inline mr-2" />
                                    Process Refund
                                  </button>
                                )}

                                {transaction.status === "failed" && (
                                  <button
                                    onClick={() => handleRetryPayment(transaction.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <RefreshIcon className="w-4 h-4 inline mr-2" />
                                    Retry Payment
                                  </button>
                                )}

                                {transaction.status === "pending" && (
                                  <button
                                    onClick={() => handleCancelPayment(transaction.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  >
                                    <XIcon className="w-4 h-4 inline mr-2" />
                                    Cancel Payment
                                  </button>
                                )}
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

      {/* Transaction Details Modal */}
      {isTransactionModalOpen && currentTransaction && (
        <TransactionDetailsModal
          transaction={currentTransaction}
          onClose={() => setIsTransactionModalOpen(false)}
          onViewInvoice={() => {
            setIsTransactionModalOpen(false)
            handleViewInvoice(currentTransaction)
          }}
          onRefund={() => {
            setIsTransactionModalOpen(false)
            handleRefundTransaction(currentTransaction)
          }}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          getStatusBadge={getStatusBadge}
        />
      )}

      {/* Invoice Modal */}
      {isInvoiceModalOpen && currentTransaction && (
        <InvoiceModal
          transaction={currentTransaction}
          onClose={() => setIsInvoiceModalOpen(false)}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          generateInvoiceNumber={generateInvoiceNumber}
        />
      )}

      {/* Refund Modal */}
      {isRefundModalOpen && currentTransaction && (
        <RefundModal
          transaction={currentTransaction}
          refundAmount={refundAmount}
          setRefundAmount={setRefundAmount}
          refundReason={refundReason}
          setRefundReason={setRefundReason}
          onClose={() => setIsRefundModalOpen(false)}
          onRefund={() => processRefund(currentTransaction.id, refundAmount, refundReason)}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  )
}

export default PaymentManagement
