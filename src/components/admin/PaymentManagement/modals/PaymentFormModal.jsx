import { useState } from "react";
import { Formik, Form } from "formik";
import { X, CreditCard, User, Package } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { paymentValidationSchema } from "../../utils/payment/paymentSchemas";
import FormField from "../../UIs/paymentUi/FormField";
import FormSelect from "../../UIs/paymentUi/FormSelect";
import FormButton from "../../UIs/paymentUi/FormButton";
import { paymentMethods, paymentStatuses } from "../paymentOptions";

// API hooks
import { useGetAllAdminUsers } from "../../../../hook/admin/useUsers/useGetAllAdminUsers";
import { useGetOrdersByUserId } from "../../../../hook/admin/useOrder/useGetOrdersByUserId";
import { useGetAllOrder } from "../../../../hook/admin/useOrder/useGetAllOrder";

export default function PaymentFormModal({
  onClose,
  onSubmit,
  initialValues,
  mode = "create",
  usersLoading = false,
  ordersLoading = false,
}) {
  // Track selected userId to fetch orders
  const [selectedUserId, setSelectedUserId] = useState(initialValues?.userId || "");

  const defaultValues = {
    userId: "",
    orderId: "",
    amount: "",
    paymentMethod: "",
    paymentStatus: "Pending",
    ...initialValues,
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  // Fetch all users
  const { data: users = [], isLoading: fetchingUsers } = useGetAllAdminUsers();

  const { data: orders = [], isLoading: fetchingOrders } = useGetAllOrder();

  const userOptions = Array.isArray(users)
    ? users.map((user) => ({
        label: `${user.fullname} (${user.email})`,
        value: user._id,
      }))
    : [];

  const orderOptions = Array.isArray(orders)
    ? orders.map((order) => ({
        label: `${order._id} (${order._id})`,
        value: order._id,
      }))
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
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

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Formik
            initialValues={defaultValues}
            validationSchema={paymentValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* User & Order Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    name="userId"
                    label="Select User"
                    options={userOptions}
                    placeholder={fetchingUsers || usersLoading ? "Loading users..." : "Select a user"}
                    icon={<User className="w-5 h-5" />}
                    required
                    value={values.userId}
                    onChange={(e) => {
                      const userId = e.target.value;
                      setFieldValue("userId", userId);
                      setFieldValue("orderId", ""); // reset order when user changes
                      setSelectedUserId(userId);
                    }}
                  />

                  <FormSelect
                    name="orderId"
                    label="Select Order"
                    options={orderOptions}
                    placeholder={fetchingOrders || ordersLoading ? "Loading orders..." : "Select an order"}
                    icon={<Package className="w-5 h-5" />}
                    required
                    value={values.orderId}
                    onChange={(e) => setFieldValue("orderId", e.target.value)}
                    isDisabled={!selectedUserId}
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
                    icon={<FaRupeeSign />}
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
  );
}
