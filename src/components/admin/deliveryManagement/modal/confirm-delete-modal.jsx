import { X, AlertTriangle, Trash2 } from "lucide-react"

export const ConfirmDeleteModal = ({ isConfirmingDelete, setIsConfirmingDelete, selectedAgent, handleDeleteAgent }) => {
  if (!isConfirmingDelete || !selectedAgent) {
    return null
  }

  return (
    <div className="fixed inset-0 black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
          <button onClick={() => setIsConfirmingDelete(false)} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center mb-4 text-red-500">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-center mb-2">Delete Agent</h3>
          <p className="text-gray-500 text-center mb-4">
            Are you sure you want to delete {selectedAgent.name}? This action cannot be undone.
          </p>

          {selectedAgent.activeDeliveries > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
              <p className="text-yellow-800 text-sm">
                <strong>Warning:</strong> This agent has {selectedAgent.activeDeliveries} active deliveries. Deleting
                this agent will require reassigning these deliveries.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={() => setIsConfirmingDelete(false)}
            className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDeleteAgent(selectedAgent.id)
              setIsConfirmingDelete(false)
            }}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 flex items-center"
          >
            <Trash2 className="h-5 w-5 mr-1" />
            Delete Agent
          </button>
        </div>
      </div>
    </div>
  )
}
