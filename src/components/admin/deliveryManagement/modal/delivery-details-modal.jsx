import { useState } from "react"
import { X, Printer, Download, UserPlus } from "lucide-react"

export const DeliveryDetailsModal = ({
  selectedDelivery,
  setSelectedDelivery,
  isAssigningAgent,
  isViewingIssue,
  setIsAssigningAgent,
  getAgentById,
  formatDate,
  getStatusBadge,
}) => {
  const [activeTab, setActiveTab] = useState("details")

  if (!selectedDelivery || isAssigningAgent || isViewingIssue) {
    return null
  }

  const agent = selectedDelivery.deliveryAgentId ? getAgentById(selectedDelivery.deliveryAgentId) : null

  return (
    <div className="fixed inset-0 black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Delivery Details: {selectedDelivery.orderId}</h2>
          <button onClick={() => setSelectedDelivery(null)} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("details")}
          >
            Delivery Details
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "customer" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("customer")}
          >
            Customer Information
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "tracking" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("tracking")}
          >
            Tracking History
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <div>{getStatusBadge(selectedDelivery.status)}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tracking Number:</span>
                    <span className="font-medium">{selectedDelivery.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Delivery:</span>
                    <span>{formatDate(selectedDelivery.estimatedDelivery)}</span>
                  </div>
                  {selectedDelivery.actualDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Actual Delivery:</span>
                      <span>{formatDate(selectedDelivery.actualDelivery)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span>{formatDate(selectedDelivery.createdAt)}</span>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-700 mt-4 mb-2">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items:</span>
                    <span>{selectedDelivery.items} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order Value:</span>
                    <span>${selectedDelivery.orderValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Fee:</span>
                    <span>${selectedDelivery.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${(selectedDelivery.orderValue + selectedDelivery.deliveryFee).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>{selectedDelivery.address}</p>
                  <p>
                    {selectedDelivery.city}, {selectedDelivery.state} {selectedDelivery.zipCode}
                  </p>
                </div>

                <h3 className="text-sm font-medium text-gray-700 mt-4 mb-2">Delivery Agent</h3>
                {agent ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full mr-3"
                        src={agent.avatar || "/placeholder.svg"}
                        alt={agent.name}
                      />
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.phone}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-gray-500 mr-2">Rating:</span>
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <span className="ml-1">{agent.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-500">No agent assigned</p>
                    <button
                      className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                      onClick={() => setIsAssigningAgent(true)}
                    >
                      Assign Agent
                    </button>
                  </div>
                )}

                {selectedDelivery.issues && selectedDelivery.issues.length > 0 && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mt-4 mb-2">Reported Issues</h3>
                    <div className="space-y-2">
                      {selectedDelivery.issues.map((issue) => (
                        <div key={issue.id} className="bg-red-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-red-700">{issue.type}</p>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${issue.status === "open" ? "bg-red-100 text-red-800 border border-red-200" : "bg-green-100 text-green-800 border border-green-200"}`}
                            >
                              {issue.status === "open" ? "Open" : "Resolved"}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{issue.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Reported on {new Date(issue.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name: </span>
                    <span className="font-medium">{selectedDelivery.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email: </span>
                    <span>{selectedDelivery.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone: </span>
                    <span>{selectedDelivery.customerPhone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Order History</h3>
                <p className="text-gray-500 text-sm">This would display the customer's order history.</p>
              </div>
            </div>
          )}

          {activeTab === "tracking" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Timeline</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="rounded-full h-8 w-8 bg-green-500 text-white flex items-center justify-center">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="h-full border-l border-gray-300 mx-auto my-2"></div>
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-gray-500">{formatDate(selectedDelivery.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`rounded-full h-8 w-8 ${selectedDelivery.status !== "pending" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"} flex items-center justify-center`}
                      >
                        {selectedDelivery.status !== "pending" ? (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          "2"
                        )}
                      </div>
                      <div className="h-full border-l border-gray-300 mx-auto my-2"></div>
                    </div>
                    <div>
                      <p className="font-medium">Processing</p>
                      <p className="text-sm text-gray-500">
                        {selectedDelivery.status !== "pending" ? formatDate(selectedDelivery.updatedAt) : "Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`rounded-full h-8 w-8 ${selectedDelivery.status === "out_for_delivery" || selectedDelivery.status === "delivered" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"} flex items-center justify-center`}
                      >
                        {selectedDelivery.status === "out_for_delivery" || selectedDelivery.status === "delivered" ? (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          "3"
                        )}
                      </div>
                      <div className="h-full border-l border-gray-300 mx-auto my-2"></div>
                    </div>
                    <div>
                      <p className="font-medium">Out for Delivery</p>
                      <p className="text-sm text-gray-500">
                        {selectedDelivery.status === "out_for_delivery" || selectedDelivery.status === "delivered"
                          ? "In progress"
                          : "Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`rounded-full h-8 w-8 ${selectedDelivery.status === "delivered" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"} flex items-center justify-center`}
                      >
                        {selectedDelivery.status === "delivered" ? (
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          "4"
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-gray-500">
                        {selectedDelivery.status === "delivered"
                          ? formatDate(selectedDelivery.actualDelivery)
                          : `Expected by ${formatDate(selectedDelivery.estimatedDelivery)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 px-6 py-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 flex items-center">
              <Printer className="h-5 w-5 mr-1" />
              Print Label
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 flex items-center">
              <Download className="h-5 w-5 mr-1" />
              Export
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDelivery(null)}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={() => setIsAssigningAgent(true)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
            >
              <UserPlus className="h-5 w-5 mr-1" />
              {selectedDelivery.deliveryAgentId ? "Reassign Agent" : "Assign Agent"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
