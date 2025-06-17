export const filterTransactions = (transactions, filters) => {
    let result = [...transactions]
  
    // Apply search filter
    if (filters.searchTerm) {
      result = result.filter((transaction) => {
        if (filters.searchType === "all") {
          return (
            transaction.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            transaction.orderId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            transaction.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            transaction.customerEmail.toLowerCase().includes(filters.searchTerm.toLowerCase())
          )
        } else if (filters.searchType === "transaction") {
          return transaction.id.toLowerCase().includes(filters.searchTerm.toLowerCase())
        } else if (filters.searchType === "order") {
          return transaction.orderId.toLowerCase().includes(filters.searchTerm.toLowerCase())
        } else if (filters.searchType === "customer") {
          return (
            transaction.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            transaction.customerEmail.toLowerCase().includes(filters.searchTerm.toLowerCase())
          )
        }
        return true
      })
    }
  
    // Apply date range filter
    if (filters.dateRangeFilter !== "all") {
      const now = new Date()
      let startDate
  
      if (filters.dateRangeFilter === "7days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
      } else if (filters.dateRangeFilter === "30days") {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
      } else if (filters.dateRangeFilter === "custom" && filters.customDateRange.start && filters.customDateRange.end) {
        startDate = new Date(filters.customDateRange.start)
        const endDate = new Date(filters.customDateRange.end)
        endDate.setHours(23, 59, 59, 999)
  
        result = result.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate >= startDate && transactionDate <= endDate
        })
      }
  
      if (filters.dateRangeFilter !== "custom") {
        result = result.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate >= startDate
        })
      }
    }
  
    // Apply payment method filter
    if (filters.paymentMethodFilter) {
      result = result.filter((transaction) => transaction.paymentMethod === filters.paymentMethodFilter)
    }
  
    // Apply status filter
    if (filters.statusFilter) {
      result = result.filter((transaction) => transaction.status === filters.statusFilter)
    }
  
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
    return result
  }
  