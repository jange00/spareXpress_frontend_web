import * as Yup from "yup"

export const brandValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  count: Yup.number()
    .min(0, "Count must be 0 or greater")
    .integer("Count must be a whole number")
    .required("Count is required"),
  model: Yup.string().max(100, "Model must be less than 100 characters"),
  categoryId: Yup.string().required("Category is required"),
  subcategoryId: Yup.string().required("Subcategory is required"),
})

export const brandFilterSchema = Yup.object().shape({
  searchTerm: Yup.string(),
  categoryId: Yup.string(),
  subcategoryId: Yup.string(),
  countRange: Yup.object().shape({
    min: Yup.string(),
    max: Yup.string(),
  }),
  dateRange: Yup.object().shape({
    start: Yup.string(),
    end: Yup.string(),
  }),
})
