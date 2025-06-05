import React, { useState } from "react"
import { TrendingUp } from "lucide-react"
import { newProducts } from "./data"
import ProductCard from "./ProductCard"

const NewArrivals = () => {
  const [showAll, setShowAll] = useState(false)
  const itemsToShow = showAll ? newProducts.length : 4

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="relative mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-[#212121] mb-4">New Arrivals</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Check out our latest tech upgrades and auto accessories. Be the first to get your hands on these fresh arrivals!
              </p>
            </div>
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center mt-4 md:mt-0 group"
            >
              <span className="text-[#212121] font-semibold group-hover:text-[#ffc107] transition-colors duration-300">
                {showAll ? "View Less" : "View All New Arrivals"}
              </span>
              <TrendingUp className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="absolute top-0 right-0 -mt-4 mr-4 text-[#ffc107]/10 text-9xl font-bold pointer-events-none select-none">
            NEW
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.slice(0, itemsToShow).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
