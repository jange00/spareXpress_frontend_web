import { useState } from "react"
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { Switch } from "./ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { Separator } from "./ui/seperator"
import { Label } from "./ui/label"
import { PercentIcon, AlertTriangleIcon } from "./ui/icons"

export const PaymentSettings = () => {
  const [paymentSettings, setPaymentSettings] = useState({
    stripe: {
      enabled: true,
      autoVerification: true,
      testMode: true,
    },
    paypal: {
      enabled: true,
      autoVerification: true,
      testMode: true,
    },
    bankTransfer: {
      enabled: false,
    },
    cod: {
      enabled: true,
      limitAmount: 500,
    },
  })

  const [taxSettings, setTaxSettings] = useState({
    region: "us",
    percentage: 8.5,
    includeTax: true,
    enableAutomaticTax: false,
  })

  const handlePaymentToggle = (gateway, setting) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [setting]: !prev[gateway][setting],
      },
    }))
  }

  const handleTaxChange = (setting, value) => {
    setTaxSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const taxRegions = [
    { value: "us", label: "United States" },
    { value: "eu", label: "European Union" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "global", label: "Global (Default Rate)" },
  ]

  const [activePaymentTab, setActivePaymentTab] = useState("stripe")

  return (
    <div>
      <CardHeader>
        <CardTitle>Payment & Tax Settings</CardTitle>
        <CardDescription>Configure payment gateways and tax settings</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Payment Gateway Integrations */}
        <div>
          <h3 className="text-lg font-medium mb-4">Payment Gateway Integrations</h3>

          <Tabs value={activePaymentTab} onChange={setActivePaymentTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="stripe" activeValue={activePaymentTab} onClick={setActivePaymentTab}>
                Stripe
              </TabsTrigger>
              <TabsTrigger value="paypal" activeValue={activePaymentTab} onClick={setActivePaymentTab}>
                PayPal
              </TabsTrigger>
              <TabsTrigger value="bank" activeValue={activePaymentTab} onClick={setActivePaymentTab}>
                Bank Transfer
              </TabsTrigger>
              <TabsTrigger value="cod" activeValue={activePaymentTab} onClick={setActivePaymentTab}>
                Cash on Delivery
              </TabsTrigger>
            </TabsList>

            {/* Stripe Settings */}
            <TabsContent value="stripe" activeValue={activePaymentTab}>
              <div className="space-y-4">
                <Switch
                  id="stripe-enabled"
                  checked={paymentSettings.stripe.enabled}
                  onChange={() => handlePaymentToggle("stripe", "enabled")}
                  label="Enable Stripe"
                  description="Accept credit card payments via Stripe"
                />

                {paymentSettings.stripe.enabled && (
                  <div className="space-y-4 pt-2">
                    <Input label="Stripe API Key" id="stripe-api-key" type="password" placeholder="sk_test_..." />

                    <Input label="Stripe Public Key" id="stripe-public-key" placeholder="pk_test_..." />

                    <Switch
                      id="stripe-test-mode"
                      checked={paymentSettings.stripe.testMode}
                      onChange={() => handlePaymentToggle("stripe", "testMode")}
                      label="Test Mode"
                    />

                    <Switch
                      id="stripe-auto-verification"
                      checked={paymentSettings.stripe.autoVerification}
                      onChange={() => handlePaymentToggle("stripe", "autoVerification")}
                      label="Auto-Payment Verification"
                      description="Automatically verify payments when received"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* PayPal Settings */}
            <TabsContent value="paypal" activeValue={activePaymentTab}>
              <div className="space-y-4">
                <Switch
                  id="paypal-enabled"
                  checked={paymentSettings.paypal.enabled}
                  onChange={() => handlePaymentToggle("paypal", "enabled")}
                  label="Enable PayPal"
                  description="Accept payments via PayPal"
                />

                {paymentSettings.paypal.enabled && (
                  <div className="space-y-4 pt-2">
                    <Input label="PayPal Client ID" id="paypal-client-id" placeholder="Client ID" />

                    <Input label="PayPal Secret" id="paypal-secret" type="password" placeholder="Secret key" />

                    <Switch
                      id="paypal-test-mode"
                      checked={paymentSettings.paypal.testMode}
                      onChange={() => handlePaymentToggle("paypal", "testMode")}
                      label="Sandbox Mode"
                    />

                    <Switch
                      id="paypal-auto-verification"
                      checked={paymentSettings.paypal.autoVerification}
                      onChange={() => handlePaymentToggle("paypal", "autoVerification")}
                      label="Auto-Payment Verification"
                      description="Automatically verify payments when received"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Bank Transfer Settings */}
            <TabsContent value="bank" activeValue={activePaymentTab}>
              <div className="space-y-4">
                <Switch
                  id="bank-enabled"
                  checked={paymentSettings.bankTransfer.enabled}
                  onChange={() => handlePaymentToggle("bankTransfer", "enabled")}
                  label="Enable Bank Transfer"
                  description="Accept payments via bank transfer"
                />

                {paymentSettings.bankTransfer.enabled && (
                  <div className="space-y-4 pt-2">
                    <Input label="Bank Name" id="bank-name" placeholder="Enter bank name" />

                    <Input label="Account Number" id="account-number" placeholder="Enter account number" />

                    <Input label="Routing Number" id="routing-number" placeholder="Enter routing number" />

                    <Input label="Account Holder Name" id="account-name" placeholder="Enter account holder name" />

                    <Input
                      label="Payment Instructions"
                      id="bank-instructions"
                      placeholder="Instructions for customers"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Cash on Delivery Settings */}
            <TabsContent value="cod" activeValue={activePaymentTab}>
              <div className="space-y-4">
                <Switch
                  id="cod-enabled"
                  checked={paymentSettings.cod.enabled}
                  onChange={() => handlePaymentToggle("cod", "enabled")}
                  label="Enable Cash on Delivery"
                  description="Allow customers to pay when receiving their order"
                />

                {paymentSettings.cod.enabled && (
                  <div className="space-y-4 pt-2">
                    <Input
                      label="Maximum Order Amount ($)"
                      id="cod-limit"
                      type="number"
                      min="0"
                      value={paymentSettings.cod.limitAmount}
                      onChange={(e) =>
                        setPaymentSettings((prev) => ({
                          ...prev,
                          cod: {
                            ...prev.cod,
                            limitAmount: Number(e.target.value),
                          },
                        }))
                      }
                    />
                    <p className="text-xs text-gray-500">Set to 0 for no limit</p>

                    <Input
                      label="COD Instructions"
                      id="cod-instructions"
                      placeholder="Instructions for delivery personnel"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        {/* Tax Configuration */}
        <div>
          <h3 className="text-lg font-medium mb-4">Tax Configuration</h3>
          <div className="space-y-4">
            <Select
              label="Select Tax Region"
              id="tax-region"
              value={taxSettings.region}
              onChange={(e) => handleTaxChange("region", e.target.value)}
              options={taxRegions}
            />

            <div className="space-y-2">
              <Label htmlFor="tax-percentage">Tax Percentage (%)</Label>
              <div className="relative">
                <PercentIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="tax-percentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                  value={taxSettings.percentage}
                  onChange={(e) => handleTaxChange("percentage", Number(e.target.value))}
                />
              </div>
            </div>

            <Switch
              id="include-tax"
              checked={taxSettings.includeTax}
              onChange={(checked) => handleTaxChange("includeTax", checked)}
              label="Include Tax in Product Prices"
              description="Display prices with tax included"
            />

            <Switch
              id="automatic-tax"
              checked={taxSettings.enableAutomaticTax}
              onChange={(checked) => handleTaxChange("enableAutomaticTax", checked)}
              label="Enable Automatic Tax Calculation"
              description="Automatically calculate taxes based on customer location"
            />

            {taxSettings.enableAutomaticTax && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-sm text-amber-800 flex items-center">
                  <AlertTriangleIcon className="h-4 w-4 mr-2" />
                  Automatic tax calculation requires a valid API key for tax service provider.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  )
}
