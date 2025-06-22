import * as Yup from "yup"

export const categorySchema = Yup.object().shape({
  title: Yup.string()
    .required("Category title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s-_]+$/, "Title can only contain letters, numbers, spaces, hyphens, and underscores"),
})
