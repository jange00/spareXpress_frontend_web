import { Formik, Form, Field } from "formik"
import Select from "../../UIs/adminUserUi/select"
import Button from "../../UIs/adminUserUi/button"
import { bulkActionValidationSchema } from "../../utils/adminUser/validation-schemas"
import { BULK_ACTIONS, USER_STATUSES } from "../../utils/adminUser/constants"


const BulkActionForm = ({ selectedUserIds = [], onSubmit, onCancel, isLoading = false }) => {
  const initialValues = {
    action: "",
    status: "",
    userIds: selectedUserIds,
  }

  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await onSubmit(values)
    } catch (error) {
      console.error("Bulk action error:", error)
      if (error.validationErrors) {
        Object.keys(error.validationErrors).forEach((field) => {
          setFieldError(field, error.validationErrors[field])
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const getActionDescription = (action) => {
    switch (action) {
      case "activate":
        return "This will activate all selected users and set their status to active."
      case "ban":
        return "This will ban all selected users and set their status to banned."
      case "delete":
        return "This will permanently delete all selected users. This action cannot be undone."
      default:
        return "Please select an action to perform on the selected users."
    }
  }

  const getActionButtonVariant = (action) => {
    return action === "delete" ? "danger" : "primary"
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bulkActionValidationSchema}
      onSubmit={handleFormSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ values, errors, touched, isSubmitting, isValid, setFieldValue }) => (
        <Form className="space-y-6" noValidate>
          {/* Selected Users Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Selected Users: <span className="font-bold">{selectedUserIds.length}</span>
                </p>
                <p className="text-xs text-blue-700">The action will be applied to all selected users</p>
              </div>
            </div>
          </div>

          {/* Action Selection */}
          <div className="space-y-4">
            <Field name="action">
              {({ field, meta }) => (
                <Select
                  {...field}
                  label="Select Action"
                  error={meta.touched && meta.error}
                  options={BULK_ACTIONS}
                  placeholder="Choose an action to perform"
                  required
                  disabled={isSubmitting || isLoading}
                  onChange={(e) => {
                    setFieldValue("action", e.target.value)
                    setFieldValue("status", "")
                  }}
                />
              )}
            </Field>

            {/* Conditional Status Field */}
            {(values.action === "activate" || values.action === "ban") && (
              <Field name="status">
                {({ field, meta }) => (
                  <Select
                    {...field}
                    label="New Status"
                    error={meta.touched && meta.error}
                    options={USER_STATUSES}
                    placeholder="Select new status"
                    required
                    disabled={isSubmitting || isLoading}
                  />
                )}
              </Field>
            )}
          </div>

          {/* Action Description */}
          {values.action && (
            <div
              className={`rounded-lg p-4 border ${
                values.action === "delete" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-start">
                <svg
                  className={`w-5 h-5 mr-2 mt-0.5 ${values.action === "delete" ? "text-red-500" : "text-yellow-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p
                    className={`text-sm font-medium ${values.action === "delete" ? "text-red-800" : "text-yellow-800"}`}
                  >
                    {values.action === "delete" ? "Warning" : "Confirmation"}
                  </p>
                  <p className={`text-sm mt-1 ${values.action === "delete" ? "text-red-700" : "text-yellow-700"}`}>
                    {getActionDescription(values.action)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
              variant={getActionButtonVariant(values.action)}
              disabled={isSubmitting || isLoading || !isValid || !values.action}
              className="min-w-[120px]"
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
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Apply Action
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default BulkActionForm
