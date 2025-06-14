import { X, CheckCircle } from "lucide-react"

export const IssueResolutionModal = ({
  selectedDelivery,
  isViewingIssue,
  setIsViewingIssue,
  setSelectedDelivery,
  issues,
  handleResolveIssue,
  setDeliveries,
}) => {
  if (!selectedDelivery || !isViewingIssue) {
    return null
  }

  return (
    <div className="fixed inset-0 black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Resolve Delivery Issue</h2>
          <button
            onClick={() => {
              setIsViewingIssue(false)
              setSelectedDelivery(null)
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {selectedDelivery.issues && selectedDelivery.issues.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-medium text-red-700">{selectedDelivery.issues[0].type}</h3>
                <p className="text-sm mt-1">{selectedDelivery.issues[0].description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Reported on {new Date(selectedDelivery.issues[0].createdAt).toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Resolution Options</h3>

              <div className="space-y-2">
                <div className="flex items-start space-x-2 p-2 border rounded-md">
                  <input type="radio" id="contact" name="resolution" value="contact" defaultChecked className="mt-1" />
                  <div>
                    <label htmlFor="contact" className="font-medium text-gray-900">
                      Contact Customer
                    </label>
                    <p className="text-sm text-gray-500">
                      Reach out to the customer to gather more information and resolve the issue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-2 border rounded-md">
                  <input type="radio" id="refund" name="resolution" value="refund" className="mt-1" />
                  <div>
                    <label htmlFor="refund" className="font-medium text-gray-900">
                      Issue Refund
                    </label>
                    <p className="text-sm text-gray-500">Process a full or partial refund for the order.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-2 border rounded-md">
                  <input type="radio" id="resend" name="resolution" value="resend" className="mt-1" />
                  <div>
                    <label htmlFor="resend" className="font-medium text-gray-900">
                      Resend Package
                    </label>
                    <p className="text-sm text-gray-500">Send a replacement package to the customer.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label htmlFor="resolution-notes" className="block text-sm font-medium text-gray-700">
                  Resolution Notes
                </label>
                <textarea
                  id="resolution-notes"
                  placeholder="Enter details about how the issue was resolved..."
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={() => {
              setIsViewingIssue(false)
              setSelectedDelivery(null)
            }}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedDelivery.issues && selectedDelivery.issues.length > 0) {
                // Find the corresponding issue in the issues array
                const issueId = selectedDelivery.issues[0].id
                const matchingIssue = issues.find((i) => i.id === issueId)

                if (matchingIssue) {
                  handleResolveIssue(matchingIssue.id)
                }

                // Also update the issue in the delivery object
                setDeliveries((prev) =>
                  prev.map((d) =>
                    d.id === selectedDelivery.id
                      ? {
                          ...d,
                          issues: d.issues?.map((i) => ({ ...i, status: "resolved" })),
                        }
                      : d,
                  ),
                )
              }

              setIsViewingIssue(false)
              setSelectedDelivery(null)
            }}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 flex items-center"
          >
            <CheckCircle className="h-5 w-5 mr-1" />
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  )
}
