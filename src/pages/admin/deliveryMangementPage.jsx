import { useState, useEffect } from "react"
import { DeliveryMetrics } from "../../components/admin/deliveryManagement/deliveryMetrics"
import { DeliveryFilters } from "../../components/admin/deliveryManagement/deliveryFilters"
import { DeliveriesTable } from "../../components/admin/deliveryManagement/deliveriesTable"
import { LiveTrackingMap } from "../../components/admin/deliveryManagement/liveTrackingMap"
import { IssuesSection } from "../../components/admin/deliveryManagement/issuesSection"
import { DeliveryCostSection } from "../../components/admin/deliveryManagement/deliveryCostSection"
import { AgentsSection } from "../../components/admin/deliveryManagement/agentsSection"
import { DeliveryDetailsModal } from "../../components/admin/deliveryManagement/modal/delivery-details-modal"
import { AssignAgentModal } from "../../components/admin/deliveryManagement/modal/assign-agent-modal"
import { IssueResolutionModal } from "../../components/admin/deliveryManagement/modal/issue-resolution-modal"
import { AddPricingRuleModal } from "../../components/admin/deliveryManagement/modal/add-pricing-rule-modal"
import { AddAgentModal } from "../../components/admin/deliveryManagement/modal/add-agent-modal"
import { EditAgentModal } from "../../components/admin/deliveryManagement/modal/edit-agent-modal"
import { ConfirmDeleteModal } from "../../components/admin/deliveryManagement/modal/confirm-delete-modal"
import { generateSampleDeliveries, deliveryAgents, initialIssues, initialPricingRules } from "../../components/admin/deliveryManagement/sampleData"
import { FileText, Truck, Users, Download } from "lucide-react"
import Badge from "../../components/admin/deliveryManagement/ui/badge"

