import { Formik, Form } from "formik"
import { X, CreditCard, User, Package } from "lucide-react"
import { FaRupeeSign } from 'react-icons/fa';
import { paymentValidationSchema } from "../../utils/payment/paymentSchemas"
import FormField from "../../UIs/paymentUi/FormField"
import FormSelect from "../../UIs/paymentUi/FormSelect"
import FormButton from "../../UIs/paymentUi/FormButton"
import { paymentMethods, paymentStatuses } from "../paymentOptions"

export default function PaymentFormModal({ onClose, onSubmit, initialValues, mode = "create" }) {
  const defaultValues = {
    userId: "",
    orderId: "",
    amount: "",
    paymentMethod: "",
    paymentStatus: "Pending",
    ...initialValues,
  }

  const handleSubmit = (values) => {
    onSubmit(values)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">
              {mode === "create" ? "Create New Payment" : "Edit Payment"}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Formik initialValues={defaultValues} validationSchema={paymentValidationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, values }) => (
              <Form className="space-y-6">
                {/* User and Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="userId"
                    label="User ID"
                    type="text"
                    placeholder="Enter user ID (ObjectId)"
                    icon={<User className="w-5 h-5" />}
                    required
                  />

                  <FormField
                    name="orderId"
                    label="Order ID"
                    type="text"
                    placeholder="Enter order ID (ObjectId)"
                    icon={<Package className="w-5 h-5" />}
                    required
                  />
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="amount"
                    label="Payment Amount"
                    type="number"
                    step="50"
                    min="0"
                    placeholder="0"
                    icon={<FaRupeeSign  />}
                    required
                  />

                  <FormSelect
                    name="paymentMethod"
                    label="Payment Method"
                    options={paymentMethods}
                    placeholder="Select payment method"
                    required
                  />
                </div>

                {/* Payment Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    name="paymentStatus"
                    label="Payment Status"
                    options={paymentStatuses}
                    placeholder="Select payment status"
                    required
                  />

                  <div className="flex items-end">
                    <div className="bg-gray-50 rounded-lg p-4 w-full">
                      <p className="text-sm text-gray-600 mb-1">Amount Preview</p>
                      <p className="text-lg font-semibold text-gray-900">₹{values.amount || "0"}</p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>

                  <FormButton
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={mode === "create" ? "Creating..." : "Updating..."}
                    className="px-6 py-2 bg-[#ffc107] text-black font-medium rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    {mode === "create" ? "Create Payment" : "Update Payment"}
                  </FormButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
