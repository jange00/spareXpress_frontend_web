import { Formik, Form, Field } from "formik"
import Input from "../../UIs/adminUserUi/input"
import Button from "../../UIs/adminUserUi/button"
import ImageUpload from "../../UIs/adminUserUi/image-upload"
import { userValidationSchema, userUpdateValidationSchema } from "../../utils/adminUser/validation-schemas"


// API mutation hook
import { usePostAdminUsers } from "../../../../hook/admin/useUsers/usePostAdminUsers"

const UserForm = ({ initialValues = null, onSubmit, onCancel, isEditing = false, isLoading = false }) => {
  const defaultFormValues = {
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "Customer",
    profilePicture: "",
  }

  // Initialize product mutation
  const { mutate, isLoading: isSubmitting } = usePostAdminUsers();

  const getFormValues = () => {
    if (isEditing && initialValues) {
      return {
        ...initialValues,
        password: "", // Always start with empty password in edit mode
      }
    }
    return defaultFormValues
  }

  const getValidationSchema = () => {
    return isEditing ? userUpdateValidationSchema : userValidationSchema
  }

const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
  console.log("Submitting form with values:", values);
  try {
    const formData = new FormData();
    
    
    formData.append("fullname", values.fullname.trim());
    formData.append("email", values.email.toLowerCase().trim());
    formData.append("phoneNumber", values.phoneNumber.trim());
    formData.append("role", values.role);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (values.profilePicture && values.profilePicture instanceof File) {
      formData.append("profilePicture", values.profilePicture);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    mutate(formData, {
      onSuccess: () => {
        alert("User created successfully!");
        if (onCancel) onCancel(); // Optionally close modal or reset form
      },
      onError: (error) => {
        alert("There was an error creating the user.");
        if (error && error.validationErrors) {
          Object.entries(error.validationErrors).forEach(([field, msg]) => {
            setFieldError(field, msg);
          });
        }
      },
      onSettled: () => {
        setSubmitting(false);
      }
    });
  } catch (error) {
    console.error("Form submission error:", error);
    if (error.validationErrors) {
      Object.entries(error.validationErrors).forEach(([field, msg]) => {
        setFieldError(field, msg);
      });
    }
    setSubmitting(false);
  }
};


  return (
    <div className="space-y-8">
      {/* Form Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isEditing ? "Update User Information" : "Create New User Account"}
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          {isEditing
            ? "Modify user details below. Leave password empty to keep current password."
            : "Fill in the details below to create a new user account with Customer role."}
        </p>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={getFormValues()}
        validationSchema={getValidationSchema()}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting, isValid, dirty }) => (
          <Form className="space-y-8" noValidate>
            {/* Profile Picture Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-6 text-center flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Profile Picture
              </h4>

              <Field name="profilePicture">
                {({ field, meta }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={(value) => setFieldValue("profilePicture", value)}
                    error={meta.touched && meta.error}
                    required
                    disabled={isSubmitting || isLoading}
                  />
                )}
              </Field>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <Field name="fullname">
                    {({ field, meta }) => (
                      <Input
                        {...field}
                        label="Full Name"
                        placeholder="Enter full name"
                        error={meta.touched && meta.error}
                        required
                        disabled={isSubmitting || isLoading}
                      />
                    )}
                  </Field>
                </div>

                {/* Email */}
                <Field name="email">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="email"
                      label="Email Address"
                      placeholder="user@example.com"
                      error={meta.touched && meta.error}
                      required
                      disabled={isSubmitting || isLoading}
                    />
                  )}
                </Field>

                {/* Phone Number */}
                <Field name="phoneNumber">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="tel"
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      error={meta.touched && meta.error}
                      required
                      disabled={isSubmitting || isLoading}
                    />
                  )}
                </Field>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Security Settings
              </h4>

              {/* Hidden Role Field */}
              <Field name="role" type="hidden" />

              {/* Password Field */}
              <div className="space-y-4">
                <Field name="password">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="password"
                      label={isEditing ? "New Password (Optional)" : "Password"}
                      placeholder={isEditing ? "Leave empty to keep current password" : "Enter secure password"}
                      error={meta.touched && meta.error}
                      required={!isEditing}
                      disabled={isSubmitting || isLoading}
                    />
                  )}
                </Field>

                {/* Password Requirements */}
                <div
                  className={`rounded-lg p-4 border ${isEditing ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="flex items-start">
                    <svg
                      className={`w-4 h-4 mr-2 mt-0.5 ${isEditing ? "text-amber-500" : "text-blue-500"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className={`text-sm font-medium ${isEditing ? "text-amber-700" : "text-blue-700"}`}>
                        {isEditing ? "Password Update:" : "Password Requirements:"}
                      </p>
                      {isEditing ? (
                        <p className="text-xs text-amber-600 mt-1">
                          Leave password field empty to keep the current password unchanged.
                        </p>
                      ) : (
                        <ul className="text-xs text-blue-600 mt-1 space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Contains uppercase and lowercase letters</li>
                          <li>• Contains at least one number</li>
                          <li>• Contains at least one special character (@$!%*?&)</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-gradient-to-r from-[#FFB800]/10 to-[#FFB800]/5 border border-[#FFB800]/20 rounded-xl p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Account Summary
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Account Type:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Customer</span>
                </div>

                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Default Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
                </div>

                {!isEditing && (
                  <div className="md:col-span-2 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Welcome Email:</span>
                    <span className="text-gray-600">Will be sent automatically after account creation</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting || isLoading}
                className="min-w-[100px]"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || isLoading || (!isValid && dirty)}
                className="min-w-[140px]"
              >
                {isSubmitting || isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isEditing ? "Update User" : "Create User"}
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserForm
