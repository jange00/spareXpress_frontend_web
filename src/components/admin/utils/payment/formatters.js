export const formatDate = (dateString) => {
    if (!dateString) return "N/A"
  
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }
  
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "Npr",
    }).format(amount)
  }
  
  export const generateInvoiceNumber = (transactionId) => {
    return `INV-${transactionId.replace("TXN", "")}-${new Date().getFullYear()}`
  }
  