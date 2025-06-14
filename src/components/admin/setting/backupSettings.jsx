import { useState } from "react"
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Switch } from "./ui/switch"
import { Select } from "./ui/select"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Separator } from "./ui/seperator"
import { DownloadIcon, UploadIcon, AlertTriangleIcon, DatabaseIcon, ClockIcon } from "./ui/icons"

export const BackupSettings = () => {
  const [backupInProgress, setBackupInProgress] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [autoBackupFrequency, setAutoBackupFrequency] = useState("weekly")
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true)

  const handleDownloadBackup = () => {
    setBackupInProgress(true)
    setBackupProgress(0)

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setBackupInProgress(false)
          alert("Backup completed successfully! Download starting...")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleUploadBackup = () => {
    // In a real app, this would trigger a file upload dialog
    alert("Please select a backup file to restore.")
  }

  const handleViewLogs = () => {
    alert("System logs are available in the admin console.")
  }

  const handleClearCache = () => {
    setBackupInProgress(true)
    setBackupProgress(0)

    // Simulate cache clearing progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setBackupInProgress(false)
          alert("Cache cleared successfully!")
          return 100
        }
        return prev + 20
      })
    }, 200)
  }

  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ]

  return (
    <div>
      <CardHeader>
        <CardTitle>Backup & Data Management</CardTitle>
        <CardDescription>Manage system backups, logs, and data maintenance</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Data Backup & Restore */}
        <div>
          <h3 className="text-lg font-medium mb-4">Data Backup & Restore</h3>
          <div className="space-y-4">
            <Switch
              id="auto-backup"
              checked={autoBackupEnabled}
              onChange={setAutoBackupEnabled}
              label="Automatic Backups"
              description="Schedule regular backups of your data"
            />

            {autoBackupEnabled && (
              <div className="pl-6 border-l-2 border-gray-200 mt-2 space-y-2">
                <Select
                  label="Backup Frequency"
                  id="backup-frequency"
                  value={autoBackupFrequency}
                  onChange={(e) => setAutoBackupFrequency(e.target.value)}
                  options={frequencyOptions}
                />

                <p className="text-xs text-gray-500 mt-1">Last automatic backup: March 8, 2025, 2:30 AM</p>
              </div>
            )}

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Manual Backup & Restore</h4>
                  <p className="text-sm text-gray-500">Create or restore backups manually</p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleDownloadBackup} disabled={backupInProgress}>
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download Backup
                  </Button>
                  <Button onClick={handleUploadBackup} disabled={backupInProgress} variant="outline">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload Backup
                  </Button>
                </div>
              </div>

              {backupInProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Backup in progress...</span>
                    <span>{backupProgress}%</span>
                  </div>
                  <Progress value={backupProgress} />
                </div>
              )}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start">
                <AlertTriangleIcon className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Important Note</h4>
                  <p className="text-sm text-amber-700">
                    Restoring a backup will overwrite all current data. Make sure to download a backup of your current
                    data before proceeding with a restore operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* System Logs & Activity */}
        <div>
          <h3 className="text-lg font-medium mb-4">System Logs & Activity</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h4 className="font-medium">System Logs</h4>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleViewLogs}>
                    View Logs
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Access system logs for troubleshooting and auditing purposes.</p>
                <div className="mt-2 text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 inline-block mr-1" />
                  Last accessed: March 9, 2025, 10:15 AM
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <DatabaseIcon className="h-5 w-5 mr-2 text-purple-600" />
                    <h4 className="font-medium">Cache Management</h4>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleClearCache}>
                    Clear Cache
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Clear system cache to improve performance and fix display issues.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 inline-block mr-1" />
                  Last cleared: March 7, 2025, 8:30 PM
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recent System Activity</h4>
              <div className="border rounded-md divide-y">
                <div className="p-3 flex items-start">
                  <div className="w-12 text-xs text-gray-500">10:30 AM</div>
                  <div>
                    <p className="text-sm">System backup completed successfully</p>
                    <p className="text-xs text-gray-500">March 10, 2025</p>
                  </div>
                </div>
                <div className="p-3 flex items-start">
                  <div className="w-12 text-xs text-gray-500">9:15 AM</div>
                  <div>
                    <p className="text-sm">User "admin" logged in</p>
                    <p className="text-xs text-gray-500">March 10, 2025</p>
                  </div>
                </div>
                <div className="p-3 flex items-start">
                  <div className="w-12 text-xs text-gray-500">6:45 PM</div>
                  <div>
                    <p className="text-sm">Product catalog updated</p>
                    <p className="text-xs text-gray-500">March 9, 2025</p>
                  </div>
                </div>
                <div className="p-3 flex items-start">
                  <div className="w-12 text-xs text-gray-500">2:30 PM</div>
                  <div>
                    <p className="text-sm">System cache cleared</p>
                    <p className="text-xs text-gray-500">March 9, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  )
}
