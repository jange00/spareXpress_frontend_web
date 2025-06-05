
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import FeaturedCategories from "./FeaturedCategories"
import BackgroundImage from "./backgroundImage"
import HeroContent from "./heroContent"
import { IMAGE_PATHS } from "../../../common/imageConstant"


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: IMAGE_PATHS.car1,
      title: "Premium Auto Parts",
      subtitle: "Find the Perfect Parts for Your Vehicle",
      description: "Extensive collection of genuine auto parts with guaranteed fitment",
      cta: "Shop Auto Parts",
      category: "auto",
    },
    {
      image: IMAGE_PATHS.cartool, // Using the same image for now, replace with appropriate images
      title: "High-Performance PC Components",
      subtitle: "Build Your Dream Computer",
      description: "Latest computer parts from trusted manufacturers",
      cta: "Shop PC Parts",
      category: "computer",
    },
    {
      image: IMAGE_PATHS.car1, // Using the same image for now, replace with appropriate images
      title: "Special Deals & Discounts",
      subtitle: "Save Big on Quality Parts",
      description: "Up to 40% off on selected items this week",
      cta: "View Deals",
      category: "deals",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[600px]">
      {/* Slides */}
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out transform ${
              index === currentSlide ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <BackgroundImage
            slide={slide}
            />
            <HeroContent
            slide={slide}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#ffc107] w-8" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

     <FeaturedCategories/>
    </div>
  )
}

export default HeroSection