const DeliveryManagement = () => {
  // ================ STATE MANAGEMENT ================
  // Primary state for delivery data
  const [deliveries, setDeliveries] = useState(generateSampleDeliveries(50))
  const [filteredDeliveries, setFilteredDeliveries] = useState(deliveries)
  const [agents, setAgents] = useState(deliveryAgents)
  const [issues, setIssues] = useState(initialIssues)
  const [pricingRules, setPricingRules] = useState(initialPricingRules)

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState({
    from: undefined,
    to: undefined,
  })

  // Modal states
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [isAssigningAgent, setIsAssigningAgent] = useState(false)
  const [isViewingIssue, setIsViewingIssue] = useState(false)
  const [isAddingPricingRule, setIsAddingPricingRule] = useState(false)
  const [isAddingAgent, setIsAddingAgent] = useState(false)
  const [isEditingAgent, setIsEditingAgent] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [activeTab, setActiveTab] = useState("deliveries")

  // ================ EFFECTS ================
  // Filter deliveries based on search and filters
  useEffect(() => {
    applyFilters()
  }, [searchQuery, statusFilter, agentFilter, dateRangeFilter, deliveries])

  // ================ UTILITY FUNCTIONS ================
  // Apply filters to deliveries
  const applyFilters = () => {
    let filtered = [...deliveries]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.orderId.toLowerCase().includes(query) ||
          d.customerName.toLowerCase().includes(query) ||
          d.trackingNumber.toLowerCase().includes(query) ||
          d.address.toLowerCase().includes(query) ||
          d.city.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((d) => d.status === statusFilter)
    }

    // Apply agent filter
    if (agentFilter !== "all") {
      if (agentFilter === "unassigned") {
        filtered = filtered.filter((d) => !d.deliveryAgentId)
      } else {
        filtered = filtered.filter((d) => d.deliveryAgentId === agentFilter)
      }
    }

    // Apply date range filter
    if (dateRangeFilter.from && dateRangeFilter.to) {
      const fromDate = new Date(dateRangeFilter.from).getTime()
      const toDate = new Date(dateRangeFilter.to).getTime()
      filtered = filtered.filter((d) => {
        const deliveryDate = new Date(d.estimatedDelivery).getTime()
        return deliveryDate >= fromDate && deliveryDate <= toDate
      })
    }

    setFilteredDeliveries(filtered)
  }

  // Handle assigning agent to delivery
  const handleAssignAgent = (deliveryId, agentId) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === deliveryId
          ? { ...d, deliveryAgentId: agentId, status: d.status === "pending" ? "out_for_delivery" : d.status }
          : d,
      ),
    )
    setIsAssigningAgent(false)
  }

  // Handle auto-assign deliveries to agents
  const handleAutoAssign = () => {
    const availableAgents = agents.filter((a) => a.available)
    if (!availableAgents.length) return

    const pendingDeliveries = deliveries.filter((d) => d.status === "pending" && !d.deliveryAgentId)
    if (!pendingDeliveries.length) return

    const updatedDeliveries = [...deliveries]

    pendingDeliveries.forEach((delivery) => {
      // Simple round-robin assignment for demo purposes
      const agentIndex = Math.floor(Math.random() * availableAgents.length)
      const assignedAgent = availableAgents[agentIndex]

      const deliveryIndex = updatedDeliveries.findIndex((d) => d.id === delivery.id)
      if (deliveryIndex !== -1) {
        updatedDeliveries[deliveryIndex] = {
          ...updatedDeliveries[deliveryIndex],
          deliveryAgentId: assignedAgent.id,
          status: "out_for_delivery",
        }
      }
    })

    setDeliveries(updatedDeliveries)
  }

  // Handle resolving delivery issue
  const handleResolveIssue = (issueId) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, status: "resolved", updatedAt: new Date().toISOString() } : issue,
      ),
    )
    setIsViewingIssue(false)
  }

  // Handle adding pricing rule
  const handleAddPricingRule = (rule) => {
    const newRule = {
      ...rule,
      id: `rule-${(pricingRules.length + 1).toString().padStart(3, "0")}`,
    }

    setPricingRules((prev) => [...prev, newRule])
    setIsAddingPricingRule(false)
  }

  // Handle adding a new delivery agent
  const handleAddAgent = (agentData) => {
    const newAgent = {
      ...agentData,
      id: `agent-${(agents.length + 1).toString().padStart(3, "0")}`,
      location: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.006 + (Math.random() - 0.5) * 0.1 },
    }

    setAgents((prev) => [...prev, newAgent])
    setIsAddingAgent(false)
  }

  // Handle updating an existing agent
  const handleUpdateAgent = (agentId, agentData) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              ...agentData,
            }
          : agent,
      ),
    )
    setIsEditingAgent(false)
    setSelectedAgent(null)
  }

  // Handle deleting an agent
  const handleDeleteAgent = (agentId) => {
    // First, reassign any deliveries assigned to this agent
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.deliveryAgentId === agentId ? { ...delivery, deliveryAgentId: null, status: "pending" } : delivery,
      ),
    )

    // Then remove the agent
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId))
    setSelectedAgent(null)
  }

  // Handle toggling agent availability
  const handleToggleAgentAvailability = (agentId) => {
    setAgents((prev) => prev.map((agent) => (agent.id === agentId ? { ...agent, available: !agent.available } : agent)))
  }

  // Handle toggling pricing rule active state
  const handleTogglePricingRule = (ruleId) => {
    setPricingRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, active: !rule.active } : rule)))
  }

  // Get agent by ID
  const getAgentById = (agentId) => {
    if (!agentId) return null
    return agents.find((agent) => agent.id === agentId) || null
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not available"

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge color="yellow">Pending</Badge>
      case "out_for_delivery":
        return <Badge color="blue">Out for Delivery</Badge>
      case "delivered":
        return <Badge color="green">Delivered</Badge>
      case "delayed":
        return <Badge color="red">Delayed</Badge>
      case "cancelled":
        return <Badge color="gray">Cancelled</Badge>
      default:
        return <Badge color="gray">Unknown</Badge>
    }
  }

  // Export data functions
  const exportAsCSV = () => {
    // Create CSV content
    const headers = ["Order ID", "Customer", "Address", "Status", "Agent", "Estimated Delivery"]
    const rows = filteredDeliveries.map((d) => [
      d.orderId,
      d.customerName,
      `${d.address}, ${d.city}, ${d.state} ${d.zipCode}`,
      d.status,
      getAgentById(d.deliveryAgentId)?.name || "Unassigned",
      formatDate(d.estimatedDelivery),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `deliveries-export-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportAsExcel = () => {
    alert("Excel export functionality would be implemented here. For demo purposes, we're using CSV export instead.")
    exportAsCSV()
  }

  const exportAsPDF = () => {
    alert("PDF export functionality would be implemented here. For demo purposes, we're using CSV export instead.")
    exportAsCSV()
  }

  // ================ MAIN RENDER ================
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Header & Actions */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <button
                  onClick={() => document.getElementById("exportDropdown").classList.toggle("hidden")}
                  className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <FileText className="h-5 w-5 mr-1" />
                  Export Report
                </button>
                <div
                  id="exportDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={exportAsCSV}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 inline mr-2" />
                      Export as CSV
                    </button>
                    <button
                      onClick={exportAsExcel}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 inline mr-2" />
                      Export as Excel
                    </button>
                    <button
                      onClick={exportAsPDF}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 inline mr-2" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAutoAssign}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Truck className="h-5 w-5 mr-1" />
                Auto-Assign Deliveries
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Metrics Overview */}
        <DeliveryMetrics deliveries={deliveries} agents={agents} />

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("deliveries")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "deliveries"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 inline mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Deliveries
                </span>
              </button>
              <button
                onClick={() => setActiveTab("tracking")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "tracking"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 inline mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Live Tracking
                </span>
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "agents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <Users className="h-5 w-5 inline mr-1" />
                  Agents
                </span>
              </button>
              <button
                onClick={() => setActiveTab("issues")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "issues"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 inline mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Issues
                </span>
              </button>
              <button
                onClick={() => setActiveTab("pricing")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "pricing"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 inline mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pricing
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "deliveries" && (
          <div className="space-y-6">
            <DeliveryFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              agentFilter={agentFilter}
              setAgentFilter={setAgentFilter}
              dateRangeFilter={dateRangeFilter}
              setDateRangeFilter={setDateRangeFilter}
              agents={agents}
            />
            <DeliveriesTable
              filteredDeliveries={filteredDeliveries}
              getAgentById={getAgentById}
              setSelectedDelivery={setSelectedDelivery}
              setIsAssigningAgent={setIsAssigningAgent}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
            />
          </div>
        )}

        {activeTab === "tracking" && (
          <div className="space-y-6">
            <LiveTrackingMap deliveries={deliveries} agents={agents} setIsAddingAgent={setIsAddingAgent} />
          </div>
        )}

        {activeTab === "agents" && (
          <div className="space-y-6">
            <AgentsSection
              agents={agents}
              setIsAddingAgent={setIsAddingAgent}
              handleToggleAgentAvailability={handleToggleAgentAvailability}
              setSelectedAgent={setSelectedAgent}
              setIsEditingAgent={setIsEditingAgent}
              setIsConfirmingDelete={setIsConfirmingDelete}
            />
          </div>
        )}

        {activeTab === "issues" && (
          <div className="space-y-6">
            <IssuesSection
              issues={issues}
              deliveries={deliveries}
              setSelectedDelivery={setSelectedDelivery}
              setIsViewingIssue={setIsViewingIssue}
            />
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="space-y-6">
            <DeliveryCostSection
              pricingRules={pricingRules}
              handleTogglePricingRule={handleTogglePricingRule}
              setIsAddingPricingRule={setIsAddingPricingRule}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <DeliveryDetailsModal
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
        isAssigningAgent={isAssigningAgent}
        isViewingIssue={isViewingIssue}
        setIsAssigningAgent={setIsAssigningAgent}
        getAgentById={getAgentById}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
      />

      <AssignAgentModal
        selectedDelivery={selectedDelivery}
        isAssigningAgent={isAssigningAgent}
        setIsAssigningAgent={setIsAssigningAgent}
        setSelectedDelivery={setSelectedDelivery}
        isViewingIssue={isViewingIssue}
        agents={agents}
        handleAssignAgent={handleAssignAgent}
      />

      <IssueResolutionModal
        selectedDelivery={selectedDelivery}
        isViewingIssue={isViewingIssue}
        setIsViewingIssue={setIsViewingIssue}
        setSelectedDelivery={setSelectedDelivery}
        issues={issues}
        handleResolveIssue={handleResolveIssue}
        setDeliveries={setDeliveries}
      />

      <AddPricingRuleModal
        isAddingPricingRule={isAddingPricingRule}
        setIsAddingPricingRule={setIsAddingPricingRule}
        handleAddPricingRule={handleAddPricingRule}
      />

      <AddAgentModal
        isAddingAgent={isAddingAgent}
        setIsAddingAgent={setIsAddingAgent}
        handleAddAgent={handleAddAgent}
      />

      <EditAgentModal
        isEditingAgent={isEditingAgent}
        setIsEditingAgent={setIsEditingAgent}
        selectedAgent={selectedAgent}
        handleUpdateAgent={handleUpdateAgent}
      />

      <ConfirmDeleteModal
        isConfirmingDelete={isConfirmingDelete}
        setIsConfirmingDelete={setIsConfirmingDelete}
        selectedAgent={selectedAgent}
        handleDeleteAgent={handleDeleteAgent}
      />
    </div>
  )
}

export default DeliveryManagement
