import { useState } from "react"
import Badge from "../UIs/adminUserUi/badge"
import Button from "../UIs/adminUserUi/button"
import { formatDate } from "../utils/adminUser/helpers"


const UserProfileModal = ({ isOpen, user, onClose, onEdit, onUpdateStatus, onDelete }) => {
  const [activeTab, setActiveTab] = useState("profile")

  if (!isOpen || !user) return null

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "green", label: "Active" },
      banned: { color: "red", label: "Banned" },
      pending: { color: "yellow", label: "Pending" },
    }
    const config = statusConfig[status] || { color: "gray", label: status }
    return <Badge color={config.color}>{config.label}</Badge>
  }

  const handleSendEmail = () => {
    window.open(`mailto:${user.email}?subject=Account Information&body=Hello ${user.fullname},`)
  }

  const handleResetPassword = () => {
    if (window.confirm(`Send password reset email to ${user.email}?`)) {
      alert("Password reset email sent successfully!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">User Profile: {user.fullname}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={handleSendEmail}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </Button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "profile"
                ? "text-[#FFB800] border-b-2 border-[#FFB800]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "orders"
                ? "text-[#FFB800] border-b-2 border-[#FFB800]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "security"
                ? "text-[#FFB800] border-b-2 border-[#FFB800]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt={user.fullname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="text-sm text-gray-900">{user.fullname}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email Address</label>
                      <p className="text-sm text-gray-900">{user.email}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="text-sm text-gray-900">{user.phoneNumber}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Account Status</label>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(user.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateStatus(user.id, user.status === "active" ? "banned" : "active")}
                        >
                          {user.status === "active" ? "Ban" : "Activate"}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                      <p className="text-sm text-gray-900">{formatDate(user.createdAt)}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Last Login</label>
                      <p className="text-sm text-gray-900">{formatDate(user.lastLogin)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-lg font-semibold">{user.orders || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Spent</p>
                      <p className="text-lg font-semibold">${(user.totalSpent || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Account Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" onClick={handleResetPassword}>
                      Reset Password
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => alert("Verification email sent!")}>
                      Verify Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Order History</h3>
                <Button variant="ghost" size="sm" onClick={() => alert("View all orders")}>
                  View All
                </Button>
              </div>

              {(user.orders || 0) === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500">This user has not placed any orders yet.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ORD-1023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 8, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge color="green">Delivered</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$150.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Account Security</h3>

                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Last changed: Never</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleResetPassword}>
                      Reset Password
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Not enabled</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => alert("2FA setup initiated")}>
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-gray-500">{user.status === "active" ? "Verified" : "Not verified"}</p>
                    </div>
                    {user.status !== "active" && (
                      <Button variant="secondary" size="sm" onClick={() => alert("Verification email sent")}>
                        Send Verification
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(user)}>Edit User</Button>
          <Button variant="danger" onClick={() => onDelete(user.id)}>
            Delete User
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal
