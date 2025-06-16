import Modal from "../../UIs/Modal"
import ProductForm from "../ProductForm"

const AddEditProductModal = ({ isOpen, onClose, editingProduct, onSave, isLoading }) => {
  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingProduct ? "Edit Product" : "Add New Product"} size="lg">
      <ProductForm initialValues={editingProduct} onSubmit={onSave} onCancel={handleCancel} isLoading={isLoading} />
    </Modal>
  )
}

export default AddEditProductModal
