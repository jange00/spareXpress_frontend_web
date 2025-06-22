export const filterCategories = (categories, filters) => {
    let filtered = [...categories]
  
    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter((category) =>
        category.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
  
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy]
      const bValue = b[filters.sortBy]
  
      if (filters.sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  
    return filtered
  }
  
  export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  
  export const exportToCSV = (categories) => {
    const headers = ["Title", "Created Date", "Updated Date"]
    const csvContent = [
      headers.join(","),
      ...categories.map((category) =>
        [`"${category.title}"`, `"${formatDate(category.createdAt)}"`, `"${formatDate(category.updatedAt)}"`].join(",")
      ),
    ].join("\n")
  
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `categories_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }
  
  export const exportToExcel = (categories) => {
    // For now, we'll export as CSV with .xlsx extension
    // In a real app, you'd use a library like xlsx
    const headers = ["Title", "Created Date", "Updated Date"]
    const csvContent = [
      headers.join(","),
      ...categories.map((category) =>
        [`"${category.title}"`, `"${formatDate(category.createdAt)}"`, `"${formatDate(category.updatedAt)}"`].join(",")
      ),
    ].join("\n")
  
    const blob = new Blob([csvContent], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `categories_${new Date().toISOString().split("T")[0]}.xlsx`
    a.click()
    window.URL.revokeObjectURL(url)
  }
  
  export const exportToPDF = (categories) => {
    // Simple PDF export using HTML and print
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Categories Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; border-bottom: 2px solid #ffc107; padding-bottom: 10px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f8f9fa; font-weight: bold; }
              tr:nth-child(even) { background-color: #f8f9fa; }
              .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <h1>Categories Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created Date</th>
                  <th>Updated Date</th>
                </tr>
              </thead>
              <tbody>
                ${categories
                  .map(
                    (category) => `
                  <tr>
                    <td>${category.title}</td>
                    <td>${formatDate(category.createdAt)}</td>
                    <td>${formatDate(category.updatedAt)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            <div class="footer">
              <p>Total Categories: ${categories.length}</p>
            </div>
          </body>
        </html>
      `
  
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.print()
    }
  }
  