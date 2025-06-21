import Button from "../UIs/productUI/Button"
import Badge from "../UIs/productUI/Badge"
import { EditIcon, TrashIcon, EyeIcon } from "../icons/Icons"
// import { getCategoryName, getSubcategoryName, getBrandName } from "../../../pages/admin/productManagementPage"


const ProductTable = ({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  onEditProduct,
  onDeleteProduct,
  onViewProduct,
  selectAll,
}) => {
  const getStockBadge = (stock) => {
    if (stock === 0) {
      return (
        <Badge variant="danger" size="sm">
          Out of Stock
        </Badge>
      )
    } else if (stock <= 5) {
      return (
        <Badge variant="warning" size="sm">
          Low Stock ({stock})
        </Badge>
      )
    } else {
      return (
        <Badge variant="success" size="sm">
          In Stock ({stock})
        </Badge>
      )
    }
  }

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price
    return price - (price * discount) / 100
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={onSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Brand
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Stock
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <div className="text-lg font-medium mb-2">No products found</div>
                      <div className="text-sm">Try adjusting your search or filter criteria</div>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => onSelectProduct(product._id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                            src={product.image?.[0] || "/placeholder.svg?height=48&width=48"}
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=48&width=48"
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {product.description?.substring(0, 50)}
                            {product.description?.length > 50 ? "..." : ""}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.categoryId.title}</div>
                      {/* <div className="text-sm text-gray-500">{products.subCategoryId.title}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.brandId.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                      </div>
                      {product.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                          <Badge variant="success" size="sm">
                            {product.discount}% off
                          </Badge>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStockBadge(product.stock)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onViewProduct(product)}>
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEditProduct(product)}>
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDeleteProduct(product._id)}>
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
