import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Breadcrumb({ product }) {
  console.log(product)
  return (
    <nav className="flex mb-8 text-sm">
      <Link to="/" className="text-gray-600 hover:text-yellow-500">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <Link to="/products" className="text-gray-600 hover:text-yellow-500">
        Products
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <Link to={`/products?category=${product.categoryId}`} className="text-gray-600 hover:text-yellow-500">
        {product.categoryId.title === "vehicle-parts" ? "Vehicle Parts" : "Computer Parts"}
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <Link
        to={`/products?category=${product?.categoryId?.title}&subcategory=${product.subCategoryId.title}`}
        className="text-gray-600 hover:text-yellow-500"
      >
        {product.subcategoryId?.title}
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <span className="text-yellow-500">{product.name}</span>
    </nav>
  )
}
