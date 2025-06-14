import { Search, Calendar, X } from "lucide-react"

export const DeliveryFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  agentFilter,
  setAgentFilter,
  dateRangeFilter,
  setDateRangeFilter,
  agents,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="search"
            placeholder="Search by order ID, customer, or address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="all">All Agents</option>
          <option value="unassigned">Unassigned</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>

        <div className="relative">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            onClick={() => document.getElementById("dateRangeDropdown").classList.toggle("hidden")}
          >
            <Calendar className="h-5 w-5 mr-2" />
            {dateRangeFilter.from && dateRangeFilter.to ? (
              <span>
                {new Date(dateRangeFilter.from).toLocaleDateString()} -{" "}
                {new Date(dateRangeFilter.to).toLocaleDateString()}
              </span>
            ) : (
              <span>Select Date Range</span>
            )}
          </button>
          <div
            id="dateRangeDropdown"
            className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg hidden z-10 p-4"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={dateRangeFilter.from || ""}
                  onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, from: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={dateRangeFilter.to || ""}
                  onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, to: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    document.getElementById("dateRangeDropdown").classList.add("hidden")
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 flex items-center"
          onClick={() => {
            setSearchQuery("")
            setStatusFilter("")
            setAgentFilter("all")
            setDateRangeFilter({ from: undefined, to: undefined })
          }}
        >
          <X className="h-5 w-5 mr-2" />
          Clear Filters
        </button>
      </div>
    </div>
  )
}
