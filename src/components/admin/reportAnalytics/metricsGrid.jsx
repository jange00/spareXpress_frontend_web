import { BarChart3, ShoppingCart, DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react"

export function MetricsGrid({ metrics }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getGrowthColor = (growth) => {
    return growth >= 0 ? "text-green-500" : "text-red-500"
  }

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Sales */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold">{formatCurrency(metrics.totalSales)}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <span className={`flex items-center ${getGrowthColor(metrics.salesGrowth)}`}>
            {getGrowthIcon(metrics.salesGrowth)}
            <span className="ml-1">{Math.abs(metrics.salesGrowth)}%</span>
          </span>
          <span className="text-xs text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{metrics.totalOrders}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <ShoppingCart className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <span className={`flex items-center ${getGrowthColor(metrics.ordersGrowth)}`}>
            {getGrowthIcon(metrics.ordersGrowth)}
            <span className="ml-1">{Math.abs(metrics.ordersGrowth)}%</span>
          </span>
          <span className="text-xs text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</p>
          </div>
          <div className="p-3 bg-[#FFB800]/20 rounded-full">
            <DollarSign className="w-6 h-6 text-[#FFB800]" />
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <span className={`flex items-center ${getGrowthColor(metrics.revenueGrowth)}`}>
            {getGrowthIcon(metrics.revenueGrowth)}
            <span className="ml-1">{Math.abs(metrics.revenueGrowth)}%</span>
          </span>
          <span className="text-xs text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      {/* Total Customers */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-2xl font-bold">{metrics.totalCustomers}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <span className={`flex items-center ${getGrowthColor(metrics.customersGrowth)}`}>
            {getGrowthIcon(metrics.customersGrowth)}
            <span className="ml-1">{Math.abs(metrics.customersGrowth)}%</span>
          </span>
          <span className="text-xs text-gray-500 ml-2">from last month</span>
        </div>
      </div>
    </div>
  )
}
