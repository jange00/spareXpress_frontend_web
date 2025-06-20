import * as Yup from "yup"

const validateProfilePicture = (value) => {
  if (!value) return false

  // Check if it's a data URL (base64 image from file upload)
  if (value.startsWith("data:image/")) {
    return true
  }

  // Check if it's a valid HTTP/HTTPS URL
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Profile picture validation schema
 */
const profilePictureSchema = Yup.string()
  .required("Profile picture is required")
  .test("valid-image", "Please upload a valid image or provide a valid image URL", validateProfilePicture)

/**
 * Full name validation schema
 */
const fullnameSchema = Yup.string()
  .required("Full name is required")
  .min(2, "Full name must be at least 2 characters")
  .max(50, "Full name must be less than 50 characters")
  .matches(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes")
  .trim()

/**
 * Email validation schema
 */
const emailSchema = Yup.string()
  .required("Email is required")
  .email("Please enter a valid email address")
  .lowercase("Email will be converted to lowercase")
  .max(100, "Email must be less than 100 characters")

/**
 * Phone number validation schema
 */
const phoneNumberSchema = Yup.string()
  .required("Phone number is required")
  .matches(/^[+]?[1-9][\d\s\-()]{7,15}$/, "Please enter a valid phone number (e.g., +1234567890 or (123) 456-7890)")

/**
 * Password validation schema
 */
const passwordSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .matches(/^(?=.*\d)/, "Password must contain at least one number")
  .matches(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character (@$!%*?&)")

/**
 * Optional password validation schema (for updates)
 */
const optionalPasswordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .matches(/^(?=.*\d)/, "Password must contain at least one number")
  .matches(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character (@$!%*?&)")

/**
 * Role validation schema
 */
const roleSchema = Yup.string()
  .required("Role is required")
  .oneOf(["Admin", "Customer"], "Role must be either Admin or Customer")

/**
 * Main user validation schema for creating new users
 */
export const userValidationSchema = Yup.object({
  fullname: fullnameSchema,
  email: emailSchema,
  password: passwordSchema,
  phoneNumber: phoneNumberSchema,
  role: roleSchema,
  profilePicture: profilePictureSchema,
})

/**
 * User update validation schema (password is optional)
 */
export const userUpdateValidationSchema = Yup.object({
  fullname: fullnameSchema,
  email: emailSchema,
  password: optionalPasswordSchema,
  phoneNumber: phoneNumberSchema,
  role: roleSchema,
  profilePicture: profilePictureSchema,
})

/**
 * Bulk action validation schema
 */
export const bulkActionValidationSchema = Yup.object({
  action: Yup.string().required("Action is required").oneOf(["activate", "ban", "delete"], "Invalid action selected"),

  userIds: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one user must be selected")
    .required("User selection is required"),

  // Optional status field for status update actions
  status: Yup.string().when("action", {
    is: (action) => action === "activate" || action === "ban",
    then: (schema) => schema.required("Status is required for this action"),
    otherwise: (schema) => schema.notRequired(),
  }),
})

/**
 * Search and filter validation schema
 */
export const searchFilterValidationSchema = Yup.object({
  search: Yup.string().max(100, "Search term must be less than 100 characters"),
  status: Yup.string().oneOf(["", "active", "banned", "pending"], "Invalid status filter"),
  role: Yup.string().oneOf(["", "Admin", "Customer"], "Invalid role filter"),
  dateRange: Yup.object({
    start: Yup.date().nullable(),
    end: Yup.date()
      .nullable()
      .when("start", {
        is: (start) => start != null,
        then: (schema) => schema.min(Yup.ref("start"), "End date must be after start date"),
        otherwise: (schema) => schema.nullable(),
      }),
  }),
})

/**
 * Validation error messages configuration
 */
export const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be less than ${max} characters`,
  invalidFormat: "Invalid format",
  passwordRequirements: {
    minLength: "Password must be at least 8 characters",
    uppercase: "Must contain at least one uppercase letter",
    lowercase: "Must contain at least one lowercase letter",
    number: "Must contain at least one number",
    special: "Must contain at least one special character",
  },
}

/**
 * Helper function to get validation schema based on form type
 * @param {string} formType - Type of form ('create', 'update', 'bulk')
 * @returns {Object} Yup validation schema
 */
export const getValidationSchema = (formType) => {
  switch (formType) {
    case "create":
      return userValidationSchema
    case "update":
      return userUpdateValidationSchema
    case "bulk":
      return bulkActionValidationSchema
    case "search":
      return searchFilterValidationSchema
    default:
      throw new Error(`Unknown form type: ${formType}`)
  }
}
