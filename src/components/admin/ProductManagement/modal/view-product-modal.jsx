import Modal from "../../UIs/productUI/Modal"
import Button from "../../UIs/productUI/Button"
import { getCategoryName, getBrandName, getSubcategoryName } from "../mockData"

const ViewProductModal = ({ isOpen, onClose, product, onEdit }) => {
  if (!product) return null

  const handleEdit = () => {
    onClose()
    onEdit(product)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details" size="lg">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">{product.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">
                    {getCategoryName(product.categoryId)} → {getSubcategoryName(product.subCategoryId)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Brand</dt>
                  <dd className="text-sm text-gray-900">{getBrandName(product.brandId)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                    {product.discount > 0 && <span className="ml-2 text-green-600">({product.discount}% off)</span>}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Stock</dt>
                  <dd className="text-sm text-gray-900">{product.stock} units</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Shipping Charge</dt>
                  <dd className="text-sm text-gray-900">${product.shippingCharge.toFixed(2)}</dd>
                </div>
              </dl>
            </div>

            {product.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                <p className="text-sm text-gray-900">{product.description}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Timestamps</h4>
              <dl className="space-y-1">
                <div>
                  <dt className="text-xs text-gray-500">Created</dt>
                  <dd className="text-xs text-gray-900">{new Date(product.createdAt).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Updated</dt>
                  <dd className="text-xs text-gray-900">{new Date(product.updatedAt).toLocaleString()}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleEdit}>Edit Product</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ViewProductModal
