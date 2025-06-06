import React from "react"

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#ffc107] transition-all duration-300 hover:shadow-2xl">
      <div className="relative overflow-hidden rounded-t-2xl aspect-square">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#ffc107]">{product.category}</span>
          </div>
          <h3 className="text-xl font-bold text-[#212121] mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#212121]">
            ${product.price}
          </div>
          <button className="bg-[#212121] text-white px-4 py-2 rounded-full hover:bg-[#ffc107] hover:text-[#212121] transition-colors duration-300 flex items-center gap-2">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden">
        <div
          className="h-full bg-[#ffc107] transition-all duration-300"
          style={{ width: `${(product.stock / 20) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default ProductCard
