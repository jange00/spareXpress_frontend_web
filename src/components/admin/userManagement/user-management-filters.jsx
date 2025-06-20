import Input from "../UIs/adminUserUi/input"
import Select from "../UIs/adminUserUi/select"
import Button from "../UIs/adminUserUi/button"
import { USER_STATUSES } from "../utils/adminUser/constants"


const UserManagementFilters = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onClearFilters,
  isLoading,
}) => {
  const hasActiveFilters = searchTerm || statusFilter

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users by name, email, phone, or ID..."
            value={searchTerm}
            onChange={onSearchChange}
            disabled={isLoading}
          />
        </div>

        <div className="sm:w-48">
          <Select
            placeholder="All Statuses"
            value={statusFilter}
            onChange={onStatusFilterChange}
            options={USER_STATUSES}
            disabled={isLoading}
          />
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} disabled={isLoading}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

export default UserManagementFilters
