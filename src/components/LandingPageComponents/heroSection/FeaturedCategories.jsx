import React from 'react'

export default function FeaturedCategories() {
  return (
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        {
          title: "Auto Parts",
          description: "Find the perfect match for your vehicle",
          icon: "🚗",
        },
        {
          title: "PC Components",
          description: "Build your dream gaming rig",
          icon: "💻",
        },
        {
          title: "Special Deals",
          description: "Save big on quality parts",
          icon: "🏷️",
        },
      ].map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-start space-x-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-[#212121] group-hover:text-[#ffc107] transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
