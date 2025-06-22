import { useState, useEffect } from "react"
import { sampleTransactions, paymentMethods, paymentStatuses } from "../../components/admin/PaymentManagement/mockdata/mockData"
import TransactionTable from "../../components/admin/PaymentManagement/TransactionTable"
import SearchAndFilters from "../../components/admin/UIs/paymentUi/SearchAndFilters"
import ActionButtons from "../../components/admin/UIs/paymentUi/ActionButtons"
import TransactionDetailsModal from "../../components/admin/PaymentManagement/modals/TransactionDetailsModal"
import InvoiceModal from "../../components/admin/PaymentManagement/modals/InvoiceModal"
import RefundModal from "../../components/admin/PaymentManagement/modals/RefundModal"
import PaymentFormModal from "../../components/admin/PaymentManagement/modals/PaymentFormModal"
import { filterTransactions } from "../../components/admin/utils/payment/filterUtils"

// API mutation hook
import { useGetAllPayment } from "../../hook/admin/usePayment/useGetAllPayment"
import { useGetAllShippingAddress } from "../../hook/admin/useShippingAddress/useGetAllShippingAddress"

export default function PaymentManagement() {

  const { data: transaction = [] } = useGetAllPayment()
  console.log(transaction)
  const { data: shippingAddresses = [] } = useGetAllShippingAddress();
  console.log(shippingAddresses)

  // State management
  const [transactions, setTransactions] = useState(transaction)
  const [filteredTransactions, setFilteredTransactions] = useState(transaction)
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState("all")
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Modal states
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [isPaymentFormModalOpen, setIsPaymentFormModalOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState(null)

  // Filter transactions using utility function
  useEffect(() => {
    const filters = {
      searchTerm,
      searchType,
      dateRangeFilter,
      customDateRange,
      paymentMethodFilter,
      statusFilter,
    }

    const result = filterTransactions(transactions, filters)
    setFilteredTransactions(result)
  }, [transactions, searchTerm, searchType, dateRangeFilter, customDateRange, paymentMethodFilter, statusFilter])

  // Event handlers
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(filteredTransactions.map((transaction) => transaction.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectTransaction = (id) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter((transactionId) => transactionId !== id))
    } else {
      setSelectedTransactions([...selectedTransactions, id])
    }
  }

  const handleViewTransaction = (transaction) => {
    setCurrentTransaction(transaction)
    setIsTransactionModalOpen(true)
  }

  const handleViewInvoice = (transaction) => {
    setCurrentTransaction(transaction)
    setIsInvoiceModalOpen(true)
  }

  const handleRefundTransaction = (transaction) => {
    setCurrentTransaction(transaction)
    setIsRefundModalOpen(true)
  }

  const handleCreatePayment = () => {
    setCurrentTransaction(null)
    setIsPaymentFormModalOpen(true)
  }

  const processRefund = (transactionId, amount, reason) => {
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

  const handleRetryPayment = (transactionId) => {
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

  const handleCancelPayment = (transactionId) => {
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

  const handleExportTransactions = (format) => {
    alert(`Exporting transactions as ${format.toUpperCase()}`)
  }

  const handleRefreshPayments = () => {
    alert("Refreshing payment statuses from payment gateway...")
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

  const handleCreateNewPayment = (paymentData) => {
    // Generate new transaction ID
    const newId = `TXN${String(transactions.length + 1).padStart(3, "0")}`

    const newTransaction = {
      id: newId,
      orderId: paymentData.orderId,
      fullname: "fullname", // This would come from user lookup
      email: "email", // This would come from user lookup
      paymentMethod: paymentData.paymentMethod,
      paymentType: "",
      amount: paymentData.amount,
      date: new Date().toISOString(),
      status: paymentData.paymentStatus.toLowerCase(),
      items: [], // This would be populated from order data
      shippingAddress: {
        street: "123 Default St",
        city: "Default City",
        state: "DC",
        zip: "12345",
        country: "USA",
      },
      notes: "",
    }

    setTransactions([newTransaction, ...transactions])
    setIsPaymentFormModalOpen(false)
    alert("Payment created successfully!")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Payment & Transaction Management</h1>

            <ActionButtons
              selectedTransactions={selectedTransactions}
              transactions={transactions}
              onExport={handleExportTransactions}
              onRefresh={handleRefreshPayments}
              onViewInvoice={handleViewInvoice}
              onCreatePayment={handleCreatePayment}
            />
          </div>

          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchType={searchType}
            setSearchType={setSearchType}
            dateRangeFilter={dateRangeFilter}
            setDateRangeFilter={setDateRangeFilter}
            customDateRange={customDateRange}
            setCustomDateRange={setCustomDateRange}
            paymentMethodFilter={paymentMethodFilter}
            setPaymentMethodFilter={setPaymentMethodFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            paymentMethods={paymentMethods}
            paymentStatuses={paymentStatuses}
          />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <TransactionTable
          transactions={filteredTransactions}
          selectedTransactions={selectedTransactions}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSelectTransaction={handleSelectTransaction}
          onViewTransaction={handleViewTransaction}
          onViewInvoice={handleViewInvoice}
          onRefundTransaction={handleRefundTransaction}
          onRetryPayment={handleRetryPayment}
          onCancelPayment={handleCancelPayment}
        />
      </div>

      {/* Modals */}
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
        />
      )}

      {isInvoiceModalOpen && currentTransaction && (
        <InvoiceModal transaction={currentTransaction} onClose={() => setIsInvoiceModalOpen(false)} />
      )}

      {isRefundModalOpen && currentTransaction && (
        <RefundModal
          transaction={currentTransaction}
          onClose={() => setIsRefundModalOpen(false)}
          onRefund={processRefund}
        />
      )}

      {isPaymentFormModalOpen && (
        <PaymentFormModal onClose={() => setIsPaymentFormModalOpen(false)} onSubmit={handleCreateNewPayment} />
      )}
    </div>
  )
}
