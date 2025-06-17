// import { Formik, Form } from "formik"
// import { Search, Filter, Calendar, X } from "lucide-react"
// import { paymentSearchValidationSchema } from "../../utils/payment/paymentSchemas"
// import FormField from "../../UIs/paymentUi/FormField"
// import FormSelect from "../../UIs/paymentUi/FormSelect"
// import FormButton from "../../UIs/paymentUi/FormButton"
// import { paymentMethods, paymentStatuses } from "../paymentOptions"

// export default function PaymentSearchForm({ onSearch, onReset, isLoading = false }) {
//   const initialValues = {
//     searchTerm: "",
//     paymentMethod: "",
//     paymentStatus: "",
//     amountMin: "",
//     amountMax: "",
//     dateFrom: "",
//     dateTo: "",
//     userId: "",
//     orderId: "",
//   }

//   const handleSubmit = (values) => {
//     const filters = Object.keys(values).reduce((acc, key) => {
//       if (values[key] !== "" && values[key] !== null && values[key] !== undefined) {
//         acc[key] = values[key]
//       }
//       return acc
//     }, {})

//     onSearch(filters)
//   }

//   const handleReset = (resetForm) => {
//     resetForm()
//     onReset()
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//       <div className="flex items-center mb-6">
//         <Search className="w-6 h-6 text-blue-600 mr-3" />
//         <h2 className="text-xl font-semibold text-gray-900">Search & Filter Payments</h2>
//       </div>

//       <Formik initialValues={initialValues} validationSchema={paymentSearchValidationSchema} onSubmit={handleSubmit}>
//         {({ resetForm }) => (
//           <Form className="space-y-6">
//             {/* General Search */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <FormField
//                 name="searchTerm"
//                 label="General Search"
//                 type="text"
//                 placeholder="Search by ID, user, order..."
//                 icon={<Search className="w-5 h-5" />}
//               />

//               <FormField name="userId" label="User ID" type="text" placeholder="Filter by user ID" />

//               <FormField name="orderId" label="Order ID" type="text" placeholder="Filter by order ID" />
//             </div>

//             {/* Payment Filters */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormSelect
//                 name="paymentMethod"
//                 label="Payment Method"
//                 options={[{ value: "", label: "All Methods" }, ...paymentMethods]}
//                 placeholder="Select payment method"
//               />

//               <FormSelect
//                 name="paymentStatus"
//                 label="Payment Status"
//                 options={[{ value: "", label: "All Statuses" }, ...paymentStatuses]}
//                 placeholder="Select payment status"
//               />
//             </div>

//             {/* Amount Range */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField name="amountMin" label="Minimum Amount" type="number" step="0.01" min="0" placeholder="0.00" />

//               <FormField name="amountMax" label="Maximum Amount" type="number" step="0.01" min="0" placeholder="0.00" />
//             </div>

//             {/* Date Range */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField name="dateFrom" label="Date From" type="date" icon={<Calendar className="w-5 h-5" />} />

//               <FormField name="dateTo" label="Date To" type="date" icon={<Calendar className="w-5 h-5" />} />
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-between items-center pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => handleReset(resetForm)}
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <X className="w-4 h-4 mr-2" />
//                 Clear Filters
//               </button>

//               <div className="flex space-x-4">
//                 <FormButton
//                   type="submit"
//                   isLoading={isLoading}
//                   loadingText="Searching..."
//                   className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   <Filter className="w-4 h-4 mr-2" />
//                   Apply Filters
//                 </FormButton>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }
