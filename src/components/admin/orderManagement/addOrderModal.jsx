import { useState } from "react"
import { XIcon, PlusIcon, TrashIcon, CheckIcon } from "./icons"

/**
 * Add Order Modal Component
 *
 * Allows adding a new order manually with:
 * - Customer information
 * - Order items
 * - Shipping details
 * - Order notes
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Function to call when saving the order
 * @param {Function} props.onClose - Function to call when closing the modal
 */
export const AddOrderModal = ({ onSave, onClose }) => {
  // Initial form data
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      phone: "",
    },
    status: "pending",
    paymentMethod: "credit-card",
    paymentStatus: "paid",
    items: [{ id: Date.now(), name: "", price: 0, quantity: 1, total: 0 }],
    shipping: {
      address: "",
      courier: "FedEx",
      trackingId: "Pending",
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 4 days from now
    },
    notes: "",
  })

  // State for active tab
  const [activeTab, setActiveTab] = useState("customer")

  /**
   * Calculates the total order amount
   * @returns {number} Total order amount
   */
  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0)
  }

  /**
   * Handles form field changes
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  /**
   * Handles changes to order item fields
   * @param {number} index - Item index
   * @param {string} field - Field name
   * @param {any} value - New field value
   */
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items]
    newItems[index][field] = value

    // Recalculate total for this item
    if (field === "price" || field === "quantity") {
      newItems[index].price = Number.parseFloat(newItems[index].price) || 0
      newItems[index].quantity = Number.parseInt(newItems[index].quantity) || 0
      newItems[index].total = newItems[index].price * newItems[index].quantity
    }

    setFormData({
      ...formData,
      items: newItems,
    })
  }

  /**
   * Adds a new item to the order
   */
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), name: "", price: 0, quantity: 1, total: 0 }],
    })
  }

  /**
   * Removes an item from the order
   * @param {number} index - Item index to remove
   */
  const removeItem = (index) => {
    const newItems = [...formData.items]
    newItems.splice(index, 1)
    setFormData({
      ...formData,
      items: newItems,
    })
  }

  /**
   * Handles form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Calculate final total
    const total = calculateTotal()

    onSave({
      ...formData,
      total,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add Manual Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm ${activeTab === "customer" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("customer")}
            >
              Customer Info
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm ${activeTab === "items" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("items")}
            >
              Order Items
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm ${activeTab === "shipping" ? "text-[#FFB800] border-b-2 border-[#FFB800]" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Notes
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
            {/* Customer Info Tab */}
            {activeTab === "customer" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name*</label>
                    <input
                      type="text"
                      name="customer.name"
                      value={formData.customer.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                    <input
                      type="email"
                      name="customer.email"
                      value={formData.customer.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="customer.phone"
                      value={formData.customer.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="cash-on-delivery">Cash on Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status*</label>
                    <select
                      name="paymentStatus"
                      value={formData.paymentStatus}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab("items")}
                    className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
                  >
                    Next: Order Items
                  </button>
                </div>
              </div>
            )}

            {/* Order Items Tab */}
            {activeTab === "items" && (
              <div className="space-y-4">
                <div className="rounded-md border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.items.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleItemChange(index, "name", e.target.value)}
                              placeholder="Product name"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleItemChange(index, "price", e.target.value)}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800] text-right"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                              placeholder="1"
                              min="1"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800] text-right"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            ${item.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              disabled={formData.items.length === 1}
                              className={`text-red-500 hover:text-red-700 ${formData.items.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="5" className="px-6 py-3">
                          <button
                            type="button"
                            onClick={addItem}
                            className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Add Item
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          Grand Total:
                        </td>
                        <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                          ${calculateTotal().toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("customer")}
                    className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("shipping")}
                    className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
                  >
                    Next: Shipping
                  </button>
                </div>
              </div>
            )}

            {/* Shipping & Notes Tab */}
            {activeTab === "shipping" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address*</label>
                    <textarea
                      name="shipping.address"
                      value={formData.shipping.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Courier</label>
                      <select
                        name="shipping.courier"
                        value={formData.shipping.courier}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      >
                        <option value="FedEx">FedEx</option>
                        <option value="UPS">UPS</option>
                        <option value="USPS">USPS</option>
                        <option value="DHL">DHL</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
                      <input
                        type="date"
                        name="shipping.estimatedDelivery"
                        value={formData.shipping.estimatedDelivery}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Status*</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add any special instructions or notes about this order"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FFB800] focus:border-[#FFB800]"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("items")}
                    className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
                    >
                      <CheckIcon className="w-5 h-5 mr-1 inline" />
                      Create Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
