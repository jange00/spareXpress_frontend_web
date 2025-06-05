import { motion } from "framer-motion"
import ProductCard from "./product-card"

export default function ProductGrid({ products, viewMode, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-lg shadow animate-pulse">
            <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-t-lg h-48" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}
    >
      {products.map((product) => (
        <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  )
}
