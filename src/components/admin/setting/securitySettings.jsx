import { useState } from "react"
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Separator } from "./ui/seperator"
import { Label } from "./ui/label"
import { KeyIcon, LockIcon, EyeIcon, EyeOffIcon } from "./ui/icons"

export const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    ipRestriction: false,
    sessionTimeout: true,
    passwordExpiry: false,
    privileges: {
      edit: true,
      delete: false,
      viewOnly: false,
    },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.")
      return
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long.")
      return
    }

    alert("Password changed successfully!")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleToggleChange = (setting) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handlePrivilegeChange = (privilege) => {
    setSecuritySettings((prev) => ({
      ...prev,
      privileges: {
        ...prev.privileges,
        [privilege]: !prev.privileges[privilege],
      },
    }))
  }

  return (
    <div>
      <CardHeader>
        <CardTitle>Security & Authentication</CardTitle>
        <CardDescription>Manage password settings and access control</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Password & Login */}
        <div>
          <h3 className="text-lg font-medium mb-4">Password & Login</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="current-password"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="new-password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button onClick={handleChangePassword}>Change Password</Button>

            <Switch
              id="two-factor"
              checked={securitySettings.twoFactorAuth}
              onChange={() => handleToggleChange("twoFactorAuth")}
              label="Two-Factor Authentication (2FA)"
              description="Require a verification code in addition to your password"
            />
          </div>
        </div>

        <Separator />

        {/* User Access Control */}
        <div>
          <h3 className="text-lg font-medium mb-4">User Access Control</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base">Admin Privileges</Label>
              <div className="space-y-2">
                <Checkbox
                  id="edit-privilege"
                  checked={securitySettings.privileges.edit}
                  onChange={() => handlePrivilegeChange("edit")}
                  label="Allow Edit Permissions"
                />
                <Checkbox
                  id="delete-privilege"
                  checked={securitySettings.privileges.delete}
                  onChange={() => handlePrivilegeChange("delete")}
                  label="Allow Delete Permissions"
                />
                <Checkbox
                  id="view-privilege"
                  checked={securitySettings.privileges.viewOnly}
                  onChange={() => handlePrivilegeChange("viewOnly")}
                  label="View-Only Mode"
                />
              </div>
            </div>

            <Switch
              id="ip-restriction"
              checked={securitySettings.ipRestriction}
              onChange={() => handleToggleChange("ipRestriction")}
              label="IP Restriction"
              description="Allow access only from specific IP addresses"
            />

            {securitySettings.ipRestriction && (
              <div className="pl-6 border-l-2 border-gray-200">
                <Input label="Allowed IP Addresses" id="allowed-ips" placeholder="Enter comma-separated IP addresses" />
                <p className="text-xs text-gray-500 mt-1">Example: 192.168.1.1, 10.0.0.1</p>
              </div>
            )}

            <Switch
              id="session-timeout"
              checked={securitySettings.sessionTimeout}
              onChange={() => handleToggleChange("sessionTimeout")}
              label="Session Timeout"
              description="Automatically log out after period of inactivity"
            />

            {securitySettings.sessionTimeout && (
              <div className="pl-6 border-l-2 border-gray-200">
                <Input
                  label="Timeout Duration (minutes)"
                  id="timeout-duration"
                  type="number"
                  defaultValue={30}
                  min={5}
                  max={120}
                />
              </div>
            )}

            <Switch
              id="password-expiry"
              checked={securitySettings.passwordExpiry}
              onChange={() => handleToggleChange("passwordExpiry")}
              label="Password Expiry"
              description="Force password change after specified period"
            />

            {securitySettings.passwordExpiry && (
              <div className="pl-6 border-l-2 border-gray-200">
                <Input
                  label="Password Expiry (days)"
                  id="expiry-days"
                  type="number"
                  defaultValue={90}
                  min={30}
                  max={365}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  )
}
