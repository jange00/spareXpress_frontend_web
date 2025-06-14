import { useState } from "react"
import { Card } from "../../components/admin/setting/ui/card"
import { Button } from "../../components/admin/setting/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/admin/setting/ui/tabs"
import { SaveIcon, ResetIcon } from "../../components/admin/setting/ui/icons"
import { GeneralSettings } from "../../components/admin/setting/generalSettings"
import { UserManagement } from "../../components/admin/setting/user-management"
import { SecuritySettings } from "../../components/admin/setting/securitySettings"
import { NotificationSettings } from "../../components/admin/setting/notificationSettings"
import { PaymentSettings } from "../../components/admin/setting/paymentSettings"
import { BackupSettings } from "../../components/admin/setting/backupSettings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const handleSaveChanges = () => {
    alert("Settings saved successfully!")
  }

  const handleResetDefaults = () => {
    if (confirm("Are you sure you want to reset all settings to default? This action cannot be undone.")) {
      alert("Settings have been reset to default values.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Settings Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <div className="flex flex-wrap gap-2">
              <div className="relative space-x-2">
                <Button onClick={handleResetDefaults} variant="outline">
                  <ResetIcon className="w-5 h-5 mr-1" />
                  Reset to Default
                </Button>
                <Button
                  className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
                  onClick={handleSaveChanges}
                >
                  <SaveIcon className="w-5 h-5 mr-1" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mt-6">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="general" activeValue={activeTab} onClick={setActiveTab}>
                General
              </TabsTrigger>
              <TabsTrigger value="users" activeValue={activeTab} onClick={setActiveTab}>
                User Management
              </TabsTrigger>
              <TabsTrigger value="security" activeValue={activeTab} onClick={setActiveTab}>
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" activeValue={activeTab} onClick={setActiveTab}>
                Notifications
              </TabsTrigger>
              <TabsTrigger value="payment" activeValue={activeTab} onClick={setActiveTab}>
                Payment & Tax
              </TabsTrigger>
              <TabsTrigger value="backup" activeValue={activeTab} onClick={setActiveTab}>
                Backup & Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" activeValue={activeTab}>
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="users" activeValue={activeTab}>
              <UserManagement />
            </TabsContent>

            <TabsContent value="security" activeValue={activeTab}>
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="notifications" activeValue={activeTab}>
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="payment" activeValue={activeTab}>
              <PaymentSettings />
            </TabsContent>

            <TabsContent value="backup" activeValue={activeTab}>
              <BackupSettings />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
