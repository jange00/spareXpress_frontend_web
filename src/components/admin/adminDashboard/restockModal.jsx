import { Button } from "../ui/button"

const RestockModal = ({ product, onClose, onConfirm, errorMessage, restockQuantity, onQuantityChange }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full md:w-96 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Restock Product</h2>

        {/* Product Name and Description */}
        <div className="mb-6">
          <h3 className="font-medium text-xl text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>

        {/* Product Specifications */}
        <div className="mb-6">
          <h4 className="font-semibold text-md text-gray-800">Specifications</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Material:</strong> {product.specifications.material}
            </li>
            <li>
              <strong>Position:</strong> {product.specifications.position}
            </li>
            <li>
              <strong>Fitment:</strong> {product.specifications.fitment}
            </li>
            <li>
              <strong>Warranty:</strong> {product.specifications.warranty}
            </li>
            <li>
              <strong>Dimensions:</strong> {product.specifications.dimensions}
            </li>
            <li>
              <strong>Weight:</strong> {product.specifications.weight}
            </li>
          </ul>
        </div>

        {/* Product Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-md text-gray-800">Features</h4>
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Compatibility */}
        <div className="mb-6">
          <h4 className="font-semibold text-md text-gray-800">Compatibility</h4>
          <ul className="list-disc pl-5 space-y-2">
            {product.compatibility.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stock Input */}
        <div className="mb-6">
          <label htmlFor="restockQuantity" className="block text-sm font-medium text-gray-700">
            Quantity to Restock
          </label>
          <input
            type="number"
            id="restockQuantity"
            value={restockQuantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter quantity"
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        {/* Modal Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline" size="sm" className="text-gray-600 hover:bg-gray-100">
            Cancel
          </Button>
          <Button onClick={onConfirm} size="sm" className="bg-yellow-500 text-gray-900 hover:bg-yellow-600">
            Confirm Restock
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RestockModal
