
import UserForm from "../forms/user-form"

const AddUserModal = ({ isOpen, onClose, onSubmit, isLoading = false }) => {
  if (!isOpen) return null

  const handleSubmit = async (values) => {
    await onSubmit(values)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500" disabled={isLoading}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <UserForm onSubmit={handleSubmit} onCancel={onClose} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default AddUserModal