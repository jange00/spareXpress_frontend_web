import { Formik, Form, FieldArray } from "formik"
import { addOrderValidationSchema } from "../../utils/orders/validationSchema"
import { Button } from "../../UIs/orderUi/Button1"
import { Select } from "../../UIs/orderUi/Select"
import { Input } from "../../UIs/orderUi/Input"
import { XIcon, PlusIcon, TrashIcon, CheckIcon } from "../../icons/Icons"
import { sampleUsers, sampleProducts, sampleShippingAddresses, samplePayments } from "../sampleData1"

// API mutation hook
// import { useGetAllPayment } from "../../../../hook/admin/usePayment/useGetAllPayment"
import { useGetAllAdminUsers } from "../../../../hook/admin/useUsers/useGetAllAdminUsers"
// import { useGetAllShippingAddress } from "../../../../hook/admin/useShippingAddress/useGetAllShippingAddress"
import { useGetShippingByUserId } from "../../../../hook/admin/useShippingAddress/useGetShippingByUserId"
import { useGetPaymentByUserId } from "../../../../hook/admin/usePayment/useGetPaymentByUserId"
import { useGetAllProduct } from "../../../../hook/admin/useProduct/useGetAllProduct"
import { usePostOrder } from "../../../../hook/admin/useOrder/usePostOrder"
import { useState } from "react"

export const AddOrderModal = ({ onSave, onClose }) => {
  const [userid,setUserId]=useState();
  const initialValues = {
    userId: "",
    Amount: 0,
    shippingAddressId: "",
    paymentId: "",
    items: [{ productId: "", quantity: 1, total: 0 }],
  }

  // Initialize product mutation
  const { data: payments = [] } = useGetPaymentByUserId(userid);
  // console.log(payments)
  const { data: users = [] } = useGetAllAdminUsers();
  const { data: shippingAddresses = [] } = useGetShippingByUserId(userid);
  const { data: products = [] } = useGetAllProduct();
  const { mutate, isLoading: isSubmitting } = usePostOrder();
  // console.log(users)

  const userOptions = users.map((user) => ({
    value: user._id,
    label: `${user.fullname} (${user.email})`,
  }))

  const productOptions = products.map((product) => ({
    value: product._id,
    label: `${product.name} - $${product.price}`,
  }))

  // const getShippingAddressOptions = (userId) => {
  //   return sampleShippingAddresses
  //     .filter((addr) => addr.userId === userId)
  //     .map((addr) => ({
  //       value: addr._id,
  //       label: addr.address,
  //     }))
  // }

  const getShippingAddressOptions = shippingAddresses.map((addr) => ({
    value: addr._id,
    label: `${addr.streetAddress}, ${addr.city}, ${addr.province}`,
  }));

  const paymentOptions = payments.map((payment) => ({
    value: payment._id,
    label: `${payment.paymentMethod} - $${payment.amount} (${payment.paymentStatus})`,
  }))
  


  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const getProductPrice = (productId) => {
    const product = products.find((p) => p._id === productId)
    return product ? product.price : 0
  }

  const handleManualSubmit = (values) => {
    const totalAmount = calculateTotal(values.items);
  
    const formData = new FormData();
  
    // Basic order info
    // formData.append("userId", values.userId);
    formData.append("shippingAddressId", values.shippingAddressId);
    formData.append("paymentMethodId", values.paymentId);
    formData.append("Amount", totalAmount);
  
    // Append order items as JSON string
    formData.append("items", JSON.stringify(values.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      total: item.total,
    }))));
  
  
    // 🔁 Debug: Log contents
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    // Call backend mutation
    mutate(formData, {
      onSuccess: () => {
        onSave?.();
        onClose?.();
      },
      onError: (err) => {
        console.error("Order creation failed:", err);
      },
    });
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <Formik initialValues={initialValues} validationSchema={addOrderValidationSchema} onSubmit={handleManualSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
                <div className="space-y-6">
                  {/* User Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      name="userId"
                      label="Customer"
                      value={values.userId}
                      onChange={(e) => {
                        setUserId(e.target.value)
                        setFieldValue("userId", e.target.value)
                        setFieldValue("shippingAddressId", "") // Reset shipping address when user changes
                      }}
                      options={userOptions}
                      placeholder="Select a customer"
                      error={touched.userId && errors.userId ? errors.userId : undefined}
                      required
                    />

                    <Select
                      name="shippingAddressId"
                      label="Shipping Address"
                      value={values.shippingAddressId}
                      onChange={(e) => setFieldValue("shippingAddressId", e.target.value)}
                      options={getShippingAddressOptions}
                      placeholder="Select shipping address"
                      error={
                        touched.shippingAddressId && errors.shippingAddressId ? errors.shippingAddressId : undefined
                      }
                      disabled={!values.userId}
                      required
                    />
                  </div>

                  <Select
                    name="paymentId"
                    label="Payment"
                    value={values.paymentId}
                    onChange={(e) => setFieldValue("paymentId", e.target.value)}
                    options={paymentOptions}
                    placeholder="Select payment method"
                    error={touched.paymentId && errors.paymentId ? errors.paymentId : undefined}
                    required
                  />

                  {/* Order Items */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Order Items</h3>
                    <FieldArray name="items">
                      {({ push, remove }) => (
                        <div className="rounded-md border border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Product
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Unit Price
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {values.items.map((item, index) => {
                                const unitPrice = getProductPrice(item.productId)
                                return (
                                  <tr key={index}>
                                    <td className="px-6 py-4">
                                      <Select
                                        value={item.productId}
                                        onChange={(e) => {
                                          const productId = e.target.value
                                          const price = getProductPrice(productId)
                                          setFieldValue(`items.${index}.productId`, productId)
                                          setFieldValue(`items.${index}.total`, price * item.quantity)
                                        }}
                                        options={productOptions}
                                        placeholder="Select product"
                                        error={
                                          touched.items?.[index]?.productId && errors.items?.[index]
                                            ? errors.items[index]?.productId
                                            : undefined
                                        }
                                        required
                                      />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                      ${unitPrice.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                      <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                          const quantity = Number.parseInt(e.target.value) || 0
                                          const price = getProductPrice(item.productId)
                                          setFieldValue(`items.${index}.quantity`, quantity)
                                          setFieldValue(`items.${index}.total`, price * quantity)
                                        }}
                                        placeholder="1"
                                        min="1"
                                        required
                                      />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                      ${item.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        disabled={values.items.length === 1}
                                        className={`text-red-500 hover:text-red-700 ${
                                          values.items.length === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                      >
                                        <TrashIcon className="w-5 h-5" />
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan={5} className="px-6 py-3">
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => push({ productId: "", quantity: 1, total: 0 })}
                                  >
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    Add Item
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                                  Total Amount:
                                </td>
                                <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                                  ${calculateTotal(values.items).toFixed(2)}
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  <CheckIcon className="w-5 h-5 mr-1" />
                  Create Order
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
