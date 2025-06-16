import { useState } from "react"
import { Badge } from "./ui/badge"
import { MailIcon, ShoppingCartIcon } from "./ui/icons"

export const UserProfileModal = ({
  user,
  isEditMode,
  onClose,
  onUpdateStatus,
  onUpdateUser,
  onEdit,
  formatDate,
  getStatusBadge,
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("profile")

  // State for edited user data
  const [editedUser, setEditedUser] = useState({ ...user })

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  // Handle save changes
  const handleSave = () => {
    onUpdateUser(editedUser)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between w-full">
            <span>
              {isEditMode ? "Edit Customer" : "Customer Profile"}: {user.name}
            </span>
            <div className="flex items-center space-x-2">
              {!isEditMode && (
                <button
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => alert("Email sent to customer")}
                >
                  <MailIcon className="w-4 h-4 mr-1" />
                  Send Email
                </button>
              )}
            </div>
          </h2>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "profile" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "orders" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "security" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* User Avatar */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={isEditMode ? editedUser.avatar : user.avatar}
                      alt={isEditMode ? editedUser.name : user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditMode && <button className="text-sm text-blue-600 hover:text-blue-800">Change Photo</button>}
                </div>

                {/* User Information */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="name"
                          value={editedUser.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{user.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email Address</label>
                      {isEditMode ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{user.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{user.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Account Status</label>
                      {isEditMode ? (
                        <select
                          name="status"
                          value={editedUser.status}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        >
                          <option value="active">Active</option>
                          <option value="banned">Banned</option>
                          <option value="pending">Pending</option>
                        </select>
                      ) : (
                        <div className="flex items-center">
                          {getStatusBadge(user.status)}
                          <button
                            onClick={() => onUpdateStatus(user.id, user.status === "active" ? "banned" : "active")}
                            className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                          >
                            {user.status === "active" ? "Ban" : "Activate"}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                      <p className="text-sm text-gray-900">{formatDate(user.joinedDate)}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Last Login</label>
                      <p className="text-sm text-gray-900">{formatDate(user.lastLogin)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    {isEditMode ? (
                      <textarea
                        name="address"
                        value={editedUser.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      ></textarea>
                    ) : (
                      <p className="text-sm text-gray-900">{user.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-lg font-semibold">{user.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Spent</p>
                      <p className="text-lg font-semibold">${user.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Account Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => alert("Password reset email sent")}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => alert("Verification email sent")}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Verify Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Order History</h3>
                <button onClick={() => alert("View all orders")} className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>

              {user.orders === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <ShoppingCartIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">This customer has not placed any orders yet.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                          Date
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
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Sample order data - in a real app, this would be fetched */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ORD-1023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 8, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge color="green">Delivered</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$150.00</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ORD-1019</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 1, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge color="green">Delivered</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">$89.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
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
                    <button
                      onClick={() => alert("Password reset email sent")}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Reset Password
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Not enabled</p>
                    </div>
                    <button
                      onClick={() => alert("2FA setup initiated")}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Enable 2FA
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-gray-500">{user.status === "active" ? "Verified" : "Not verified"}</p>
                    </div>
                    {user.status !== "active" && (
                      <button
                        onClick={() => alert("Verification email sent")}
                        className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Send Verification
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Login Activity</h3>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          IP Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Device
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.lastLogin ? (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(user.lastLogin)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Chrome on Windows</td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                            No login activity recorded
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>

          {isEditMode ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              Edit Customer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
