import { useState } from "react"
import { MapPin, ChevronUp, ChevronDown, CheckCircle, Edit, Plus, Home, Building } from "lucide-react"

export const DeliveryAddress = ({ addresses, selectedAddress, isExpanded, onToggle, onAddressSelect }) => {
  const [showAddressForm, setShowAddressForm] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#FFB800]" />
          Delivery Address
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {!showAddressForm ? (
            <div>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border ${selectedAddress.id === address.id ? "border-[#FFB800]" : "border-gray-200"} rounded-lg p-4 mb-3 relative cursor-pointer`}
                  onClick={() => onAddressSelect(address)}
                >
                  {selectedAddress.id === address.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-5 h-5 text-[#FFB800]" />
                    </div>
                  )}
                  <div className="flex items-start">
                    <div className="p-2 bg-gray-100 rounded-full mr-3">
                      {address.type === "home" ? (
                        <Home className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Building className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{address.name}</h3>
                        {address.isDefault && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{address.country}</p>
                      <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex mt-4">
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center text-[#FFB800] hover:text-[#FFB800]/80 mr-4"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Address
                </button>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center text-[#FFB800] hover:text-[#FFB800]/80"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Address
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Add/Edit Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="addressType"
                        value="home"
                        className="h-4 w-4 text-[#FFB800] focus:ring-[#FFB800]"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-700">Home</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="addressType"
                        value="office"
                        className="h-4 w-4 text-[#FFB800] focus:ring-[#FFB800]"
                      />
                      <span className="ml-2 text-sm text-gray-700">Office</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#FFB800] focus:ring-[#FFB800] rounded" />
                    <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90"
                >
                  Save Address
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
