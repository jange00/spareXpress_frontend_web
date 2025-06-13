import { useState, useEffect } from "react"

export function useMetrics(filteredSalesData) {
  const [metrics, setMetrics] = useState({
    totalSales: 25000,
    totalOrders: 450,
    pendingOrders: 30,
    totalRevenue: 100000,
    totalCustomers: 1200,
    newCustomers: 420,
    returningCustomers: 780,
    salesGrowth: 10,
    ordersGrowth: 8,
    revenueGrowth: 12,
    customersGrowth: 5,
  })

  useEffect(() => {
    if (filteredSalesData.length > 0) {
      const totalSales = filteredSalesData.reduce((sum, item) => sum + item.sales, 0)
      const totalOrders = filteredSalesData.reduce((sum, item) => sum + item.orders, 0)
      const totalRevenue = filteredSalesData.reduce((sum, item) => sum + item.revenue, 0)

      // Calculate growth by comparing with previous period
      const midPoint = Math.floor(filteredSalesData.length / 2)
      const recentData = filteredSalesData.slice(midPoint)
      const previousData = filteredSalesData.slice(0, midPoint)

      const recentSales = recentData.reduce((sum, item) => sum + item.sales, 0)
      const previousSales = previousData.reduce((sum, item) => sum + item.sales, 0)
      const salesGrowth = previousSales > 0 ? ((recentSales - previousSales) / previousSales) * 100 : 0

      const recentOrders = recentData.reduce((sum, item) => sum + item.orders, 0)
      const previousOrders = previousData.reduce((sum, item) => sum + item.orders, 0)
      const ordersGrowth = previousOrders > 0 ? ((recentOrders - previousOrders) / previousOrders) * 100 : 0

      const recentRevenue = recentData.reduce((sum, item) => sum + item.revenue, 0)
      const previousRevenue = previousData.reduce((sum, item) => sum + item.revenue, 0)
      const revenueGrowth = previousRevenue > 0 ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 : 0

      setMetrics((prev) => ({
        ...prev,
        totalSales,
        totalOrders,
        totalRevenue,
        salesGrowth: Math.round(salesGrowth),
        ordersGrowth: Math.round(ordersGrowth),
        revenueGrowth: Math.round(revenueGrowth),
      }))
    }
  }, [filteredSalesData])

  return { metrics }
}
