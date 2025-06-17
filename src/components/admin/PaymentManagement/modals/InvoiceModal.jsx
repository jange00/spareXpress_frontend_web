import { X, Printer, Download } from "lucide-react"
import { formatDate, formatCurrency, generateInvoiceNumber } from "../../utils/payment/formatters"

export default function InvoiceModal({ transaction, onClose }) {
  const invoiceNumber = generateInvoiceNumber(transaction.id)

  const calculateSubtotal = () => {
    return transaction.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handlePrintInvoice = () => {
    window.print()
  }

  const handleDownloadInvoice = () => {
    alert("Invoice download functionality would be implemented here")
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Invoice: {invoiceNumber}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintInvoice}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              <Printer className="w-4 h-4 mr-1" />
              Print
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4 mr-1" />
              Download PDF
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]" id="invoice-content">
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-600">{invoiceNumber}</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-900">PaymentPro</h2>
                <p className="text-gray-600">123 Business Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
                <p className="text-gray-600">support@paymentpro.com</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-gray-200 py-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Bill To:</h3>
                <p className="text-gray-800">{transaction.customerName}</p>
                <p className="text-gray-600">{transaction.customerEmail}</p>
                <p className="text-gray-600">{transaction.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {transaction.shippingAddress.city}, {transaction.shippingAddress.state}{" "}
                  {transaction.shippingAddress.zip}
                </p>
                <p className="text-gray-600">{transaction.shippingAddress.country}</p>
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Invoice Date:</span>
                    <span className="text-gray-800">{formatDate(transaction.date).split(",")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Order ID:</span>
                    <span className="text-gray-800">{transaction.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Payment Method:</span>
                    <span className="text-gray-800">{transaction.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Transaction ID:</span>
                    <span className="text-gray-800">{transaction.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
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
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transaction.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Summary */}
            <div className="flex justify-end">
              <div className="w-full md:w-1/2">
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-800">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%):</span>
                    <span className="text-gray-800">{formatCurrency(calculateTax())}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-medium ${
                      transaction.status === "successful"
                        ? "text-green-600"
                        : transaction.status === "pending"
                          ? "text-yellow-600"
                          : transaction.status === "refunded"
                            ? "text-blue-600"
                            : "text-red-600"
                    }`}
                  >
                    {transaction.status === "successful"
                      ? "Paid"
                      : transaction.status === "pending"
                        ? "Pending"
                        : transaction.status === "refunded"
                          ? "Refunded"
                          : "Failed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thank You Note */}
            <div className="text-center text-gray-600 pt-6">
              <p>Thank you for your business!</p>
              <p className="text-sm mt-1">
                If you have any questions about this invoice, please contact our support team.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-1 inline" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  )
}
