// Sample data for the order management system

export const sampleUsers = [
  { _id: "user1", name: "Sushant Mahato", email: "sushant@example.com", phone: "9812184550" },
  { _id: "user2", name: "Saroj Sah", email: "saroj@example.com", phone: "468726482" },
  { _id: "user3", name: "Dinesh Kunwar", email: "dinesh@example.com", phone: "684648" },
  // { _id: "user4", name: "Sarah Wilson", email: "sarah.wilson@example.com", phone: "+1 (555) 321-0987" },
  // { _id: "user5", name: "Mike Davis", email: "mike.davis@example.com", phone: "+1 (555) 654-3210" },
]

export const sampleProducts = [
  { _id: "prod1", name: "SSD 1TB", price: 120.0 },
  { _id: "prod2", name: "Thermal Paste", price: 15.0 },
  { _id: "prod3", name: "Mechanical Keyboard", price: 150.0 },
  // { _id: "prod4", name: "Gaming Mouse", price: 50.0 },
  // { _id: "prod5", name: "Mouse Pad", price: 25.0 },
  // { _id: "prod6", name: "USB Cable", price: 12.0 },
  // { _id: "prod7", name: "Monitor Stand", price: 35.0 },
  // { _id: "prod8", name: "Webcam", price: 80.0 },
]

export const sampleShippingAddresses = [
  { _id: "addr1", address: "Kathmandu", userId: "user1" },
  { _id: "addr2", address: "India", userId: "user2" },
  { _id: "addr3", address: "Banke", userId: "user3" },
  // { _id: "addr4", address: "321 Pine St, Los Angeles, CA 90210, USA", userId: "user4" },
  // { _id: "addr5", address: "654 Elm St, Miami, FL 33101, USA", userId: "user5" },
]

export const samplePayments = [
  { _id: "pay1", method: "credit-card", status: "completed", amount: 150.0 },
  { _id: "pay2", method: "paypal", status: "completed", amount: 250.0 },
  { _id: "pay3", method: "bank-transfer", status: "pending", amount: 75.0 },
  { _id: "pay4", method: "credit-card", status: "completed", amount: 320.0 },
  { _id: "pay5", method: "cash-on-delivery", status: "pending", amount: 95.0 },
]

// Initial orders data
export const initialOrders = [
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j1",
    userId: "6854d734336b6b23f97df036", // Saroj Sah's ID
    orderNumber: "ORD001",
    Amount: 150.0,
    shippingAddressId: "addr1",
    paymentId: "pay1",
    items: [
      { productId: "prod1", quantity: 1, total: 120.0 },
      { productId: "prod2", quantity: 2, total: 30.0 },
    ],
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
  },
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j2",
    userId: "6854d734336b6b23f97df036", // Saroj Sah's ID
    orderNumber: "ORD002",
    Amount: 250.0,
    shippingAddressId: "addr2",
    paymentId: "pay2",
    items: [
      { productId: "prod3", quantity: 1, total: 150.0 },
      { productId: "prod4", quantity: 1, total: 50.0 },
      { productId: "prod5", quantity: 2, total: 50.0 },
    ],
    createdAt: "2025-01-14T14:45:00Z",
    updatedAt: "2025-01-14T14:45:00Z",
  },
  {
    _id: "65f1a2b3c4d5e6f7g8h9i0j3",
    userId: "user3",
    orderNumber: "ORD003",
    Amount: 75.0,
    shippingAddressId: "addr3",
    paymentId: "pay3",
    items: [{ productId: "prod5", quantity: 3, total: 75.0 }],
    createdAt: "2025-01-13T09:15:00Z",
    updatedAt: "2025-01-13T09:15:00Z",
  },
  // {
  //   _id: "65f1a2b3c4d5e6f7g8h9i0j4",
  //   userId: "user4",
  //   Amount: 320.0,
  //   shippingAddressId: "addr4",
  //   paymentId: "pay4",
  //   items: [
  //     { productId: "prod3", quantity: 1, total: 150.0 },
  //     { productId: "prod8", quantity: 1, total: 80.0 },
  //     { productId: "prod7", quantity: 1, total: 35.0 },
  //     { productId: "prod6", quantity: 3, total: 36.0 },
  //     { productId: "prod2", quantity: 1, total: 15.0 },
  //   ],
  //   createdAt: "2025-01-12T16:20:00Z",
  //   updatedAt: "2025-01-12T16:20:00Z",
  // },
  // {
  //   _id: "65f1a2b3c4d5e6f7g8h9i0j5",
  //   userId: "user5",
  //   Amount: 95.0,
  //   shippingAddressId: "addr5",
  //   paymentId: "pay5",
  //   items: [
  //     { productId: "prod4", quantity: 1, total: 50.0 },
  //     { productId: "prod7", quantity: 1, total: 35.0 },
  //     { productId: "prod6", quantity: 1, total: 12.0 },
  //   ],
  //   createdAt: "2025-01-11T11:30:00Z",
  //   updatedAt: "2025-01-11T11:30:00Z",
  // },
]

// Utility functions for working with sample data
export const generateOrderId = () => {
  return `65f1a2b3c4d5e6f7g8h9i${Math.random().toString(36).substr(2, 9)}`
}

export const generateTrackingId = (orderId) => {
  return `TRK${orderId.slice(-8).toUpperCase()}`
}

// Export functions
export const exportToCSV = (orders, users, products, payments) => {
  const headers = ["Order ID", "Customer Name", "Customer Email", "Amount", "Items Count", "Payment Status", "Date"]

  const rows = orders.map((order) => {
    const user = users.find((u) => u._id === order.userId)
    const payment = payments.find((p) => p._id === order.paymentId)

    return [
      order._id,
      user ? user.name : "Unknown",
      user ? user.email : "Unknown",
      `$${order.Amount.toFixed(2)}`,
      order.items.length,
      payment ? payment.status : "Unknown",
      new Date(order.createdAt).toLocaleDateString(),
    ]
  })

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

  return csvContent
}

export const downloadFile = (content, filename, type = "text/csv") => {
  const blob = new Blob([content], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const printInvoice = (order, user, products, shippingAddress, payment) => {
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - ${order._id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .order-info { margin-bottom: 20px; }
          .customer-info { margin-bottom: 20px; background: #f5f5f5; padding: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .total-row { background-color: #e8f4f8; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div class="customer-info">
          <h3>Bill To:</h3>
          <p><strong>${user ? user.name : "Unknown Customer"}</strong></p>
          <p>${user ? user.email : "No email"}</p>
          <p>${user ? user.phone : "No phone"}</p>
          <p><strong>Shipping Address:</strong></p>
          <p>${shippingAddress ? shippingAddress.address : "No address"}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map((item) => {
                const product = products.find((p) => p._id === item.productId)
                const unitPrice = product ? product.price : item.total / item.quantity
                return `
                <tr>
                  <td>${product ? product.name : `Product ID: ${item.productId}`}</td>
                  <td>${item.quantity}</td>
                  <td>$${unitPrice.toFixed(2)}</td>
                  <td>$${item.total.toFixed(2)}</td>
                </tr>
              `
              })
              .join("")}
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="3"><strong>Grand Total</strong></td>
              <td><strong>$${order.Amount.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>

        <div class="order-info">
          <p><strong>Payment Method:</strong> ${payment ? payment.method : "Unknown"}</p>
          <p><strong>Payment Status:</strong> ${payment ? payment.status : "Unknown"}</p>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `

  const printWindow = window.open("", "_blank")
  printWindow.document.write(invoiceHTML)
  printWindow.document.close()
  printWindow.print()
}
