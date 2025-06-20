/**
 * Export utility functions
 */

/**
 * Export users to CSV format
 */
export const exportToCSV = (users, filename = "users") => {
    const headers = ["ID", "Full Name", "Email", "Phone Number", "Status", "Created At", "Orders", "Total Spent"]
  
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [
          user.id,
          `"${user.fullname}"`,
          user.email,
          user.phoneNumber,
          user.status,
          new Date(user.createdAt).toLocaleDateString(),
          user.orders || 0,
          (user.totalSpent || 0).toFixed(2),
        ].join(","),
      ),
    ].join("\n")
  
    downloadFile(csvContent, `${filename}.csv`, "text/csv")
  }
  
  /**
   * Export users to Excel format (CSV with Excel headers)
   */
  export const exportToExcel = (users, filename = "users") => {
    const headers = ["ID", "Full Name", "Email", "Phone Number", "Status", "Created At", "Orders", "Total Spent"]
  
    const csvContent = [
      headers.join("\t"),
      ...users.map((user) =>
        [
          user.id,
          user.fullname,
          user.email,
          user.phoneNumber,
          user.status,
          new Date(user.createdAt).toLocaleDateString(),
          user.orders || 0,
          (user.totalSpent || 0).toFixed(2),
        ].join("\t"),
      ),
    ].join("\n")
  
    downloadFile(csvContent, `${filename}.xlsx`, "application/vnd.ms-excel")
  }
  
  /**
   * Export users to PDF format (simplified HTML for PDF conversion)
   */
  export const exportToPDF = (users, filename = "users") => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Users Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .header { text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Users Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Orders</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            ${users
              .map(
                (user) => `
              <tr>
                <td>${user.id}</td>
                <td>${user.fullname}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>${user.status}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>${user.orders || 0}</td>
                <td>$${(user.totalSpent || 0).toFixed(2)}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `
  
    downloadFile(htmlContent, `${filename}.html`, "text/html")
    alert("HTML file downloaded. You can convert it to PDF using your browser's print function.")
  }
  
  /**
   * Download file helper
   */
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
  
  /**
   * Import users from CSV
   */
  export const importFromCSV = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.onload = (e) => {
        try {
          const csv = e.target.result
          const lines = csv.split("\n")
          const headers = lines[0].split(",").map((h) => h.trim())
  
          const users = []
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
              const user = {
                fullname: values[1] || "",
                email: values[2] || "",
                phoneNumber: values[3] || "",
                role: "Customer",
                status: values[4] || "active",
                profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(values[1] || "User")}&background=FFB800&color=000000&size=128`,
              }
  
              if (user.fullname && user.email && user.phoneNumber) {
                users.push(user)
              }
            }
          }
  
          resolve(users)
        } catch (error) {
          reject(error)
        }
      }
  
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsText(file)
    })
  }
  