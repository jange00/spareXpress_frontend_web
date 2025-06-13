"use client"

import { useState, useEffect } from "react"

export function useFilters(sampleData) {
  // Filter states
  const [dateRangeFilter, setDateRangeFilter] = useState("30days")
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })
  const [categoryFilter, setCategoryFilter] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Data states
  const [filteredSalesData, setFilteredSalesData] = useState(sampleData.salesData)
  const [filteredReportsData, setFilteredReportsData] = useState(sampleData.initialReportsData)

  // Sorting states
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Filter sales data based on date range
  useEffect(() => {
    let filteredData = [...sampleData.salesData]

    // Apply date range filter
    if (dateRangeFilter !== "all") {
      const now = new Date()
      let startDate

      if (dateRangeFilter === "today") {
        startDate = new Date(now)
        startDate.setHours(0, 0, 0, 0)
      } else if (dateRangeFilter === "7days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
      } else if (dateRangeFilter === "30days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
      } else if (dateRangeFilter === "custom" && customDateRange.start && customDateRange.end) {
        startDate = new Date(customDateRange.start)
        const endDate = new Date(customDateRange.end)
        endDate.setHours(23, 59, 59, 999)

        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= startDate && itemDate <= endDate
        })
      }

      if (dateRangeFilter !== "custom") {
        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= startDate
        })
      }
    }

    setFilteredSalesData(filteredData)
  }, [dateRangeFilter, customDateRange, sampleData.salesData])

  // Filter reports data based on all filters
  useEffect(() => {
    let filteredData = [...sampleData.initialReportsData]

    // Apply date range filter
    if (dateRangeFilter !== "all") {
      const now = new Date()
      let startDate

      if (dateRangeFilter === "today") {
        startDate = new Date(now)
        startDate.setHours(0, 0, 0, 0)
      } else if (dateRangeFilter === "7days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
      } else if (dateRangeFilter === "30days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
      } else if (dateRangeFilter === "custom" && customDateRange.start && customDateRange.end) {
        startDate = new Date(customDateRange.start)
        const endDate = new Date(customDateRange.end)
        endDate.setHours(23, 59, 59, 999)

        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= startDate && itemDate <= endDate
        })
      }

      if (dateRangeFilter !== "custom") {
        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= startDate
        })
      }
    }

    // Apply category filter
    if (categoryFilter) {
      filteredData = filteredData.filter((item) => item.category === categoryFilter)
    }

    // Apply payment method filter
    if (paymentMethodFilter) {
      filteredData = filteredData.filter((item) => item.paymentMethod === paymentMethodFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredData = filteredData.filter(
        (item) =>
          item.id.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.topBrand.toLowerCase().includes(query) ||
          item.paymentMethod.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortField === "orders" || sortField === "sales" || sortField === "growth") {
        return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
      } else {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField])
      }
    })

    setFilteredReportsData(filteredData)
  }, [
    sampleData.initialReportsData,
    dateRangeFilter,
    customDateRange,
    categoryFilter,
    paymentMethodFilter,
    locationFilter,
    searchQuery,
    sortField,
    sortDirection,
  ])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  return {
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
  }
}
