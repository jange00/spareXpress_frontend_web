import * as Yup from "yup"

export const orderItemValidationSchema = Yup.object({
  productId: Yup.string().required("Product is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .integer("Quantity must be a whole number"),
  total: Yup.number().required("Total is required").min(0, "Total must be positive"),
})

export const shippingAddressValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),

  addressLine1: Yup.string().required("Address line 1 is required"),

  addressLine2: Yup.string(),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),

  postalCode: Yup.string().required("Postal code is required"),

  country: Yup.string().required("Country is required"),
})


export const addOrderValidationSchema = Yup.object({
  userId: Yup.string().required("User is required"),
  Amount: Yup.number().required("Amount is required").min(0, "Amount must be positive"),
  shippingAddressId: Yup.string().required("Shipping address is required"),
  paymentId: Yup.string().required("Payment is required"),
  items: Yup.array().of(orderItemValidationSchema).min(1, "At least one item is required"),
})