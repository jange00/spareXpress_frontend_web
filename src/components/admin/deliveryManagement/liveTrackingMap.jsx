import { MapPin, Map, RefreshCw, Star, UserPlus } from "lucide-react"
import Badge from "./ui/badge"

export const LiveTrackingMap = ({ deliveries, agents, setIsAddingAgent }) => {
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Live Delivery Tracking</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Real-time location of delivery agents and packages currently out for delivery
          </p>
        </div>
        <div className="p-0">
          <div className="h-[400px] relative bg-gray-100">
            {/* This would be replaced with an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Map would be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">
                  {deliveries.filter((d) => d.status === "out_for_delivery").length} deliveries in progress
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {deliveries.filter((d) => d.status === "out_for_delivery").length} deliveries in progress
          </div>
          <button className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 flex items-center">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh Map
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Active Delivery Agents</h3>
            <p className="mt-1 text-sm text-gray-500">Current location and status of delivery agents on duty</p>
          </div>
          <button
            onClick={() => setIsAddingAgent(true)}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex items-center"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Add Agent
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {agents
              .filter((agent) => agent.available)
              .map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 border rounded-md">
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
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="text-sm">{agent.activeDeliveries} active deliveries</p>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span>{agent.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <Badge color="green">Active</Badge>
                  </div>
                </div>
              ))}

            {agents.filter((agent) => agent.available).length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No active agents available.</p>
                <button
                  onClick={() => setIsAddingAgent(true)}
                  className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex items-center mx-auto"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Agent
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
