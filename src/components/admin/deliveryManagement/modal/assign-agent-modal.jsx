import { X, Truck, Star } from "lucide-react"

export const AssignAgentModal = ({
  selectedDelivery,
  isAssigningAgent,
  setIsAssigningAgent,
  setSelectedDelivery,
  isViewingIssue,
  agents,
  handleAssignAgent,
}) => {
  if (!selectedDelivery || !isAssigningAgent) {
    return null
  }

  return (
    <div className="fixed inset-0 black/50 backdrop-blur-md bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Assign Delivery Agent</h2>
          <button
            onClick={() => {
              setIsAssigningAgent(false)
              if (!isViewingIssue) setSelectedDelivery(null)
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm">
                <span className="font-medium">Delivery Address:</span> {selectedDelivery.address},{" "}
                {selectedDelivery.city}, {selectedDelivery.state} {selectedDelivery.zipCode}
              </p>
            </div>

            <div className="space-y-2">
              {agents
                .filter((agent) => agent.available)
                .map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-3 border rounded-md cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors ${
                      selectedDelivery.deliveryAgentId === agent.id ? "border-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => handleAssignAgent(selectedDelivery.id, agent.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={agent.avatar || "/placeholder.svg"}
                          alt={agent.name}
                        />
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span>{agent.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p>{agent.activeDeliveries} active deliveries</p>
                        <p className="text-green-600">{agent.completedToday} completed today</p>
                      </div>
                    </div>
                  </div>
                ))}

              {agents.filter((agent) => agent.available).length === 0 && (
                <div className="p-6 text-center border rounded-md bg-gray-50">
                  <svg
                    className="h-10 w-10 text-gray-400 mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h3 className="font-medium">No Available Agents</h3>
                  <p className="text-sm text-gray-500 mt-1">All delivery agents are currently busy or offline.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={() => {
              setIsAssigningAgent(false)
              if (!isViewingIssue) setSelectedDelivery(null)
            }}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Auto-assign to first available agent for demo purposes
              const availableAgents = agents.filter((agent) => agent.available)
              if (availableAgents.length > 0) {
                handleAssignAgent(selectedDelivery.id, availableAgents[0].id)
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
          >
            <Truck className="h-5 w-5 mr-1" />
            Auto-Assign
          </button>
        </div>
      </div>
    </div>
  )
}
