import { Search } from "lucide-react"

export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  dateRangeFilter,
  setDateRangeFilter,
  customDateRange,
  setCustomDateRange,
  paymentMethodFilter,
  setPaymentMethodFilter,
  statusFilter,
  setStatusFilter,
  paymentMethods,
  paymentStatuses,
}) {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Search */}
      <div className="md:col-span-2 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Search Type */}
      <div>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="all">All Fields</option>
          <option value="transaction">Transaction ID</option>
          <option value="order">Order ID</option>
          <option value="customer">Customer Name/Email</option>
        </select>
      </div>

      {/* Payment Method Filter */}
      <div>
        <select
          value={paymentMethodFilter}
          onChange={(e) => setPaymentMethodFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
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
  )
}
