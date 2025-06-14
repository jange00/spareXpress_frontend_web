import { Package, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react"

export const DeliveryMetrics = ({ deliveries, agents }) => {
  const totalDeliveries = deliveries.length
  const pendingDeliveries = deliveries.filter((d) => d.status === "pending").length
  const completedDeliveries = deliveries.filter((d) => d.status === "delivered").length
  const delayedDeliveries = deliveries.filter((d) => d.status === "delayed").length
  const activeAgents = agents.filter((a) => a.available).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-2">Total Deliveries</div>
        <div className="flex items-center">
          <Package className="h-5 w-5 text-blue-500 mr-2" />
          <div className="text-2xl font-bold">{totalDeliveries}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-2">Pending Deliveries</div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-yellow-500 mr-2" />
          <div className="text-2xl font-bold">{pendingDeliveries}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-2">Completed Deliveries</div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <div className="text-2xl font-bold">{completedDeliveries}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-2">Delayed Deliveries</div>
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <div className="text-2xl font-bold">{delayedDeliveries}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-medium text-gray-500 mb-2">Active Delivery Agents</div>
        <div className="flex items-center">
          <Users className="h-5 w-5 text-purple-500 mr-2" />
          <div className="text-2xl font-bold">{activeAgents}</div>
        </div>
      </div>
    </div>
  )
}
