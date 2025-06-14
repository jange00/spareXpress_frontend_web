import { useState } from "react"
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/seperator"
import { StoreIcon, GlobeIcon, MailIcon, SunIcon, MoonIcon } from "./ui/icons"

export const GeneralSettings = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: "SparExpress",
    url: "sparexpress.com",
    email: "admin@sparexpress.com",
    location: "New York, USA",
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "english",
    currency: "usd",
  })

  const handleStoreInfoChange = (e) => {
    const { name, value } = e.target
    setStoreInfo((prev) => ({ ...prev, [name]: value }))
  }

  const locations = [
    { value: "New York, USA", label: "New York, USA" },
    { value: "Los Angeles, USA", label: "Los Angeles, USA" },
    { value: "Chicago, USA", label: "Chicago, USA" },
    { value: "London, UK", label: "London, UK" },
    { value: "Toronto, Canada", label: "Toronto, Canada" },
    { value: "Sydney, Australia", label: "Sydney, Australia" },
  ]

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
  ]

  const currencies = [
    { value: "usd", label: "USD ($)" },
    { value: "eur", label: "EUR (€)" },
    { value: "gbp", label: "GBP (£)" },
    { value: "cad", label: "CAD (C$)" },
    { value: "aud", label: "AUD (A$)" },
  ]

  return (
    <div>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Configure your store information and website preferences</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Store Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Store Name"
              id="store-name"
              name="name"
              value={storeInfo.name}
              onChange={handleStoreInfoChange}
              icon={<StoreIcon className="h-4 w-4" />}
            />

            <Input
              label="Store URL"
              id="store-url"
              name="url"
              value={storeInfo.url}
              onChange={handleStoreInfoChange}
              icon={<GlobeIcon className="h-4 w-4" />}
            />

            <Input
              label="Admin Email"
              id="admin-email"
              name="email"
              type="email"
              value={storeInfo.email}
              onChange={handleStoreInfoChange}
              icon={<MailIcon className="h-4 w-4" />}
            />

            <Select
              label="Business Location"
              id="business-location"
              value={storeInfo.location}
              onChange={(e) => setStoreInfo((prev) => ({ ...prev, location: e.target.value }))}
              options={locations}
            />
          </div>
        </div>

        <Separator />

        {/* Website Preferences */}
        <div>
          <h3 className="text-lg font-medium mb-4">Website Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Switch
              id="dark-mode"
              checked={preferences.darkMode}
              onChange={(checked) => setPreferences((prev) => ({ ...prev, darkMode: checked }))}
              label="Dark Mode"
              description="Enable dark mode for the admin panel"
            />

            <div className="flex items-center space-x-2">
              <SunIcon className="h-4 w-4 text-gray-400" />
              <Switch
                id="dark-mode-icon"
                checked={preferences.darkMode}
                onChange={(checked) => setPreferences((prev) => ({ ...prev, darkMode: checked }))}
              />
              <MoonIcon className="h-4 w-4 text-gray-400" />
            </div>

            <Select
              label="Language"
              id="language"
              value={preferences.language}
              onChange={(e) => setPreferences((prev) => ({ ...prev, language: e.target.value }))}
              options={languages}
            />

            <Select
              label="Default Currency"
              id="currency"
              value={preferences.currency}
              onChange={(e) => setPreferences((prev) => ({ ...prev, currency: e.target.value }))}
              options={currencies}
            />
          </div>
        </div>
      </CardContent>
    </div>
  )
}
