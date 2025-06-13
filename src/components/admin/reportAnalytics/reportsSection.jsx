import { Download, Calendar, FileText, RefreshCw } from "lucide-react"
import { SortIcon } from "../../admin/reportAnalytics/ui/sort-icon"

export function ReportsSection({
  filteredReportsData,
  sortField,
  sortDirection,
  handleSort,
  onExport,
  onSchedule,
  onSync,
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getGrowthColor = (growth) => {
    return growth >= 0 ? "text-green-500" : "text-red-500"
  }

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? "↗" : "↘"
  }

  return (
    <div>
      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detailed Reports</h2>
          <div className="relative">
            <button
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
              onClick={onExport}
            >
              <Download className="w-4 h-4 mr-1" />
              Export Table
            </button>
          </div>
        </div>

        {/* Scrollable Table Container */}
        <div className="overflow-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    <SortIcon field="date" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("orders")}
                >
                  <div className="flex items-center">
                    Orders
                    <SortIcon field="orders" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("sales")}
                >
                  <div className="flex items-center">
                    Sales
                    <SortIcon field="sales" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    <SortIcon field="category" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("topBrand")}
                >
                  <div className="flex items-center">
                    Top Brand
                    <SortIcon field="topBrand" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("paymentMethod")}
                >
                  <div className="flex items-center">
                    Payment Method
                    <SortIcon field="paymentMethod" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("growth")}
                >
                  <div className="flex items-center">
                    Growth %
                    <SortIcon field="growth" currentField={sortField} direction={sortDirection} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReportsData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No reports found for the selected filters
                  </td>
                </tr>
              ) : (
                filteredReportsData.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(report.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(report.sales)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.topBrand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.paymentMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`flex items-center ${getGrowthColor(report.growth)}`}>
                          <span className="mr-1">{getGrowthIcon(report.growth)}</span>
                          <span>{Math.abs(report.growth)}%</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export & Download Options */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Advanced Reporting Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Schedule Reports */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Schedule Automated Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Set up recurring reports to be delivered to your email</p>
            <div className="space-y-2">
              <button
                onClick={() => onSchedule("daily")}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Daily Reports
              </button>
              <button
                onClick={() => onSchedule("weekly")}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Weekly Reports
              </button>
              <button
                onClick={() => onSchedule("monthly")}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Monthly Reports
              </button>
            </div>
          </div>

          {/* Export Formats */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Download Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Export your data in various formats</p>
            <div className="space-y-2">
              <button
                onClick={onExport}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Download as PDF
              </button>
              <button
                onClick={onExport}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Download as CSV
              </button>
              <button
                onClick={onExport}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Download as Excel
              </button>
            </div>
          </div>

          {/* External Tools Integration */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Sync with External Tools</h3>
            <p className="text-sm text-gray-600 mb-4">Connect with your accounting software</p>
            <div className="space-y-2">
              <button
                onClick={() => onSync("QuickBooks")}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Sync with QuickBooks
              </button>
              <button
                onClick={() => onSync("Zoho")}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Sync with Zoho
              </button>
              <button
                onClick={() => onSync("Xero")}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Sync with Xero
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
