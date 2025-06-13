import { Search, Calendar, ChevronDown, Download, Printer, RefreshCw } from "lucide-react"

export function TopSection({
  onExport,
  onDownloadPDF,
  onRefreshData,
  dateRangeFilter,
  setDateRangeFilter,
  customDateRange,
  setCustomDateRange,
  categoryFilter,
  setCategoryFilter,
  paymentMethodFilter,
  setPaymentMethodFilter,
  locationFilter,
  setLocationFilter,
  searchQuery,
  setSearchQuery,
  categories,
  paymentMethods,
  locations,
}) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Reporting & Analytics Dashboard</h1>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              onClick={onExport}
            >
              <Download className="w-5 h-5 mr-1" />
              Export Report
            </button>

            <button
              onClick={onDownloadPDF}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Printer className="w-5 h-5 mr-1" />
              Download as PDF
            </button>

            <button
              onClick={onRefreshData}
              className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-1" />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, category, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Date Range Filter */}
          <div className="relative">
            <button
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              onClick={() => document.getElementById("dateRangeDropdown")?.classList.toggle("hidden")}
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                {dateRangeFilter === "today" && <span>Today</span>}
                {dateRangeFilter === "7days" && <span>Last 7 Days</span>}
                {dateRangeFilter === "30days" && <span>Last 30 Days</span>}
                {dateRangeFilter === "custom" && customDateRange.start && customDateRange.end && (
                  <span>
                    {new Date(customDateRange.start).toLocaleDateString()} -{" "}
                    {new Date(customDateRange.end).toLocaleDateString()}
                  </span>
                )}
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            <div
              id="dateRangeDropdown"
              className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg hidden z-10 p-4"
            >
              <div className="grid gap-2">
                <button
                  onClick={() => {
                    setDateRangeFilter("today")
                    document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                  }}
                  className={`text-left px-3 py-2 rounded-md ${dateRangeFilter === "today" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                >
                  Today
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
                      setDateRangeFilter("30days")
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

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
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
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}, {location.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
