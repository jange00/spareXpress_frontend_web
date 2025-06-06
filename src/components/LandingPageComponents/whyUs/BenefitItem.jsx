import React from "react"

const BenefitItem = ({ benefit }) => {
  const Icon = benefit.icon
  return (
    <div className="flex items-center space-x-3 group">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#ffc107]/10 flex items-center justify-center group-hover:bg-[#ffc107] transition-colors duration-300">
          <Icon className="w-5 h-5 text-[#212121]" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-[#212121]">{benefit.title}</h4>
        <p className="text-sm text-gray-600">{benefit.description}</p>
      </div>
    </div>
  )
}

export default BenefitItem
