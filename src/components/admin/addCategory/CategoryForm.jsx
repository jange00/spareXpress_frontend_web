import { Formik, Form } from "formik"
import { categorySchema } from "../utils/addCategory/category-schema"
import FormField from "../UIs/addCategoryUi/FormField"
import FormButton from "../UIs/addCategoryUi/FormButton"
import { Package } from "lucide-react"

export default function CategoryForm({
  onSubmit,
  isSubmitting = false,
  initialValues = null,
  onCancel = null,
  isEdit = false,
}) {
  const defaultValues = {
    title: "",
  }

  return (
    <div>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={categorySchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values)
          if (!isEdit) {
            resetForm()
          }
        }}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-6">
            <FormField
              name="title"
              label="Category Title"
              placeholder="Enter category title (e.g., Electronics, Clothing)"
              icon={<Package className="w-5 h-5" />}
              required
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              {onCancel && (
                <FormButton
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </FormButton>
              )}

              <FormButton
                type="submit"
                isLoading={isSubmitting}
                loadingText={isEdit ? "Updating..." : "Adding..."}
                className="px-6 py-2 bg-[#ffc107] text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              >
                {isEdit ? "Update Category" : "Add Category"}
              </FormButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
