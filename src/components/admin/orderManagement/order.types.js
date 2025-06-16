// Re-export everything from sampleData for backward compatibility
export * from "./sampleData1"

// Order structure based on Mongoose schema
export const createDefaultOrder = () => ({
  _id: "",
  userId: "",
  Amount: 0,
  shippingAddressId: "",
  paymentId: "",
  items: [],
  createdAt: "",
  updatedAt: "",
})

// Default order item structure
export const createDefaultOrderItem = () => ({
  productId: "",
  quantity: 1,
  total: 0,
})

// Default filters structure
export const createDefaultFilters = () => ({
  searchTerm: "",
  dateRangeFilter: {
    start: "",
    end: "",
  },
  amountRangeFilter: {
    min: "",
    max: "",
  },
})
