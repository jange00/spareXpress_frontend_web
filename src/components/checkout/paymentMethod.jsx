import { useState } from "react"
import { CreditCard, ChevronUp, ChevronDown, Wallet, DollarSign, Plus } from "lucide-react"

export const PaymentMethodComponent = ({
  paymentOptions,
  selectedPayment,
  isExpanded,
  onToggle,
  onPaymentSelect,
  cvvConfirmation,
  setCvvConfirmation,
  cvvError,
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-[#FFB800]" />
          Payment Method
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {!showPaymentForm ? (
            <div>
              {paymentOptions.map((method) => (
                <div
                  key={method.id}
                  className={`border ${selectedPayment.id === method.id ? "border-[#FFB800]" : "border-gray-200"} rounded-lg p-4 mb-3 relative cursor-pointer`}
                  onClick={() => onPaymentSelect(method)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedPayment.id === method.id}
                        onChange={() => onPaymentSelect(method)}
                        className="h-4 w-4 text-[#FFB800] focus:ring-[#FFB800]"
                      />
                      <div className="ml-3">
                        {method.type === "card" && (
                          <div className="flex items-center">
                            <div className="p-1 bg-blue-50 rounded mr-2">
                              <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{method.cardType}</h3>
                              <p className="text-sm text-gray-600">{method.cardNumber}</p>
                              <p className="text-sm text-gray-600">Expires: {method.expiryDate}</p>
                            </div>
                          </div>
                        )}

                        {method.type === "wallet" && (
                          <div className="flex items-center">
                            <div className="p-1 bg-green-50 rounded mr-2">
                              <Wallet className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{method.walletName}</h3>
                              <p className="text-sm text-gray-600">{method.email}</p>
                            </div>
                          </div>
                        )}
                          {method.type === "khalti" && (
                          <div className="flex items-center">
                            <div className="p-1 bg-yellow-50 rounded mr-2">
                              <DollarSign className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        )}
                          {method.type === "esewa" && (
                          <div className="flex items-center">
                            <div className="p-1 bg-yellow-50 rounded mr-2">
                              <DollarSign className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        )}

                        {method.type === "cod" && (
                          <div className="flex items-center">
                            <div className="p-1 bg-yellow-50 rounded mr-2">
                              <DollarSign className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Default</span>
                    )}
                  </div>
                </div>
              ))}

              {selectedPayment.type === "card" && (
                <div className="mt-4 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Security Verification</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV Code*</label>
                    <div className="flex items-center">
                      <input
                        type="password"
                        maxLength={4}
                        value={cvvConfirmation}
                        onChange={(e) => setCvvConfirmation(e.target.value)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                        placeholder="***"
                      />
                      <span className="ml-2 text-sm text-gray-500">3 or 4 digits on the back of your card</span>
                    </div>
                    {cvvError && <p className="mt-1 text-sm text-red-600">{cvvError}</p>}
                  </div>
                </div>
              )}

              <div className="flex mt-4">
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="flex items-center text-[#FFB800] hover:text-[#FFB800]/80"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Payment Method
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Add Payment Method</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      placeholder="***"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#FFB800] focus:ring-[#FFB800] rounded" />
                    <span className="ml-2 text-sm text-gray-700">Save card for future purchases</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90"
                >
                  Add Card
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
