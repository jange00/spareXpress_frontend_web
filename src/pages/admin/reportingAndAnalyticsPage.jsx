import { useState } from "react"
import { TopSection } from "../../components/admin/reportAnalytics/topSection"
import { MetricsGrid } from "../../components/admin/reportAnalytics/metricsGrid"
import { ChartsSection } from "../../components/admin/reportAnalytics/chartsSection"
import { CustomerAnalysis } from "../../components/admin/reportAnalytics/customerAnalysis"
import { ReportsSection } from "../../components/admin/reportAnalytics/reportsSection"
import { ExportModal } from "../../components/admin/reportAnalytics/exportModal"
import { ScheduleModal } from "../../components/admin/reportAnalytics/scheduleModal"
import { SyncModal } from "../../components/admin/reportAnalytics/syncModal"
import { sampleData } from "../../components/admin/reportAnalytics/sampleData"
import { useFilters } from "../../hook/useFilters"
import { useMetrics } from "../../hook/useMetrics"

export default function ReportingDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState("overview")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false)

  // Custom hooks for filters and metrics
  const {
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
    filteredSalesData,
    filteredReportsData,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    handleSort,
  } = useFilters(sampleData)

  const { metrics } = useMetrics(filteredSalesData)

  // Event handlers
  const handleExportReports = (format) => {
    alert(`Exporting reports as ${format.toUpperCase()}`)
    setIsExportModalOpen(false)
  }

  const handleDownloadPDF = () => {
    alert("Downloading dashboard as PDF")
  }

  const handleRefreshData = () => {
    alert("Refreshing dashboard data...")
    setTimeout(() => {
      alert("Dashboard data refreshed successfully")
    }, 1000)
  }

  const handleScheduleReports = (frequency) => {
    alert(`Scheduled ${frequency} reports successfully`)
    setIsScheduleModalOpen(false)
  }

  const handleSyncWithTool = (tool) => {
    alert(`Syncing with ${tool}...`)
    setTimeout(() => {
      alert(`Sync with ${tool} completed successfully`)
      setIsSyncModalOpen(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopSection
        onExport={() => setIsExportModalOpen(true)}
        onDownloadPDF={handleDownloadPDF}
        onRefreshData={handleRefreshData}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        customDateRange={customDateRange}
        setCustomDateRange={setCustomDateRange}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        paymentMethodFilter={paymentMethodFilter}
        setPaymentMethodFilter={setPaymentMethodFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={sampleData.categories}
        paymentMethods={sampleData.paymentMethods}
        locations={sampleData.locations}
      />

      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-b-2 border-[#FFB800] text-[#FFB800]"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "customers"
                    ? "border-b-2 border-[#FFB800] text-[#FFB800]"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Customer Analysis
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "reports"
                    ? "border-b-2 border-[#FFB800] text-[#FFB800]"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reports
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <MetricsGrid metrics={metrics} />
            <ChartsSection
              filteredSalesData={filteredSalesData}
              paymentMethodData={sampleData.paymentMethodData}
              topCategoriesData={sampleData.topCategoriesData}
            />
          </div>
        )}

        {activeTab === "customers" && (
          <CustomerAnalysis
            metrics={metrics}
            customerTypeData={sampleData.customerTypeData}
            customerAcquisitionData={sampleData.customerAcquisitionData}
            customerLTVData={sampleData.customerLTVData}
            customerRetentionData={sampleData.customerRetentionData}
          />
        )}

        {activeTab === "reports" && (
          <ReportsSection
            filteredReportsData={filteredReportsData}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            onExport={() => setIsExportModalOpen(true)}
            onSchedule={handleScheduleReports}
            onSync={handleSyncWithTool}
          />
        )}
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExportReports}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleReports}
      />

      <SyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onSync={handleSyncWithTool} />
    </div>
  )
}
