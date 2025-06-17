// import { Formik, Form } from "formik"
// import { useState } from "react"
// import { CreditCard, DollarSign, User, Package } from "lucide-react"
// import { paymentValidationSchema } from "@/validation/paymentSchema"
// import FormField from "@/components/ui/FormField"
// import FormSelect from "@/components/ui/FormSelect"
// import FormButton from "@/components/ui/FormButton"
// import { paymentMethods, paymentStatuses } from "@/data/paymentOptions"

// export default function PaymentForm({ initialValues, onSubmit, isLoading = false, mode = "create" }) {
//   const [submitStatus, setSubmitStatus] = useState("idle")

//   const defaultValues = {
//     userId: "",
//     orderId: "",
//     amount: "",
//     paymentMethod: "",
//     paymentStatus: "Pending",
//     ...initialValues,
//   }

//   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
//     try {
//       setSubmitStatus("idle")
//       await onSubmit(values)
//       setSubmitStatus("success")
//     } catch (error) {
//       setSubmitStatus("error")
//       if (error.fieldErrors) {
//         Object.keys(error.fieldErrors).forEach((field) => {
//           setFieldError(field, error.fieldErrors[field])
//         })
//       }
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center mb-6">
//         <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
//         <h2 className="text-xl font-semibold text-gray-900">
//           {mode === "create" ? "Create New Payment" : "Edit Payment"}
//         </h2>
//       </div>

//       <Formik
//         initialValues={defaultValues}
//         validationSchema={paymentValidationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ isSubmitting, values }) => (
//           <Form className="space-y-6">
//             {/* User and Order Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 name="userId"
//                 label="User ID"
//                 type="text"
//                 placeholder="Enter user ID (ObjectId)"
//                 icon={<User className="w-5 h-5" />}
//                 required
//               />

//               <FormField
//                 name="orderId"
//                 label="Order ID"
//                 type="text"
//                 placeholder="Enter order ID (ObjectId)"
//                 icon={<Package className="w-5 h-5" />}
//                 required
//               />
//             </div>

//             {/* Payment Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 name="amount"
//                 label="Payment Amount"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 placeholder="0.00"
//                 icon={<DollarSign className="w-5 h-5" />}
//                 required
//               />

//               <FormSelect
//                 name="paymentMethod"
//                 label="Payment Method"
//                 options={paymentMethods}
//                 placeholder="Select payment method"
//                 required
//               />
//             </div>

//             {/* Payment Status */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormSelect
//                 name="paymentStatus"
//                 label="Payment Status"
//                 options={paymentStatuses}
//                 placeholder="Select payment status"
//                 required
//               />

//               <div className="flex items-end">
//                 <div className="bg-gray-50 rounded-lg p-4 w-full">
//                   <p className="text-sm text-gray-600 mb-1">Amount Preview</p>
//                   <p className="text-lg font-semibold text-gray-900">${values.amount || "0.00"}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Status Messages */}
//             {submitStatus === "success" && (
//               <div className="bg-green-50 border border-green-200 rounded-md p-4">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-green-800">
//                       Payment {mode === "create" ? "created" : "updated"} successfully!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {submitStatus === "error" && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-red-800">
//                       Failed to {mode === "create" ? "create" : "update"} payment. Please try again.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 onClick={() => window.history.back()}
//               >
//                 Cancel
//               </button>

//               <FormButton
//                 type="submit"
//                 isLoading={isSubmitting || isLoading}
//                 loadingText={mode === "create" ? "Creating..." : "Updating..."}
//                 className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 {mode === "create" ? "Create Payment" : "Update Payment"}
//               </FormButton>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }
