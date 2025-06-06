import React from "react"

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#ffc107] transition-all duration-300 hover:shadow-xl">
      <div className="absolute -top-6 left-6">
        <div className="bg-white w-12 h-12 rounded-xl border border-gray-200 group-hover:border-[#ffc107] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl">
          <Icon className="w-6 h-6 text-[#ffc107]" />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold text-[#212121] mb-3">{feature.title}</h3>
        <p className="text-gray-600 mb-4">{feature.description}</p>
        <div className="bg-gray-50 rounded-lg px-4 py-2 inline-block">
          <span className="text-sm font-semibold text-[#212121]">{feature.stats}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-[#ffc107] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  )
}

export default FeatureCard
