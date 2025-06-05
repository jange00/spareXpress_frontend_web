import React from "react"
import { features, additionalBenefits, trustIndicators } from "./data"
import FeatureCard from "./FeatureCard"
import BenefitItem from "./BenefitItem"

const WhyChooseUs = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212121] mb-4">
            Why Choose <span className="text-[#ffc107]">SpareXpress</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted destination for genuine auto and computer parts, backed by exceptional service and expertise
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 py-4 px-8 bg-[#212121] rounded-full">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-2xl font-bold text-[#ffc107] mr-2">{item.value}</span>
                <span className="text-white text-sm">{item.label}</span>
                {index !== trustIndicators.length - 1 && (
                  <div className="w-px h-8 bg-gray-700 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="bg-[#ffc107] text-[#212121] px-8 py-3 rounded-full font-semibold hover:bg-[#ffcd38] transition-colors duration-300 transform hover:scale-105">
            Start Shopping Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
