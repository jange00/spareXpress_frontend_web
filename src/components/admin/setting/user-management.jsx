import { useState } from "react"
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { Button } from "./ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table"
import { Badge } from "../ui/badge"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "./ui/dialog"
import { SearchIcon, PlusIcon, EditIcon, UserIcon, ShieldIcon, UserCheckIcon, UserXIcon } from "./ui/icons"

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "John Doe",
      email: "admin@email.com",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "staff@email.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      username: "Robert Johnson",
      email: "robert@email.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 4,
      username: "Sarah Williams",
      email: "sarah@email.com",
      role: "Viewer",
      status: "Active",
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = () => {
    setCurrentUser({
      id: Date.now(),
      username: "",
      email: "",
      role: "Viewer",
      status: "Active",
    })
    setIsAddUserModalOpen(true)
  }

  const handleEditUser = (user) => {
    setCurrentUser({ ...user })
    setIsEditUserModalOpen(true)
  }

  const handleSaveUser = (isNew) => {
    if (isNew) {
      setUsers([...users, currentUser])
      setIsAddUserModalOpen(false)
      alert(`User ${currentUser.username} has been added successfully.`)
    } else {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)))
      setIsEditUserModalOpen(false)
      alert(`User ${currentUser.username} has been updated successfully.`)
    }
    setCurrentUser(null)
  }

  const roles = [
    { value: "Super Admin", label: "Super Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Editor", label: "Editor" },
    { value: "Viewer", label: "Viewer" },
  ]

  const statuses = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ]

  return (
    <div>
      <CardHeader>
        <CardTitle>User Management & Roles</CardTitle>
        <CardDescription>Manage admin accounts and their permissions</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<SearchIcon className="h-4 w-4" />}
            />
          </div>

          <Button onClick={handleAddUser}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Admin
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <UserIcon className="h-12 w-12 mb-2" />
                    <h3 className="text-lg font-medium">No users found</h3>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "Super Admin" ? (
                      <Badge variant="primary" className="flex items-center space-x-1">
                        <ShieldIcon className="h-3 w-3" />
                        <span>{user.role}</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline">{user.role}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.status === "Active" ? (
                      <Badge variant="success" className="flex items-center space-x-1">
                        <UserCheckIcon className="h-3 w-3" />
                        <span>Active</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <UserXIcon className="h-3 w-3" />
                        <span>Inactive</span>
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Add User Modal */}
      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogHeader>
          <DialogTitle>Add New Admin User</DialogTitle>
          <DialogDescription>Create a new admin user account. Fill in all required fields.</DialogDescription>
        </DialogHeader>

        <DialogContent>
          <div className="space-y-4">
            <Input
              label="Username"
              id="username"
              value={currentUser?.username || ""}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              placeholder="Enter username"
            />

            <Input
              label="Email"
              id="email"
              type="email"
              value={currentUser?.email || ""}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              placeholder="Enter email address"
            />

            <Select
              label="Role"
              id="role"
              value={currentUser?.role || "Viewer"}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              options={roles}
            />

            <Select
              label="Status"
              id="status"
              value={currentUser?.status || "Active"}
              onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
              options={statuses}
            />

            <Input label="Temporary Password" id="password" type="password" placeholder="Enter temporary password" />
            <p className="text-xs text-gray-500">User will be prompted to change this password on first login.</p>
          </div>
        </DialogContent>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSaveUser(true)}>Add User</Button>
        </DialogFooter>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information and permissions.</DialogDescription>
        </DialogHeader>

        <DialogContent>
          <div className="space-y-4">
            <Input
              label="Username"
              id="edit-username"
              value={currentUser?.username || ""}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
            />

            <Input
              label="Email"
              id="edit-email"
              type="email"
              value={currentUser?.email || ""}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            />

            <Select
              label="Role"
              id="edit-role"
              value={currentUser?.role || ""}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              options={roles}
            />

            <Select
              label="Status"
              id="edit-status"
              value={currentUser?.status || ""}
              onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
              options={statuses}
            />
          </div>
        </DialogContent>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditUserModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSaveUser(false)}>Save Changes</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
