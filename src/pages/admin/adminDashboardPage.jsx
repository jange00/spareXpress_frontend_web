import { useState } from "react"
import { Button } from "../../components/admin/ui/button.jsx"
import MetricsOverview from "../../components/admin/adminDashboard/metricsOverview.jsx"
import SalesRevenueChart from "../../components/admin/adminDashboard/salesRevenueChart.jsx"
import BestSellingCategories from "../../components/admin/adminDashboard/bestSellingCategories.jsx"
import OrderStatistics from "../../components/admin/adminDashboard/orderStatistics.jsx"
import BestSellingProducts from "../../components/admin/adminDashboard/bestSellingProducts.jsx"
import LowStockAlerts from "../../components/admin/adminDashboard/lowStockAlerts.jsx"
import RestockModal from "../../components/admin/adminDashboard/restockModal.jsx"
import { products } from "../../components/admin/adminDashboard/dashboardData.jsx"

import { Package, ShoppingCart, Users, DollarSign, AlertTriangle } from "lucide-react"

import { useGetAllProduct } from "../../hook/admin/useProduct/useGetAllProduct.js"
import { useGetAllOrder } from "../../hook/admin/useOrder/useGetAllOrder.js"
import { useGetAllAdminUsers } from "../../hook/admin/useUsers/useGetAllAdminUsers.js"

const AdminDashboard = () => {

  
  const [timeRange, setTimeRange] = useState("weekly")
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false)
  const [productToRestock, setProductToRestock] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [restockQuantity, setRestockQuantity] = useState("")

  const { data: allProducts = [] } = useGetAllProduct()
  const { data: allOrders = [] } = useGetAllOrder()
  const { data: allUsers = [] } = useGetAllAdminUsers()

  const metrics = [
    {
      id: "products",
      label: "Total Products",
      icon: Package,
      value: allProducts.length.toLocaleString(),
    },
    {
      id: "orders",
      label: "Total Orders",
      icon: ShoppingCart,
      value: allOrders.length.toLocaleString(),
    },
    {
      id: "customers",
      label: "Total Customers",
      icon: Users,
      value: allUsers.length.toLocaleString(),
    },
    {
      id: "revenue",
      label: "Total Revenue",
      icon: DollarSign,
      value: "$42,450",
    },
    {
      id: "lowstock",
      label: "Low Stock Alerts",
      icon: AlertTriangle,
      value: "8 Products",
    },
  ]




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
    <div className="min-h-screen bg-gray-50">
     {/* Dashboard Header */}
<div className="bg-white p-6 rounded-lg shadow-sm border mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
  <div>
    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
    <p className="text-sm text-gray-600">
      View and analyze your weekly or monthly data
    </p>
  </div>

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
