import { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import { productValidationSchema } from "../utils/product/validationSchema";
import {
  mockCategories,
  mockBrands,
  mockSpecifications,
  getSubcategoriesByCategory,
} from "./mockData";
import Button from "../UIs/productUI/Button";
import Input from "../UIs/productUI/Input";
import Textarea from "../UIs/productUI/TextArea";
import Dropdown from "../UIs/productUI/Dropdown";
import { Card, CardHeader, CardTitle, CardContent } from "../UIs/productUI/Card";
import { PlusIcon, XIcon } from "../icons/Icons";

const ProductForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [subcategories, setSubcategories] = useState([]);
  

  // Default form values
  const defaultValues = {
    name: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    price: "",
    image: [""],
    description: "",
    stock: "",
    shippingCharge: "",
    discount: "",
    specificationsId: "",
    ...initialValues,
  };

  const handleCategoryChange = (categoryId, setFieldValue) => {
    console.log(categoryId);
    setFieldValue("categoryId", categoryId);
    setFieldValue("subCategoryId", ""); 

    if (categoryId) {
      const categorySubcategories = getSubcategoriesByCategory(categoryId);
      setSubcategories(categorySubcategories);
    } else {
      setSubcategories([]);
    }
  };

  // Initialize subcategories if editing
  useEffect(() => {
    if (initialValues?.categoryId) {
      const categorySubcategories = getSubcategoriesByCategory(
        initialValues.categoryId
      );
      setSubcategories(categorySubcategories);
    }
  }, [initialValues]);

  const categoryOptions = mockCategories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const subcategoryOptions = subcategories.map((subcat) => ({
    value: subcat._id,
    label: subcat.name,
  }));

  const brandOptions = mockBrands.map((brand) => ({
    value: brand._id,
    label: brand.name,
  }));

  const specificationOptions = [
    { value: "", label: "No Specifications" },
    ...mockSpecifications.map((spec) => ({
      value: spec._id,
      label: spec.name,
    })),
  ];

  return (
    <div className="p-6">
      <Formik
        initialValues={defaultValues}
        validationSchema={productValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="space-y-8">
            {/* Basic Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Product Name"
                    name="name"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    error={touched.name && errors.name}
                    required
                    placeholder="Enter product name"
                  />

                  <Input
                    label="Price"
                    name="price"
                    type="number"
                    step="50"
                    min="0"
                    value={values.price}
                    onChange={(e) => setFieldValue("price", e.target.value)}
                    error={touched.price && errors.price}
                    required
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category & Brand Selection Card */}
            <Card>
              <CardHeader>
                <CardTitle>Category & Brand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={categoryOptions}
                      value={values.categoryId}
                      onChange={(value) =>
                        handleCategoryChange(value, setFieldValue)
                      }
                      placeholder="Select Category"
                      error={touched.categoryId && errors.categoryId}
                    />
                    {touched.categoryId && errors.categoryId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.categoryId}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={subcategoryOptions}
                      value={values.subCategoryId}
                      onChange={(value) =>
                        setFieldValue("subCategoryId", value)
                      }
                      placeholder="Select Subcategory"
                      disabled={!values.categoryId}
                      error={touched.subCategoryId && errors.subCategoryId}
                    />
                    {touched.subCategoryId && errors.subCategoryId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.subCategoryId}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={brandOptions}
                      value={values.brandId}
                      onChange={(value) => setFieldValue("brandId", value)}
                      placeholder="Select Brand"
                      error={touched.brandId && errors.brandId}
                    />
                    {touched.brandId && errors.brandId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.brandId}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory & Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    min="0"
                    value={values.stock}
                    onChange={(e) => setFieldValue("stock", e.target.value)}
                    error={touched.stock && errors.stock}
                    required
                    placeholder="0"
                  />

                  <Input
                    label="Shipping Charge"
                    name="shippingCharge"
                    type="number"
                    step="10"
                    min="0"
                    value={values.shippingCharge}
                    onChange={(e) =>
                      setFieldValue("shippingCharge", e.target.value)
                    }
                    error={touched.shippingCharge && errors.shippingCharge}
                    required
                    placeholder="0"
                  />

                  <Input
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={values.discount}
                    onChange={(e) => setFieldValue("discount", e.target.value)}
                    error={touched.discount && errors.discount}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  error={touched.description && errors.description}
                  rows={4}
                  placeholder="Enter product description..."
                />

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={(fileInputRef) =>
                      (window.imageUploadRef = fileInputRef)
                    }
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const imageUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setFieldValue("image", [...values.image, ...imageUrls]);
                      e.target.value = ""; 
                    }}
                    className="hidden"
                  />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {values.image.map((imgUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imgUrl}
                          alt={`Product ${index}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = values.image.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("image", newImages);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Plus Button */}
                    <button
                      type="button"
                      onClick={() =>
                        window.imageUploadRef && window.imageUploadRef.click()
                      }
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded hover:border-gray-500 transition"
                    >
                      <PlusIcon className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>

                  {touched.image && errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                  )}
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specifications
                  </label>
                  <Dropdown
                    options={specificationOptions}
                    value={values.specificationsId}
                    onChange={(value) =>
                      setFieldValue("specificationsId", value)
                    }
                    placeholder="Select Specifications (Optional)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting || isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
