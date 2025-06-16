import { MapPin, Eye, MoreHorizontal, UserPlus, Truck, AlertTriangle } from "lucide-react"
import { useState } from "react"

export const DeliveriesTable = ({
  filteredDeliveries,
  getAgentById,
  setSelectedDelivery,
  setIsAssigningAgent,
  formatDate,
  getStatusBadge,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null)

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (openDropdown && !e.target.closest(`#actionDropdown-${openDropdown}`)) {
      document.getElementById(`actionDropdown-${openDropdown}`).classList.add("hidden")
      setOpenDropdown(null)
    }
  }

  // Add event listener when a dropdown is open
  if (openDropdown) {
    document.addEventListener("click", handleClickOutside)
  }

  const toggleDropdown = (deliveryId) => {
    // Close any open dropdown
    if (openDropdown && openDropdown !== deliveryId) {
      document.getElementById(`actionDropdown-${openDropdown}`).classList.add("hidden")
    }

    // Toggle the clicked dropdown
    const dropdown = document.getElementById(`actionDropdown-${deliveryId}`)
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden")
      setOpenDropdown(deliveryId)
    } else {
      dropdown.classList.add("hidden")
      setOpenDropdown(null)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delivery Agent
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estimated Delivery
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery) => {
                const agent = getAgentById(delivery.deliveryAgentId)
                return (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{delivery.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{delivery.customerName}</div>
                      <div className="text-xs text-gray-500">{delivery.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-900">
                          {delivery.address}, {delivery.city}, {delivery.state} {delivery.zipCode}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent ? (
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full mr-2"
                            src={agent.avatar || "/placeholder.svg"}
                            alt={agent.name}
                          />
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        </div>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(delivery.estimatedDelivery)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(delivery.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedDelivery(delivery)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(delivery.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          <div
                            id={`actionDropdown-${delivery.id}`}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                          >
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setSelectedDelivery(delivery)
                                  toggleDropdown(delivery.id)
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4 inline mr-2" />
                                View Details
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDelivery(delivery)
                                  setIsAssigningAgent(true)
                                  toggleDropdown(delivery.id)
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <UserPlus className="w-4 h-4 inline mr-2" />
                                Assign Agent
                              </button>
                              <button
                                onClick={() => {
                                  alert(`Tracking delivery ${delivery.orderId}. This would open a tracking view.`)
                                  toggleDropdown(delivery.id)
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Truck className="w-4 h-4 inline mr-2" />
                                Track Delivery
                              </button>
                              <hr className="my-1 border-gray-200" />
                              <button
                                onClick={() => {
                                  // Create a new issue for this delivery
                                  alert(
                                    `Reporting issue for delivery ${delivery.orderId}. This would open an issue form.`,
                                  )
                                  toggleDropdown(delivery.id)
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <AlertTriangle className="w-4 h-4 inline mr-2" />
                                Report Issue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No deliveries found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
