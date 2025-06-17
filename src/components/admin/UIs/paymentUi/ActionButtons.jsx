import { Download, Receipt, RefreshCw, FileText, Plus } from "lucide-react"

export default function ActionButtons({
  selectedTransactions,
  transactions,
  onExport,
  onRefresh,
  onViewInvoice,
  onCreatePayment,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onCreatePayment}
        className="inline-flex items-center px-4 py-2 bg-[#ffc107] text-black font-medium rounded-lg hover:bg-red-500 transition-colors"
      >
        <Plus className="w-5 h-5 mr-1 " />
        Create Payment
      </button>

      <div className="relative">
        <button
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => document.getElementById("exportDropdown")?.classList.toggle("hidden")}
        >
          <Download className="w-5 h-5 mr-1" />
          Export Data
        </button>
        <div id="exportDropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10">
          <div className="py-1">
            <button
              onClick={() => onExport("csv")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Export as CSV
            </button>
            <button
              onClick={() => onExport("excel")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Export as Excel
            </button>
            <button
              onClick={() => onExport("pdf")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Export as PDF
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          if (selectedTransactions.length === 1) {
            const transaction = transactions.find((t) => t.id === selectedTransactions[0])
            onViewInvoice(transaction)
          } else {
            alert("Please select a single transaction to generate an invoice")
          }
        }}
        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Receipt className="w-5 h-5 mr-1" />
        Generate Invoice
      </button>

      <button
        onClick={onRefresh}
        className="inline-flex items-center px-4 py-2 bg-[#ffc107] text-black font-medium rounded-lg hover:bg-green-700 transition-colors"
      >
        <RefreshCw className="w-5 h-5 mr-1" />
        Refresh Payments
      </button>
    </div>
  )
}
