import { AlertTriangle, CheckCircle } from "lucide-react"
import Badge from "./ui/badge"

export const IssuesSection = ({ issues, deliveries, setSelectedDelivery, setIsViewingIssue }) => {
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Delivery Issues & Complaints</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Recent customer complaints and delivery issues that need attention
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {issues.filter((issue) => issue.status !== "resolved").length > 0 ? (
              issues
                .filter((issue) => issue.status !== "resolved")
                .map((issue) => (
                  <div key={issue.id} className="flex items-start p-3 border rounded-md">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                        issue.priority === "high"
                          ? "bg-red-500"
                          : issue.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{issue.type}</h4>
                        <Badge color={issue.status === "in_progress" ? "blue" : "yellow"}>
                          {issue.status === "open" ? "Open" : "In Progress"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Order {issue.orderId} • {issue.customerName}
                      </p>
                      <p className="text-sm mt-1">{issue.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Reported {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200"
                          onClick={() => {
                            const delivery = deliveries.find((d) => d.id === issue.deliveryId)
                            if (delivery) {
                              setSelectedDelivery(delivery)
                              setIsViewingIssue(true)
                            }
                          }}
                        >
                          Resolve Issue
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium">All Clear!</h3>
                <p className="text-gray-500">No open issues or complaints at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Resolved Issues</h3>
          <p className="mt-1 text-sm text-gray-500">Recently resolved delivery issues and complaints</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {issues
              .filter((issue) => issue.status === "resolved")
              .map((issue) => (
                <div key={issue.id} className="flex items-start p-3 border rounded-md">
                  <div className="h-2 w-2 rounded-full mt-2 mr-3 bg-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{issue.type}</h4>
                      <Badge color="green">Resolved</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Order {issue.orderId} • {issue.customerName}
                    </p>
                    <p className="text-sm mt-1">{issue.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        Resolved {new Date(issue.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {issues.filter((issue) => issue.status === "resolved").length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No resolved issues to display.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
