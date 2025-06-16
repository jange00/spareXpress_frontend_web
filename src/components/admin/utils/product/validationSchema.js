import * as Yup from "yup"

export const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .min(6, "Product name must be at least 6 characters")
    .max(100, "Product name must be less than 100 characters"),

  categoryId: Yup.string().required("Category is required"),

  subCategoryId: Yup.string().required("Subcategory is required"),

  brandId: Yup.string().required("Brand is required"),

  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(50, "Price must be at least 50"),

  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  shippingCharge: Yup.number().required("Shipping charge is required").min(0, "Shipping charge cannot be negative"),

  discount: Yup.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%"),

  description: Yup.string().max(1000, "Description must be less than 1000 characters"),

  image: Yup.array().of(Yup.string().url("Invalid image URL")).min(1, "At least one image is required"),

  specificationsId: Yup.string(),
})
