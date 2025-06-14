import { useState } from "react"
import { UserPlus, Search, Star, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

export const AgentsSection = ({
  agents,
  setIsAddingAgent,
  handleToggleAgentAvailability,
  setSelectedAgent,
  setIsEditingAgent,
  setIsConfirmingDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  // Filter agents based on search and availability
  const filteredAgents = agents.filter((agent) => {
    // Apply search filter
    const matchesSearch = searchQuery
      ? agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.phone.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    // Apply availability filter
    const matchesAvailability =
      availabilityFilter === "all" ? true : availabilityFilter === "available" ? agent.available : !agent.available

    return matchesSearch && matchesAvailability
  })

  return (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              placeholder="Search agents by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Agents</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <button
            onClick={() => setIsAddingAgent(true)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
          >
            <UserPlus className="h-5 w-5 mr-1" />
            Add New Agent
          </button>
        </div>
      </div>

      {/* Agents List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Agent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact Information
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Performance
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
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={agent.avatar || "/placeholder.svg"}
                          alt={agent.name}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-xs text-gray-500">ID: {agent.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{agent.email}</div>
                      <div className="text-sm text-gray-500">{agent.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{agent.rating.toFixed(1)} rating</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {agent.activeDeliveries} active • {agent.completedToday} completed today
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.available
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {agent.available ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Available
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Unavailable
                            </>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleToggleAgentAvailability(agent.id)}
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            agent.available
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          {agent.available ? "Set Unavailable" : "Set Available"}
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setSelectedAgent(agent)
                            setIsEditingAgent(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setSelectedAgent(agent)
                            setIsConfirmingDelete(true)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No agents found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
