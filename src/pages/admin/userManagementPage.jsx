import { useState, useEffect } from "react"
import { Badge } from "../../components/admin/userManagement/ui/badge"
import { UserProfileModal } from "../../components/admin/userManagement/userProfileModal"
import { AddUserModal } from "../../components/admin/userManagement/addUserModal"
import { BulkActionModal } from "../../components/admin/userManagement/bulkActionModal"
import {
  SearchIcon,
  PlusIcon,
  DownloadIcon,
  UploadIcon,
  UsersIcon,
  CalendarIcon,
  ChevronDownIcon,
  EyeIcon,
  MoreHorizontalIcon,
  RefreshIcon,
  TrashIcon,
  EditIcon,
  BanIcon,
  CheckIcon,
  FileTextIcon,
} from "../../components/admin/userManagement/ui/icons"

const UserManagement = () => {
  // ================ SAMPLE DATA ================
  // Sample user data for demonstration purposes
  const initialUsers = [
    {
      id: "001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      joinedDate: "2025-03-08T10:30:00",
      lastLogin: "2025-03-09T08:15:00",
      address: "123 Main St, New York, NY 10001, USA",
      orders: 12,
      totalSpent: 1250.75,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "002",
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+1 (555) 987-6543",
      status: "banned",
      joinedDate: "2025-03-07T14:45:00",
      lastLogin: "2025-03-07T18:30:00",
      address: "456 Park Ave, Boston, MA 02108, USA",
      orders: 0,
      totalSpent: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "003",
      name: "Admin User",
      email: "admin@sparexpress.com",
      phone: "+1 (555) 456-7890",
      status: "active",
      joinedDate: "2025-03-06T09:15:00",
      lastLogin: "2025-03-09T09:05:00",
      address: "789 Oak St, Chicago, IL 60007, USA",
      orders: 5,
      totalSpent: 750.25,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "004",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      joinedDate: "2025-03-05T16:20:00",
      lastLogin: "2025-03-08T11:45:00",
      address: "101 Pine St, Seattle, WA 98101, USA",
      orders: 8,
      totalSpent: 920.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "005",
      name: "Robert Chen",
      email: "robert.chen@example.com",
      phone: "+1 (555) 876-5432",
      status: "pending",
      joinedDate: "2025-03-04T11:05:00",
      lastLogin: null,
      address: "222 Maple Ave, Austin, TX 78701, USA",
      orders: 0,
      totalSpent: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "006",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+1 (555) 345-6789",
      status: "active",
      joinedDate: "2025-03-03T13:40:00",
      lastLogin: "2025-03-07T14:20:00",
      address: "333 Birch Rd, Denver, CO 80202, USA",
      orders: 0,
      totalSpent: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "007",
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 567-8901",
      status: "active",
      joinedDate: "2025-03-02T09:30:00",
      lastLogin: "2025-03-09T07:10:00",
      address: "444 Cedar Ln, Miami, FL 33101, USA",
      orders: 3,
      totalSpent: 175.25,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "008",
      name: "Jennifer Martinez",
      email: "jennifer.martinez@example.com",
      phone: "+1 (555) 678-9012",
      status: "banned",
      joinedDate: "2025-03-01T15:15:00",
      lastLogin: "2025-03-02T10:45:00",
      address: "555 Elm St, San Francisco, CA 94101, USA",
      orders: 1,
      totalSpent: 89.99,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // ================ STATE MANAGEMENT ================
  // Primary state for users data
  const [users, setUsers] = useState(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState(initialUsers)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: "", end: "" })

  // Selection states
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Modal states
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [bulkAction, setBulkAction] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)

  // ================ EFFECTS ================
  // Filter users based on search, status, and date range
  useEffect(() => {
    let result = [...users]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Apply date range filter
    if (dateRangeFilter.start && dateRangeFilter.end) {
      const startDate = new Date(dateRangeFilter.start)
      const endDate = new Date(dateRangeFilter.end)
      endDate.setHours(23, 59, 59, 999) // Set to end of day

      result = result.filter((user) => {
        const joinedDate = new Date(user.joinedDate)
        return joinedDate >= startDate && joinedDate <= endDate
      })
    }

    // Sort by joined date (newest first)
    result.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())

    setFilteredUsers(result)
  }, [users, searchTerm, statusFilter, dateRangeFilter])

  // ================ EVENT HANDLERS ================
  /**
   * Handles selecting all users
   * Toggles between selecting all filtered users and deselecting all
   */
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
    setSelectAll(!selectAll)
  }

  /**
   * Handles selecting individual user
   * @param {string} id - User ID to toggle selection
   */
  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  /**
   * Opens user profile modal for a specific user
   * @param {Object} user - User object to view
   * @param {boolean} editMode - Whether to open in edit mode
   */
  const handleViewUser = (user, editMode = false) => {
    setCurrentUser(user)
    setIsUserProfileOpen(true)
    setIsEditMode(editMode)
  }

  /**
   * Updates the status of a user
   * @param {string} userId - ID of the user to update
   * @param {string} newStatus - New status to set
   */
  const handleUpdateStatus = (userId, newStatus) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, status: newStatus })
    }
  }

  /**
   * Adds a new user to the system
   * @param {Object} newUser - New user data
   */
  const handleAddUser = (newUser) => {
    // Generate a new user ID
    const userNumber = Math.max(...users.map((u) => Number.parseInt(u.id))) + 1
    const userId = String(userNumber).padStart(3, "0")

    const user = {
      ...newUser,
      id: userId,
      joinedDate: new Date().toISOString(),
      lastLogin: null,
      orders: 0,
      totalSpent: 0,
    }

    setUsers([user, ...users])
    setIsAddUserOpen(false)
  }

  /**
   * Updates an existing user
   */
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setCurrentUser(updatedUser)
    setIsEditMode(false)
  }

  /**
   * Applies bulk action to selected users
   */
  const handleApplyBulkAction = () => {
    if (bulkAction === "status-update") {
      // This would be handled by the BulkActionModal component
    } else if (bulkAction === "delete") {
      if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
        setUsers(users.filter((user) => !selectedUsers.includes(user.id)))
        setSelectedUsers([])
        setSelectAll(false)
      }
    }

    setIsBulkActionOpen(false)
    setBulkAction("")
  }

  /**
   * Exports users in the specified format
   */
  const handleExportUsers = (format) => {
    // In a real application, this would generate and download the file
    alert(`Exporting users as ${format.toUpperCase()}`)
  }

  /**
   * Handles import users (mock function)
   */
  const handleImportUsers = () => {
    alert("Your user import has been initiated.")
  }

  // ================ UTILITY FUNCTIONS ================
  /**
   * Formats date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Never"

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  /**
   * Returns appropriate badge component for user status
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge color="green">Active</Badge>
      case "banned":
        return <Badge color="red">Banned</Badge>
      case "pending":
        return <Badge color="yellow">Pending</Badge>
      default:
        return <Badge color="gray">{status}</Badge>
    }
  }

  // ================ RENDER FUNCTION ================
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Actions & Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add New Customer
              </button>

              <button
                onClick={handleImportUsers}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <UploadIcon className="w-5 h-5 mr-1" />
                Import Customers
              </button>

              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => document.getElementById("exportDropdown")?.classList.toggle("hidden")}
                >
                  <DownloadIcon className="w-5 h-5 mr-1" />
                  Export Customers
                </button>
                <div
                  id="exportDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleExportUsers("csv")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportUsers("excel")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExportUsers("pdf")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              {selectedUsers.length > 0 && (
                <div className="relative">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition-colors"
                    onClick={() => document.getElementById("bulkActionDropdown")?.classList.toggle("hidden")}
                  >
                    <UsersIcon className="w-5 h-5 mr-1" />
                    Bulk Actions ({selectedUsers.length})
                  </button>
                  <div
                    id="bulkActionDropdown"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setBulkAction("status-update")
                          setIsBulkActionOpen(true)
                          document.getElementById("bulkActionDropdown")?.classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <RefreshIcon className="w-4 h-4 inline mr-2" />
                        Update Status
                      </button>
                      <button
                        onClick={() => {
                          setBulkAction("delete")
                          handleApplyBulkAction()
                          document.getElementById("bulkActionDropdown")?.classList.add("hidden")
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <TrashIcon className="w-4 h-4 inline mr-2" />
                        Delete Customers
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              />
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                onClick={() => document.getElementById("dateRangeDropdown")?.classList.toggle("hidden")}
              >
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  {dateRangeFilter.start && dateRangeFilter.end ? (
                    <span>
                      {new Date(dateRangeFilter.start).toLocaleDateString()} -{" "}
                      {new Date(dateRangeFilter.end).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-gray-500">Join date range</span>
                  )}
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </button>
              <div
                id="dateRangeDropdown"
                className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg hidden z-10 p-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="block text-sm font-medium text-gray-700">From</label>
                    <input
                      type="date"
                      value={dateRangeFilter.start}
                      onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <input
                      type="date"
                      value={dateRangeFilter.end}
                      onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        setDateRangeFilter({ start: "", end: "" })
                        document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("dateRangeDropdown")?.classList.add("hidden")
                      }}
                      className="px-3 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* User List Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined
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
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{user.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(user.joinedDate).split(",")[0]}</div>
                        <div className="text-xs text-gray-500">
                          Last login: {user.lastLogin ? formatDate(user.lastLogin).split(",")[0] : "Never"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-[#FFB800] hover:text-[#FFB800]/80 mr-3"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() =>
                                document.getElementById(`actionDropdown-${user.id}`)?.classList.toggle("hidden")
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </button>
                            <div
                              id={`actionDropdown-${user.id}`}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleViewUser(user)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeIcon className="w-4 h-4 inline mr-2" />
                                  View Profile
                                </button>
                                <button
                                  onClick={() => handleViewUser(user, true)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EditIcon className="w-4 h-4 inline mr-2" />
                                  Edit Customer
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdateStatus(user.id, user.status === "active" ? "banned" : "active")
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {user.status === "active" ? (
                                    <>
                                      <BanIcon className="w-4 h-4 inline mr-2" />
                                      Ban Customer
                                    </>
                                  ) : (
                                    <>
                                      <CheckIcon className="w-4 h-4 inline mr-2" />
                                      Activate Customer
                                    </>
                                  )}
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                  <TrashIcon className="w-4 h-4 inline mr-2" />
                                  Delete Customer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {isUserProfileOpen && currentUser && (
        <UserProfileModal
          user={currentUser}
          isEditMode={isEditMode}
          onClose={() => setIsUserProfileOpen(false)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateUser={handleUpdateUser}
          onEdit={() => setIsEditMode(true)}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
        />
      )}

      {/* Add User Modal */}
      {isAddUserOpen && <AddUserModal onSave={handleAddUser} onClose={() => setIsAddUserOpen(false)} />}

      {/* Bulk Action Modal */}
      {isBulkActionOpen && (
        <BulkActionModal
          action={bulkAction}
          selectedCount={selectedUsers.length}
          onApply={(action, value) => {
            if (action === "status-update") {
              setUsers(users.map((user) => (selectedUsers.includes(user.id) ? { ...user, status: value } : user)))
            }
            setIsBulkActionOpen(false)
            setSelectedUsers([])
            setSelectAll(false)
          }}
          onClose={() => setIsBulkActionOpen(false)}
        />
      )}
    </div>
  )
}

export default UserManagement
