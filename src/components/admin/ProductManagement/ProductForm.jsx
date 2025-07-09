import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { productValidationSchema } from "../utils/product/validationSchema";
// import {
//   mockCategories,
//   mockBrands,
//   mockSpecifications,
//   getSubcategoriesByCategory,
// } from "./mockData";
import Button from "../UIs/productUI/Button";
import Input from "../UIs/productUI/Input";
import Textarea from "../UIs/productUI/TextArea";
import Dropdown from "../UIs/productUI/Dropdown";
import { Card, CardHeader, CardTitle, CardContent } from "../UIs/productUI/Card";
import { PlusIcon, XIcon } from "../icons/Icons";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API mutation hook
import { usePostProduct } from "../../../hook/admin/useProduct/usePostProduct";
import { useGetAllCategory } from "../../../hook/admin/useCategory/useGetAllCategory";
import { useGetAllBrand } from "../../../hook/admin/useBrands/useGetAllBrand";
import { useGetAllSubCategory } from "../../../hook/admin/useSubCategory/useGetAllSubCategory";
import { useUpdateProduct } from "../../../hook/admin/useProduct/useUpdateProduct";

const ProductForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  // Initialize product mutation
  const { mutate, isLoading: isSubmitting } = usePostProduct();
  const { data: categories = [] } = useGetAllCategory();
  const { data: brands = [] } = useGetAllBrand();
  const { data: subcategories = [] } = useGetAllSubCategory();

  // Default form values
  const defaultValues = {
    name: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    price: "",
    image: [],
    description: "",
    stock: "",
    shippingCharge: "",
    discount: "",
    ...initialValues,
  };

  const handleManualSubmit = (values) => {
    console.log("Raw Formik Values:", values);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("categoryId", values.categoryId);
    formData.append("subCategoryId", values.subCategoryId);
    formData.append("brandId", values.brandId);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("shippingCharge", values.shippingCharge);
    formData.append("discount", values.discount);

    values.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img);
      }
    });

    // Log FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Call mutation with proper onSuccess/onError and delay modal close
    mutate(formData, {
      onSuccess: () => {
        toast.success("Product added successfully!");
        setTimeout(() => {
          onCancel();
        }, 1500);
      },
      onError: () => {
        toast.error("Failed to add product.");
      },
    });
  };

  // Prepare category options (all categories, no filter needed here)
  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.title,
  }));

  return (
    <div className="p-6">
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        theme="dark"
        transition={Flip}
        autoClose={3000}
      />
      <Formik
        initialValues={defaultValues}
        validationSchema={productValidationSchema}
        onSubmit={(values) => handleManualSubmit(values)}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          // <-- CHANGED: Filter subcategories based on selected category
          const filteredSubcategoryOptions = subcategories
            .filter((sub) => {
              const catId =
                typeof sub.categoryId === "object"
                  ? sub.categoryId._id
                  : sub.categoryId;
              return catId === values.categoryId;
            })
            .map((sub) => ({
              value: sub._id,
              label: sub.title,
            }));

          // <-- CHANGED: Filter brands based on selected subcategory
          const filteredBrandOptions = brands
            .filter((brand) => {
              const subId =
                typeof brand.subcategoryId === "object"
                  ? brand.subcategoryId._id
                  : brand.subcategoryId;
              return subId === values.subCategoryId;
            })
            .map((brand) => ({
              value: brand._id,
              label: brand.title,
            }));

          return (
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
                        onChange={(value) => {
                          setFieldValue("categoryId", value);
                          setFieldValue("subCategoryId", ""); // Reset subcategory on category change
                          setFieldValue("brandId", ""); // Reset brand too
                        }}
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
                        options={filteredSubcategoryOptions} // <-- CHANGED: filtered options
                        value={values.subCategoryId}
                        onChange={(value) => {
                          setFieldValue("subCategoryId", value);
                          setFieldValue("brandId", ""); // Reset brand when subcategory changes
                        }}
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
                        options={filteredBrandOptions} // <-- CHANGED: filtered options
                        value={values.brandId}
                        onChange={(value) => setFieldValue("brandId", value)}
                        placeholder="Select Brand"
                        disabled={!values.subCategoryId}
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
                      ref={(fileInputRef) => (window.imageUploadRef = fileInputRef)}
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setFieldValue("image", [...values.image, ...files]);
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
                <Button
                  onClick={() => handleManualSubmit(values)}
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProductForm;
