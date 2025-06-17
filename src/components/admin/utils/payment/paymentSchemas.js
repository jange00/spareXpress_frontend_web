import * as Yup from "yup"

// ObjectId validation regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/

export const paymentValidationSchema = Yup.object({
  userId: Yup.string()
    .required("User ID is required")
    .matches(objectIdRegex, "Invalid User ID format (must be 24 character hex string)"),

  orderId: Yup.string()
    .required("Order ID is required")
    .matches(objectIdRegex, "Invalid Order ID format (must be 24 character hex string)"),

  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than 0")
    .max(999999.99, "Amount cannot exceed $999,999.99")
    .typeError("Amount must be a valid number"),

  paymentMethod: Yup.string()
    .required("Payment method is required")
    .oneOf(
      ["Credit Card", "Debit Card", "Cash on Delivery", "Esewa", "Net Banking", "Other"],
      "Invalid payment method",
    ),

  paymentStatus: Yup.string()
    .required("Payment status is required")
    .oneOf(["Pending", "Completed", "Failed", "Refunded"], "Invalid payment status"),
})

export const paymentSearchValidationSchema = Yup.object({
  searchTerm: Yup.string().max(100, "Search term cannot exceed 100 characters"),

  paymentMethod: Yup.string().oneOf(
    ["", "Credit Card", "Debit Card", "Cash on Delivery", "Esewa", "Net Banking", "Other"],
    "Invalid payment method",
  ),

  paymentStatus: Yup.string().oneOf(["", "Pending", "Completed", "Failed", "Refunded"], "Invalid payment status"),

  amountMin: Yup.number()
    .min(0, "Minimum amount cannot be negative")
    .typeError("Minimum amount must be a valid number"),

  amountMax: Yup.number()
    .min(0, "Maximum amount cannot be negative")
    .when("amountMin", (amountMin, schema) => {
      return amountMin ? schema.min(amountMin, "Maximum amount must be greater than minimum amount") : schema
    })
    .typeError("Maximum amount must be a valid number"),

  dateFrom: Yup.date().typeError("Invalid date format"),

  dateTo: Yup.date().min(Yup.ref("dateFrom"), "End date must be after start date").typeError("Invalid date format"),

  userId: Yup.string().matches(objectIdRegex, "Invalid User ID format (must be 24 character hex string)"),

  orderId: Yup.string().matches(objectIdRegex, "Invalid Order ID format (must be 24 character hex string)"),
})

export const refundValidationSchema = (maxAmount) =>
  Yup.object({
    refundAmount: Yup.number()
      .required("Refund amount is required")
      .min(0.01, "Refund amount must be greater than 0")
      .max(maxAmount, `Refund amount cannot exceed $${maxAmount}`)
      .typeError("Refund amount must be a valid number"),

    refundReason: Yup.string()
      .required("Refund reason is required")
      .min(10, "Reason must be at least 10 characters")
      .max(500, "Reason cannot exceed 500 characters"),
  })
