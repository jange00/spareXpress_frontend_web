import React from 'react'

export default function HeroContent({slide}) {
  return (
    <div className="relative h-full container mx-auto px-4 flex items-center">
    <div className="max-w-2xl text-white">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
      <h2 className="text-2xl md:text-3xl text-[#ffc107] font-semibold mb-4">{slide.subtitle}</h2>
      <p className="text-lg md:text-xl mb-8 text-gray-200">{slide.description}</p>
      <button className="bg-[#ffc107] text-[#212121] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#ffcd38] transition-colors duration-300 transform hover:scale-105">
        {slide.cta}
      </button>
    </div>
  </div>
  )
}
