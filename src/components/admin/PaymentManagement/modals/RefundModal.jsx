import { useState } from "react"
import { Formik, Form } from "formik"
import { X, AlertTriangle } from "lucide-react"
import { refundValidationSchema } from "../../utils/payment/paymentSchemas"
import { formatCurrency } from "../../utils/payment/formatters"
import FormField from "../../UIs/paymentUi/FormField"
import FormButton from "../../UIs/paymentUi/FormButton"

export default function RefundModal({ transaction, onClose, onRefund }) {
  const [refundType, setRefundType] = useState("full")

  const initialValues = {
    refundAmount: transaction.amount,
    refundReason: "",
  }

  const handleSubmit = (values) => {
    onRefund(transaction.id, values.refundAmount, values.refundReason)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Process Refund</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={refundValidationSchema(transaction.amount)}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Transaction Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium">{transaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Amount:</span>
                      <span className="font-medium">{formatCurrency(transaction.amount)}</span>
                    </div>
                  </div>

                  {/* Refund Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Refund Type</label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="full-refund"
                          name="refund-type"
                          checked={refundType === "full"}
                          onChange={() => {
                            setRefundType("full")
                            setFieldValue("refundAmount", transaction.amount)
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="full-refund" className="ml-2 text-sm text-gray-700">
                          Full Refund
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="partial-refund"
                          name="refund-type"
                          checked={refundType === "partial"}
                          onChange={() => {
                            setRefundType("partial")
                            setFieldValue("refundAmount", 0)
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="partial-refund" className="ml-2 text-sm text-gray-700">
                          Partial Refund
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Refund Amount */}
                  <FormField
                    name="refundAmount"
                    label="Refund Amount"
                    type="number"
                    step="0.01"
                    min="0"
                    max={transaction.amount}
                    placeholder="0.00"
                    required
                  />

                  {/* Refund Reason */}
                  <FormField
                    name="refundReason"
                    label="Reason for Refund"
                    type="textarea"
                    rows={3}
                    placeholder="Please provide a reason for this refund"
                    required
                  />

                  {/* Warning */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          This action cannot be undone. The customer will be refunded{" "}
                          {formatCurrency(values.refundAmount)}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <FormButton
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Process Refund
                </FormButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
