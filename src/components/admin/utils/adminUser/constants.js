
// User role options for dropdowns

export const USER_ROLES = [
    { value: "Customer", label: "Customer" },
    { value: "Admin", label: "Admin" },
  ]
  
  
   // User status options for dropdowns
  export const USER_STATUSES = [
    { value: "active", label: "Active" },
    { value: "banned", label: "Banned" },
    { value: "pending", label: "Pending" },
  ]
  
 
 // Bulk action options

  export const BULK_ACTIONS = [
    { value: "activate", label: "Activate Users" },
    { value: "ban", label: "Ban Users" },
    { value: "delete", label: "Delete Users" },
  ]
  

   // Export format options
 
  export const EXPORT_FORMATS = [
    { value: "csv", label: "CSV" },
    { value: "excel", label: "Excel" },
    { value: "pdf", label: "PDF" },
  ]
  

   // Status badge color mapping
  
  export const STATUS_COLORS = {
    active: "green",
    banned: "red",
    pending: "yellow",
    inactive: "gray",
  }
  

   // Form field configurations
  
  export const FORM_FIELDS = {
    fullname: {
      label: "Full Name",
      placeholder: "Enter full name",
      type: "text",
      required: true,
    },
    email: {
      label: "Email Address",
      placeholder: "user@example.com",
      type: "email",
      required: true,
    },
    password: {
      label: "Password",
      placeholder: "Enter secure password",
      type: "password",
      required: true,
    },
    phoneNumber: {
      label: "Phone Number",
      placeholder: "+1 (555) 123-4567",
      type: "tel",
      required: true,
    },
    role: {
      label: "Role",
      placeholder: "Select role",
      type: "select",
      required: true,
      options: USER_ROLES,
    },
    profilePicture: {
      label: "Profile Picture",
      type: "file",
      required: true,
      accept: "image/*",
    },
  }
  

   // Application settings
  
  export const APP_SETTINGS = {
    // Pagination
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  
    // File upload
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
  
    // Search
    SEARCH_DEBOUNCE_DELAY: 300,
    MIN_SEARCH_LENGTH: 2,
  
    // UI
    TOAST_DURATION: 5000,
    MODAL_ANIMATION_DURATION: 200,
  
    // Validation
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
  }
  

   // API endpoints (for future backend integration)
  
  export const API_ENDPOINTS = {
    USERS: "/api/users",
    USER_BY_ID: (id) => `/api/users/${id}`,
    USER_BULK_ACTION: "/api/users/bulk",
    USER_EXPORT: "/api/users/export",
    USER_IMPORT: "/api/users/import",
    USER_STATISTICS: "/api/users/statistics",
  }
  

   // Error messages
  
  export const ERROR_MESSAGES = {
    GENERIC: "Something went wrong. Please try again.",
    NETWORK: "Network error. Please check your connection.",
    VALIDATION: "Please check your input and try again.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    SERVER_ERROR: "Server error. Please try again later.",
  }
  

   // Success messages
  
  export const SUCCESS_MESSAGES = {
    USER_CREATED: "User created successfully!",
    USER_UPDATED: "User updated successfully!",
    USER_DELETED: "User deleted successfully!",
    BULK_ACTION_COMPLETED: "Bulk action completed successfully!",
    EXPORT_COMPLETED: "Export completed successfully!",
    IMPORT_COMPLETED: "Import completed successfully!",
  }
  

   // Table column configurations
  
  export const TABLE_COLUMNS = {
    id: { label: "User ID", sortable: true, width: "100px" },
    fullname: { label: "Name", sortable: true, width: "200px" },
    email: { label: "Email", sortable: true, width: "250px" },
    phoneNumber: { label: "Phone", sortable: false, width: "150px" },
    status: { label: "Status", sortable: true, width: "120px" },
    role: { label: "Role", sortable: true, width: "100px" },
    createdAt: { label: "Joined", sortable: true, width: "150px" },
    orders: { label: "Orders", sortable: true, width: "100px" },
    totalSpent: { label: "Total Spent", sortable: true, width: "120px" },
    actions: { label: "Actions", sortable: false, width: "150px" },
  }
  