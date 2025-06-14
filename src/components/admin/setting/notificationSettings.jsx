import { useState } from "react"
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Switch } from "./ui/switch"
import { Select } from "./ui/select"
import { Button } from "./ui/button"
import { Separator } from "./ui/seperator"
import { SendIcon } from "./ui/icons"

export const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    paymentAlerts: true,
    lowStockAlerts: true,
    customerSupport: false,
    smsAlerts: false,
    emailRefunds: true,
    marketingEmails: false,
    securityAlerts: true,
  })

  const [emailFrequency, setEmailFrequency] = useState("immediate")

  const handleToggleChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleTestNotification = () => {
    alert("Test notification sent successfully!")
  }

  const frequencyOptions = [
    { value: "immediate", label: "Immediate" },
    { value: "hourly", label: "Hourly Digest" },
    { value: "daily", label: "Daily Digest" },
    { value: "weekly", label: "Weekly Summary" },
  ]

  return (
    <div>
      <CardHeader>
        <CardTitle>Notifications & Alerts</CardTitle>
        <CardDescription>Configure how and when you receive notifications</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email & Push Notifications */}
        <div>
          <h3 className="text-lg font-medium mb-4">Email & Push Notifications</h3>
          <div className="space-y-4">
            <Switch
              id="order-updates"
              checked={notificationSettings.orderUpdates}
              onChange={() => handleToggleChange("orderUpdates")}
              label="Order Updates"
            />

            <Switch
              id="payment-alerts"
              checked={notificationSettings.paymentAlerts}
              onChange={() => handleToggleChange("paymentAlerts")}
              label="Payment Alerts"
            />

            <Switch
              id="low-stock-alerts"
              checked={notificationSettings.lowStockAlerts}
              onChange={() => handleToggleChange("lowStockAlerts")}
              label="Low Stock Alerts"
            />

            <Switch
              id="customer-support"
              checked={notificationSettings.customerSupport}
              onChange={() => handleToggleChange("customerSupport")}
              label="Customer Support Messages"
            />
          </div>
        </div>

        <Separator />

        {/* Delivery & Tracking Notifications */}
        <div>
          <h3 className="text-lg font-medium mb-4">Delivery & Tracking Notifications</h3>
          <div className="space-y-4">
            <Switch
              id="sms-alerts"
              checked={notificationSettings.smsAlerts}
              onChange={() => handleToggleChange("smsAlerts")}
              label="SMS Alerts for Orders"
            />

            <Switch
              id="email-refunds"
              checked={notificationSettings.emailRefunds}
              onChange={() => handleToggleChange("emailRefunds")}
              label="Email Notifications for Refunds"
            />
          </div>
        </div>

        <Separator />

        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <Select
              label="Email Notification Frequency"
              id="email-frequency"
              value={emailFrequency}
              onChange={(e) => setEmailFrequency(e.target.value)}
              options={frequencyOptions}
            />

            <Switch
              id="marketing-emails"
              checked={notificationSettings.marketingEmails}
              onChange={() => handleToggleChange("marketingEmails")}
              label="Marketing Emails"
            />

            <Switch
              id="security-alerts"
              checked={notificationSettings.securityAlerts}
              onChange={() => handleToggleChange("securityAlerts")}
              label="Security Alerts"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleTestNotification}>
            <SendIcon className="h-4 w-4 mr-2" />
            Test Notification
          </Button>
        </div>
      </CardContent>
    </div>
  )
}
