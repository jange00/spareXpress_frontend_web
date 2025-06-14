import { X, UserPlus } from "lucide-react"
import { useState } from "react"

export const AddAgentModal = ({ isAddingAgent, setIsAddingAgent, handleAddAgent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5.0,
    available: true,
    activeDeliveries: 0,
    completedToday: 0,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddAgent(formData)
    setFormData({
      name: "",
      email: "",
      phone: "",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
      available: true,
      activeDeliveries: 0,
      completedToday: 0,
    })
  }

  if (!isAddingAgent) {
    return null
  }

  return (
    <div className="fixed inset-0 black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Delivery Agent</h2>
          <button onClick={() => setIsAddingAgent(false)} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="available"
                  name="available"
                  type="checkbox"
                  checked={formData.available}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700">
                  Available for deliveries
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() => setIsAddingAgent(false)}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
            >
              <UserPlus className="h-5 w-5 mr-1" />
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
