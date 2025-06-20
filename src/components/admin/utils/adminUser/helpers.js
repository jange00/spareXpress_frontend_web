
export const formatDate = (dateString) => {
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
   * Generate user avatar URL
   */
  export const generateAvatarUrl = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=FFB800&color=000000&size=128`
  }
  
  /**
   * Generate random user ID
   */
  export const generateUserId = (existingUsers = []) => {
    const existingIds = existingUsers.map((user) => Number.parseInt(user.id))
    const maxId = Math.max(...existingIds, 0)
    return String(maxId + 1).padStart(3, "0")
  }
  
  /**
   * Filter users based on search criteria
   */
  export const filterUsers = (users, filters) => {
    let result = [...users]
  
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.id.toLowerCase().includes(searchTerm),
      )
    }
  
    // Status filter
    if (filters.status) {
      result = result.filter((user) => user.status === filters.status)
    }
  
    // Role filter
    if (filters.role) {
      result = result.filter((user) => user.role === filters.role)
    }
  
    // Date range filter
    if (filters.dateRange?.start && filters.dateRange?.end) {
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      endDate.setHours(23, 59, 59, 999)
  
      result = result.filter((user) => {
        const createdAt = new Date(user.createdAt)
        return createdAt >= startDate && createdAt <= endDate
      })
    }
  
    return result
  }
  