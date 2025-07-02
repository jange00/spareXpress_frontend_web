import { useState } from "react"
import { Info, Check, Star } from "lucide-react"

export default function ProductTabs({ product }) {
  console.log(product)
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description", icon: Info },
    { id: "specifications", label: "Specifications" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-yellow-500 text-yellow-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon && <tab.icon className="w-5 h-5" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies
              lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Designed for optimal performance and durability, this {product.subcategoryId?.title.toLowerCase()} is a perfect fit
              for your {product.category === "vehicle-parts" ? "vehicle" : "computer"}. With premium materials and
              expert craftsmanship, it ensures reliable operation and long-lasting value.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b">
                <span className="text-gray-600 font-medium">{key}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(product.features || []).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">Based on {product.reviews} reviews</span>
                </div>
              </div>
              <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                Write a Review
              </button>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">John Doe</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < 5 - i ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {i === 0
                      ? "Excellent product! Exactly what I needed for my vehicle. Installation was easy and it works perfectly."
                      : i === 1
                        ? "Good quality and fast shipping. Would recommend to others looking for reliable parts."
                        : "Decent product for the price. Shipping was a bit slow but the product itself is good."}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="text-yellow-500 font-medium hover:text-yellow-600 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
