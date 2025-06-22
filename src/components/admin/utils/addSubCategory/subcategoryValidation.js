import * as Yup from "yup"

export const subcategoryValidationSchema = Yup.object().shape({
  categoryId: Yup.string().required("Category is required"),
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string().max(500, "Description must be less than 500 characters"),
  icon: Yup.string().max(100, "Icon must be less than 100 characters"),
})

export const subcategoryFilterSchema = Yup.object().shape({
  searchTerm: Yup.string(),
  categoryId: Yup.string(),
  dateRange: Yup.object().shape({
    start: Yup.string(),
    end: Yup.string(),
  }),
})