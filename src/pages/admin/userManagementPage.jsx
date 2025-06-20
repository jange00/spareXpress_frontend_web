import { useState, useEffect } from "react"
import UserTable from "../../components/admin/userManagement/user-table"
import AddUserModal from "../../components/admin/userManagement/modals/add-user-modal"
import EditUserModal from "../../components/admin/userManagement/modals/edit-user-modal"
import BulkActionModal from "../../components/admin/userManagement/modals/bulk-action-modal"
import UserProfileModal from "../../components/admin/userManagement/user-profile-modal"
import UserManagementHeader from "../../components/admin/userManagement/user-management-header"
import UserManagementFilters from "../../components/admin/userManagement/user-management-filters"
import ExportDropdown from "../../components/admin/userManagement/export-dropdown"
import { exportToCSV, exportToExcel, exportToPDF, importFromCSV } from "../../components/admin/utils/adminUser/export-utils"

import { getAllUsers, createUser, updateUser, deleteUser as deleteUserMock, bulkUpdateUsers } from "../../components/admin/userManagement/mock-data"

import { useGetAllAdminUsers } from "../../hook/admin/useUsers/useGetAllAdminUsers"
import { useDeleteAdminUsers } from "../../hook/admin/useUsers/useDeleteAdminUsers"

const UserManagement = () => {
  const { data: user = [] } = useGetAllAdminUsers();

  const [users, setUsers] = useState(user)
  const [filteredUsers, setFilteredUsers] = useState(user)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [modals, setModals] = useState({
    addUser: false,
    editUser: false,
    bulkAction: false,
    userProfile: false,
  })
  const [currentUser, setCurrentUser] = useState(null)

  // NEW: state to manage delete confirmation overlay
  const [confirmDelete, setConfirmDelete] = useState(null) // null or user object to delete

  // Filter users
  useEffect(() => {
    let filtered = [...users]

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.phoneNumber.includes(searchTerm.trim()) ||
          user._id.toLowerCase().includes(searchLower),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    setFilteredUsers(filtered)
  }, [users, searchTerm, statusFilter])

  // Modal handlers
  const openModal = (modalName, user = null) => {
    setModals((prev) => ({ ...prev, [modalName]: true }))
    if (user) setCurrentUser(user)
  }

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }))
    setCurrentUser(null)
  }

  // User selection
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers((prev) => (prev.length === filteredUsers.length ? [] : filteredUsers.map((user) => user._id)))
  }

  // CRUD operations
  const handleAddUser = async (userData) => {
    setIsLoading(true)
    try {
      const response = await createUser({
        ...userData,
        status: "active",
        orders: 0,
        Amount: 0,
        lastLogin: null,
      })

      if (response.success) {
        setUsers((prev) => [response.data, ...prev])
        alert(`User "${response.data.fullname}" created successfully!`)
      }
    } catch (error) {
      console.error("Error adding user:", error)
      alert("Error creating user. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = async (userData) => {
    setIsLoading(true)
    try {
      const response = await updateUser(userData._id, userData)

      if (response.success) {
        setUsers((prev) => prev.map((user) => (user._id === response.data._id ? response.data : user)))
        alert(`User "${response.data.fullname}" updated successfully!`)
      }
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Error updating user. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const { mutateAsync: deleteUser } = useDeleteAdminUsers();

  // Show confirmation overlay instead of window.confirm
  const handleDeleteUser = async (userId) => {
    const user = users.find((u) => u._id === userId)
    if (!user) return
    // Open confirm overlay with this user
    setConfirmDelete(user)
  }

  // Confirm delete action from overlay
  const confirmDeleteUser = async () => {
    if (!confirmDelete) return
    setIsLoading(true)
    try {
      const response = await deleteUser(confirmDelete._id)

      if (response.success) {
        setUsers((prev) => prev.filter((user) => user._id !== confirmDelete._id))
        setSelectedUsers((prev) => prev.filter((id) => id !== confirmDelete._id))
        // alert("User deleted successfully.")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      // alert("Error deleting user. Please try again.")
    } finally {
      setIsLoading(false)
      setConfirmDelete(null)
    }
  }

  const cancelDeleteUser = () => {
    setConfirmDelete(null)
  }

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const user = users.find((u) => u._id === userId)

      const response = await updateUser(userId, { ...user, status: newStatus })

      if (response.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, status: newStatus, updatedAt: new Date().toISOString() } : user,
          ),
        )
        alert(`User "${user?.fullname}" status updated to ${newStatus}.`)
      }
    } catch (error) {
      console.error("Error updating user status:", error)
      alert("Error updating user status. Please try again.")
    }
  }

  const handleBulkAction = async (actionData) => {
    setIsLoading(true)
    try {
      const { action, userIds } = actionData

      if (action === "delete") {
        if (window.confirm(`Are you sure you want to delete ${userIds.length} users? This action cannot be undone.`)) {
          const response = await bulkUpdateUsers(userIds, { action: "delete" })

          if (response.success) {
            setUsers((prev) => prev.filter((user) => !userIds.includes(user._id)))
            setSelectedUsers([])
            alert(`${userIds.length} users deleted successfully.`)
          }
        }
      } else if (action === "activate" || action === "ban") {
        const newStatus = action === "activate" ? "active" : "banned"

        const response = await bulkUpdateUsers(userIds, { status: newStatus })

        if (response.success) {
          setUsers((prev) =>
            prev.map((user) =>
              userIds.includes(user._id) ? { ...user, status: newStatus, updatedAt: new Date().toISOString() } : user,
            ),
          )
          setSelectedUsers([])
          alert(`${userIds.length} users ${action === "activate" ? "activated" : "banned"} successfully.`)
        }
      }
    } catch (error) {
      console.error("Error performing bulk action:", error)
      alert("Error performing bulk action. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Export/Import functions unchanged
  const handleExport = (format) => {
    try {
      const filename = `users-export-${new Date().toISOString().split("T")[0]}`
      switch (format) {
        case "csv":
          exportToCSV(filteredUsers, filename)
          break
        case "excel":
          exportToExcel(filteredUsers, filename)
          break
        case "pdf":
          exportToPDF(filteredUsers, filename)
          break
      }
      alert(`Users exported as ${format.toUpperCase()} successfully!`)
    } catch (error) {
      alert("Error exporting users. Please try again.")
    }
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        try {
          const importedUsers = await importFromCSV(file)
          const newUsers = importedUsers.map((user, index) => ({
            ...user,
            _id: `imported_${Date.now()}_${index}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: null,
            orders: 0,
            Amount: 0,
          }))
          setUsers((prev) => [...newUsers, ...prev])
          alert(`Successfully imported ${newUsers.length} users!`)
        } catch (error) {
          alert("Error importing users. Please check your CSV format.")
        }
      }
    }
    input.click()
  }

  const handleViewUser = (user) => {
    setCurrentUser(user)
    openModal("userProfile")
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("")
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <UserManagementHeader onAddUser={() => openModal("addUser")} onImport={handleImport} isLoading={isLoading}>
        <ExportDropdown onExport={handleExport} isLoading={isLoading} />
        {selectedUsers.length > 0 && (
          <button
            onClick={() => openModal("bulkAction")}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Bulk Actions ({selectedUsers.length})
          </button>
        )}
      </UserManagementHeader>

      {/* Filters */}
      <UserManagementFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
        onClearFilters={clearFilters}
        isLoading={isLoading}
      />

      {/* Stats */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
            {selectedUsers.length > 0 && (
              <span className="ml-4 text-[#FFB800] font-medium">{selectedUsers.length} selected</span>
            )}
          </div>
          {isLoading && (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="container mx-auto px-4 py-6">
        <UserTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          onViewUser={handleViewUser}
          onEditUser={(user) => openModal("editUser", user)}
          onDeleteUser={handleDeleteUser}
          onUpdateStatus={handleUpdateStatus}
          isLoading={isLoading}
        />
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={modals.addUser}
        onClose={() => closeModal("addUser")}
        onSubmit={handleAddUser}
        isLoading={isLoading}
      />

      <EditUserModal
        isOpen={modals.editUser}
        user={currentUser}
        onClose={() => closeModal("editUser")}
        onSubmit={handleEditUser}
        isLoading={isLoading}
      />

      <BulkActionModal
        isOpen={modals.bulkAction}
        selectedUserIds={selectedUsers}
        onClose={() => closeModal("bulkAction")}
        onSubmit={handleBulkAction}
        isLoading={isLoading}
      />

      <UserProfileModal
        isOpen={modals.userProfile}
        user={currentUser}
        onClose={() => closeModal("userProfile")}
        onEdit={(user) => {
          closeModal("userProfile")
          openModal("editUser", user)
        }}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteUser}
      />

      {/* Delete Confirmation Overlay */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete <strong>{confirmDelete.fullname}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDeleteUser}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
