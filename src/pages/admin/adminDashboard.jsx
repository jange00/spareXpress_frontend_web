import { useState } from "react"
import { Button } from "../../components/admin/ui/button.jsx"
import MetricsOverview from "../../components/admin/adminDashboard/metricsOverview.jsx"
import SalesRevenueChart from "../../components/admin/adminDashboard/salesRevenueChart.jsx"
import BestSellingCategories from "../../components/admin/adminDashboard/bestSellingCategories.jsx"
import OrderStatistics from "../../components/admin/adminDashboard/orderStatistics.jsx"
import BestSellingProducts from "../../components/admin/adminDashboard/bestSellingProducts.jsx"
import LowStockAlerts from "../../components/admin/adminDashboard/lowStockAlerts.jsx"
import RestockModal from "../../components/admin/adminDashboard/restockModal.jsx"
import { metrics, products } from "../../components/admin/adminDashboard/dashboardData.jsx"

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("weekly")
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false)
  const [productToRestock, setProductToRestock] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [restockQuantity, setRestockQuantity] = useState("")

  const handleRestock = (product) => {
    setProductToRestock(product)
    setRestockQuantity(product.stock)
    setIsRestockModalOpen(true)
  }

  const closeModal = () => {
    setIsRestockModalOpen(false)
    setProductToRestock(null)
    setErrorMessage("")
  }

  const handleConfirmRestock = () => {
    if (restockQuantity && Number.parseInt(restockQuantity) > 0) {
      alert(`Restocking ${restockQuantity} units of ${productToRestock.name}.`)
      closeModal()
    } else {
      setErrorMessage("Please enter a valid quantity.")
    }
  }

  const handleViewDetails = (status) => {
    alert(`Viewing details for orders with status: ${status}`)
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 mt-10">
      {/* Dashboard Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button
            onClick={() => setTimeRange("weekly")}
            variant={timeRange === "weekly" ? "default" : "outline"}
            className={timeRange === "weekly" ? "bg-[#FFB800] text-black hover:bg-[#e6a700]" : ""}
          >
            Weekly
          </Button>
          <Button
            onClick={() => setTimeRange("monthly")}
            variant={timeRange === "monthly" ? "default" : "outline"}
            className={timeRange === "monthly" ? "bg-[#FFB800] text-black hover:bg-[#e6a700]" : ""}
          >
            Monthly
          </Button>
        </div>
      </div>

      {/* Overview Cards (KPIs) */}
      <MetricsOverview metrics={metrics} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SalesRevenueChart timeRange={timeRange} />
        <BestSellingCategories />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <OrderStatistics onViewDetails={handleViewDetails} />
        <BestSellingProducts />
        <LowStockAlerts products={products} onRestock={handleRestock} />
      </div>

      {/* Restock Modal */}
      {isRestockModalOpen && productToRestock && (
        <RestockModal
          product={productToRestock}
          onClose={closeModal}
          onConfirm={handleConfirmRestock}
          errorMessage={errorMessage}
          restockQuantity={restockQuantity}
          onQuantityChange={setRestockQuantity}
        />
      )}
    </div>
  )
}

export default AdminDashboard
