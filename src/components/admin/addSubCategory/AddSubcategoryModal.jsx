import { useState } from "react"
import { Formik, Form } from "formik"
import { Button } from "../UIs/addSubCategoryUi/Button"
import { Input } from "../UIs/addSubCategoryUi/Input"
import { Select } from "../UIs/addSubCategoryUi/Select"
import { subcategoryValidationSchema } from "../utils/addSubCategory/subcategoryValidation"
import { X } from "lucide-react"


import { useGetAllCategory } from "../../../hook/admin/useCategory/useGetAllCategory"

  export const AddSubcategoryModal = ({ onSave, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const initialValues = {
      categoryId: "",
      title: "",
      description: "",
      icon: "",
    }

    const { data: categories = [] } = useGetAllCategory()
  
    const categoryOptions = categories.map((category) => ({
      value: category._id,
      label: `${category.title}`,
    }))
  
    const handleSubmit = async (values) => {
      setIsSubmitting(true)
  
      try {
        const subcategoryData = {
          categoryId: values.categoryId,
          title: values.title.trim(),
          description: values.description.trim() || undefined,
          icon: values.icon.trim() || undefined,
        }
  
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
  
        onSave(subcategoryData)
      } catch (error) {
        console.error("Error creating subcategory:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Add New Subcategory</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
  
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            <Formik initialValues={initialValues} validationSchema={subcategoryValidationSchema} onSubmit={handleSubmit}>
              {({ values, errors, touched, setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Category Selection */}
                  <Select
                    label="Category"
                    options={categoryOptions}
                    placeholder="Select a category"
                    value={values.categoryId}
                    onChange={(e) => setFieldValue("categoryId", e.target.value)}
                    error={touched.categoryId && errors.categoryId ? errors.categoryId : undefined}
                    required
                  />
  
                  {/* Title */}
                  <Input
                    label="Title"
                    placeholder="Enter subcategory title"
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    error={touched.title && errors.title ? errors.title : undefined}
                    helperText="2-100 characters"
                    required
                  />
  
                  {/* Description */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      placeholder="Enter subcategory description (optional)"
                      value={values.description}
                      onChange={(e) => setFieldValue("description", e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-[#ffc107] ${
                        touched.description && errors.description
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    {touched.description && errors.description && (
                      <p className="text-sm text-red-600">{errors.description}</p>
                    )}
                    <p className="text-sm text-gray-500">Maximum 500 characters</p>
                  </div>
  
                  {/* Icon */}
                  <Input
                    label="Icon"
                    placeholder="Enter icon (emoji or text)"
                    value={values.icon}
                    onChange={(e) => setFieldValue("icon", e.target.value)}
                    error={touched.icon && errors.icon ? errors.icon : undefined}
                    helperText="Optional - can be emoji or text"
                  />
  
                  {/* Preview */}
                  {(values.title || values.icon) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Preview</h3>
                      <div className="flex items-center space-x-3">
                        {values.icon && <span className="text-2xl">{values.icon}</span>}
                        <div>
                          <p className="font-medium text-gray-900">{values.title || "Subcategory Title"}</p>
                          {values.description && <p className="text-sm text-gray-600">{values.description}</p>}
                          {values.categoryId && (
                            <p className="text-xs text-gray-500">
                              Category: {categories.find((c) => c._id === values.categoryId)?.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
  
                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Subcategory"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    )
  }
  