import Button from "../UIs/adminUserUi/button"


const UserManagementHeader = ({ onAddUser, onImport, isLoading, children }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage your users and their accounts with comprehensive tools</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={onAddUser} disabled={isLoading}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </Button>

            <Button variant="secondary" onClick={onImport} disabled={isLoading}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Import CSV
            </Button>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementHeader
