import { useState, useMemo, useCallback } from "react"
import { Formik, Form } from "formik"
import { Button } from "../UIs/addBrandUi/Button"
import { Input } from "../UIs/addBrandUi/Input"
import { Select } from "../UIs/addBrandUi/Select"
import { brandValidationSchema } from "../utils/addBrand/brandValidation"
import { X } from "lucide-react"

import { useGetAllCategory } from "../../../hook/admin/useCategory/useGetAllCategory"
import { useGetAllSubCategory } from "../../../hook/admin/useSubCategory/useGetAllSubCategory"


export const EditBrandModal = ({ brand, onSave, onClose }) => {
  const { data: categories = [] } = useGetAllCategory();
  const { data: subCategories = [] } = useGetAllSubCategory();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = {
    title: brand.title,
    count: brand.count.toString(),
    model: brand.model || "",
    categoryId: typeof brand.categoryId === "object" ? brand.categoryId._id : brand.categoryId,
    subcategoryId: typeof brand.subcategoryId === "object" ? brand.subcategoryId._id : brand.subcategoryId,
  }

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: `${category.title}`,
  }))

  const handleSubmit = async (values) => {
    setIsSubmitting(true)

    try {
      const updatedData = {
        ...brand,
        title: values.title.trim(),
        count: Number.parseInt(values.count),
        model: values.model.trim() || undefined,
        categoryId: values.categoryId,
        subcategoryId: values.subcategoryId,
        updatedAt: new Date().toISOString(),
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSave(updatedData)
    } catch (error) {
      console.error("Error updating brand:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Brand</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Formik initialValues={initialValues} validationSchema={brandValidationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, setFieldValue }) => {
              // Filter subcategories based on selected category
            const availableSubcategories = useMemo(() => {
                if (!values.categoryId) return []
              
                return subCategories
                  .filter((sub) => {
                    const subCatCategoryId =
                      typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId
                    return subCatCategoryId === values.categoryId
                  })
                  .map((sub) => ({
                    value: sub._id,
                    label: `${sub.icon || ""} ${sub.title}`,
                  }))
              }, [values.categoryId, subCategories])
            //   console.log("subCategories sample:", subCategories[0])
            //   console.log("Filtered subs", subCategories.filter((sub) => sub.categoryId === values.categoryId))


            const handleCategoryChange = useCallback(
                (e) => {
                  const newCategoryId = e.target.value
                  setFieldValue("categoryId", newCategoryId)
                  const newCategorySubcategories = subCategories.filter(
                    (sub) => sub.categoryId === newCategoryId
                  )
                  if (!newCategorySubcategories.find((sub) => sub._id === values.subcategoryId)) {
                    setFieldValue("subcategoryId", "")
                  }
                },
                [setFieldValue, values.subcategoryId, subCategories]
              )

              return (
                <Form className="space-y-6">
                  {/* Brand Title */}
                  <Input
                    label="Brand Title"
                    placeholder="Enter brand title"
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    error={touched.title && errors.title ? errors.title : undefined}
                    helperText="Must be unique, 2-100 characters"
                    required
                  />

                  {/* Count */}
                  <Input
                    label="Count"
                    type="number"
                    min="0"
                    placeholder="Enter count"
                    value={values.count}
                    onChange={(e) => setFieldValue("count", e.target.value)}
                    error={touched.count && errors.count ? errors.count : undefined}
                    helperText="Number of items for this brand"
                    required
                  />

                  {/* Model */}
                  <Input
                    label="Model"
                    placeholder="Enter model (optional)"
                    value={values.model}
                    onChange={(e) => setFieldValue("model", e.target.value)}
                    error={touched.model && errors.model ? errors.model : undefined}
                    helperText="Optional model information"
                  />

                  {/* Category Selection */}
                  <Select
                    label="Category"
                    options={categoryOptions}
                    placeholder="Select a category"
                    value={values.categoryId}
                    onChange={handleCategoryChange}
                    error={touched.categoryId && errors.categoryId ? errors.categoryId : undefined}
                    required
                  />

                  {/* Subcategory Selection */}
                  <Select
                    label="Subcategory"
                    options={availableSubcategories}
                    placeholder="Select a subcategory"
                    value={values.subcategoryId}
                    onChange={(e) => setFieldValue("subcategoryId", e.target.value)}
                    error={touched.subcategoryId && errors.subcategoryId ? errors.subcategoryId : undefined}
                    disabled={!values.categoryId}
                    required
                  />

                  {/* Preview */}
                  {values.title && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Preview</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">{values.title}</span>
                          <span className="text-sm text-gray-600">Count: {values.count || 0}</span>
                        </div>
                        {values.model && <p className="text-sm text-gray-600">Model: {values.model}</p>}
                        {values.categoryId && (
                          <p className="text-xs text-gray-500">
                            Category: {categories.find((c) => c._id === values.categoryId)?.title}
                          </p>
                        )}
                        {values.subcategoryId && (
                          <p className="text-xs text-gray-500">
                            Subcategory: {subCategories.find((s) => s._id === values.subcategoryId)?.title}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Brand"}
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}
